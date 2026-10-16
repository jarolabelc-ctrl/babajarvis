# JARVIS Gemini — Android y Windows

Proyecto de asistente con interfaz holográfica, conversación mediante Google Gemini, voz del navegador y activación manual o por aplauso. La interfaz web se puede ejecutar en Windows y preparar como aplicación Android mediante Capacitor.

> **Estado honesto:** este repositorio es código fuente, no un APK ya compilado. El control de programas de Windows no está implementado en esta versión. La activación por aplauso y la voz deben probarse en el navegador/WebView de destino. No se garantiza escuchar con la app cerrada.

## Requisitos

- Node.js 20 o superior
- Chrome o Edge actualizado
- Una clave de Gemini de [Google AI Studio](https://aistudio.google.com/apikey)
- Para Android: Android Studio, Android SDK y JDK compatible con la versión de Gradle que genere Capacitor

## Ejecutar en Windows

1. Clona o descarga este repositorio.
2. En la carpeta del proyecto, copia `.env.local.example` a `.env.local`.
3. Edita `.env.local` y añade tu clave:

   ```env
   VITE_BACKEND=direct
   VITE_MODEL_PROVIDER=gemini
   VITE_GEMINI_API_KEY=TU_CLAVE_DE_GEMINI
   VITE_TTS_ENGINE=system
   ```

4. Abre una terminal en la carpeta y ejecuta:

   ```bash
   npm ci
   npm run dev
   ```

5. Abre la URL local que indique Vite, pulsa **INITIALISE** y concede permiso de micrófono.

También puedes probar `INICIAR-WINDOWS.bat` después de instalar Node.js.

## Preparar Android

1. Instala Android Studio y el SDK de Android.
2. Copia `.env.local.example` a `.env.local` y configura tu clave de Gemini.
3. Ejecuta `PREPARAR-ANDROID.bat` en Windows o ejecuta estos comandos manualmente:

   ```bash
   npm ci
   npm run android:add
   npm run android:sync
   npm run android:open
   ```

4. En Android Studio, espera la sincronización de Gradle y selecciona **Build → Build APK(s)**.
5. Para distribuir la aplicación, genera un APK firmado desde **Build → Generate Signed Bundle / APK**.

Los comandos exactos pueden variar según la versión de Capacitor y Android Studio instalada.

## Publicar en GitHub

1. Crea un repositorio nuevo en GitHub. No marques la opción de crear README si ya vas a subir este proyecto.
2. Abre PowerShell dentro de la carpeta del proyecto y ejecuta:

   ```powershell
   git init
   git add .
   git commit -m "Preparar JARVIS con Gemini para Android y Windows"
   git branch -M main
   git remote add origin https://github.com/TU-USUARIO/TU-REPOSITORIO.git
   git push -u origin main
   ```

3. Sustituye la URL de ejemplo por la URL real de tu repositorio.
4. Comprueba que `.env.local` no aparezca entre los archivos que se suben. `.gitignore` excluye los archivos `*.local`; nunca publiques tu clave de Gemini.

## Seguridad de Gemini

`VITE_GEMINI_API_KEY` se empaqueta en el JavaScript del frontend y **puede extraerse de la web o del APK**. Esta configuración directa es solo para pruebas personales. Para un repositorio público, una APK distribuida o varios usuarios, implementa un backend privado que guarde la clave en el servidor y no la exponga en el cliente. Configura límites de uso y restringe o rota la clave si se filtra.

## Control de programas de Windows

No está habilitado en esta entrega. No ejecutes comandos del sistema a partir de texto generado por un modelo sin una capa local separada que use una lista permitida, pida confirmación explícita y registre las acciones.

## Licencia

Consulta `LICENSE` para las condiciones de uso del código base.
