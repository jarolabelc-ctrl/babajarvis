import { env, SYSTEM_PROMPT } from '../config'
import type { AskHandlers, Msg } from './anthropic'

/**
 * Google Gemini REST adapter.
 *
 * This direct-browser adapter is suitable for local/private builds only:
 * VITE_GEMINI_API_KEY is embedded in the frontend bundle. For a public service,
 * proxy requests through a backend and keep the key in server-side environment.
 */
let activeController: AbortController | null = null
let cancelled = false

function toText(content: unknown): string {
  if (typeof content === 'string') return content
  if (!Array.isArray(content)) return ''
  return content.map((part: any) => {
    if (typeof part === 'string') return part
    if (part && typeof part.text === 'string') return part.text
    return ''
  }).filter(Boolean).join('\n')
}

export async function ask(
  history: Msg[],
  handlers: AskHandlers,
): Promise<{ text: string; tools: string[] }> {
  if (!env.geminiKey) {
    throw new Error('Falta VITE_GEMINI_API_KEY en .env.local para conectar Gemini.')
  }
  cancelled = false
  const controller = new AbortController()
  activeController = controller

  const contents = history.map((msg: any) => {
    const role = msg.role === 'assistant' ? 'model' : 'user'
    return { role, parts: [{ text: toText(msg.content) }] }
  }).filter((item) => item.parts[0].text.trim().length > 0)

  try {
    const response = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': env.geminiKey,
        },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents,
          generationConfig: { maxOutputTokens: 2048, temperature: 0.7 },
        }),
        signal: controller.signal,
      },
    )

    if (!response.ok) {
      const detail = await response.text().catch(() => '')
      throw new Error(`Gemini respondió ${response.status}. ${detail.slice(0, 240)}`)
    }

    const data = await response.json()
    if (cancelled) return { text: '', tools: [] }
    const text = (data.candidates?.[0]?.content?.parts ?? [])
      .map((part: any) => typeof part.text === 'string' ? part.text : '')
      .join('')
      .trim()

    if (!text) throw new Error('Gemini no devolvió texto. Inténtalo de nuevo.')
    handlers.onText(text)
    return { text, tools: [] }
  } catch (error) {
    if (cancelled || (error instanceof DOMException && error.name === 'AbortError')) {
      return { text: '', tools: [] }
    }
    throw error
  } finally {
    if (activeController === controller) activeController = null
  }
}

export function cancel(): void {
  cancelled = true
  activeController?.abort()
}

export function connectedLabels(): string[] {
  return ['Google Gemini']
}
