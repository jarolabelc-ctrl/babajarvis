# JARVIS Gemini — Android y Windows

## Estado

Este repositorio está preparado con configuración inicial de Capacitor, launcher de Windows y plantilla de Gemini. **No incluye un APK compilado ni firmado.** Para generar el APK se necesita Android Studio/SDK y una compilación en un equipo configurado.

## Windows

1. Instala Node.js 20+ y Google Chrome o Microsoft Edge.
2. Copia `.env.local.example` a `.env.local`.
3. En `.env.local`, configura `VITE_GEMINI_API_KEY` con tu clave creada en https://aistudio.google.com/apikey.
4. Ejecuta `INICIAR-WINDOWS.bat`; abrirá la interfaz en el navegador. La versión Gemini directa no necesita el puente Claude para conversar.
5. Pulsa **INITIALISE** y acepta el permiso del micrófono. El botón y la detección de aplauso son alternativas de activación.

## Android APK

1. Instala Android Studio con Android SDK y una versión compatible de JDK.
2. Instala Node.js 20+.
3. Copia `.env.local.example` a `.env.local` y configura la clave de Gemini.
4. Ejecuta `PREPARAR-ANDROID.bat` desde Windows. El script instala dependencias, compila la web, crea el proyecto Capacitor y lo abre en Android Studio.
5. En Android Studio, espera la sincronización de Gradle y selecciona **Build > Build Bundle(s) / APK(s) > Build APK(s)**.
6. Para una APK de distribución, crea una firma propia desde **Build > Generate Signed Bundle / APK**.

## Funciones y límites

- Gemini responde preguntas en modo directo.
- La interfaz incluye botón de inicio y detección de aplauso basada en el micrófono. Android puede requerir conceder permiso y mantener la app en primer plano; no se garantiza escucha con la app cerrada.
- La voz usa las funciones de voz disponibles en el navegador/WebView. Comprueba reconocimiento y síntesis en el dispositivo real.
- **Control de programas de Windows no está conectado a Gemini en este paquete.** No se ejecutan comandos del sistema por la respuesta del modelo. Para añadirlo de forma segura se necesita un servicio local separado con lista permitida, confirmación explícita por acción y registro de actividad.

## Seguridad de la clave Gemini

La variable `VITE_GEMINI_API_KEY` se incorpora al JavaScript de la aplicación y se puede extraer de un APK. Úsala solo para pruebas personales y limita/revoca la clave si se expone. Para distribuir la app a otras personas, sustituye el acceso directo por un backend privado que guarde la clave en el servidor. Nunca subas `.env.local` a un repositorio público.
