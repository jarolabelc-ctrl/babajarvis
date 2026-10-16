import fs from 'node:fs'
import path from 'node:path'

const manifest = path.resolve('android/app/src/main/AndroidManifest.xml')
if (!fs.existsSync(manifest)) {
  console.error('No existe android/app/src/main/AndroidManifest.xml. Ejecuta primero npx cap add android.')
  process.exit(1)
}
let xml = fs.readFileSync(manifest, 'utf8')
const permissions = [
  'android.permission.INTERNET',
  'android.permission.RECORD_AUDIO',
]
for (const permission of permissions) {
  const needle = `android:name="${permission}"`
  if (!xml.includes(needle)) {
    xml = xml.replace('<manifest ', `<manifest `)
    const firstTagEnd = xml.indexOf('>')
    if (firstTagEnd < 0) throw new Error('Manifest XML no válido')
    xml = xml.slice(0, firstTagEnd + 1) + `\n    <uses-permission android:name="${permission}" />` + xml.slice(firstTagEnd + 1)
  }
}
fs.writeFileSync(manifest, xml)
console.log('Permisos de Internet y micrófono añadidos al manifest Android.')
