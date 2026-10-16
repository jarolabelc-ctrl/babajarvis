@echo off
setlocal
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Necesitas instalar Node.js 20 o superior desde https://nodejs.org
  pause
  exit /b 1
)
if not exist node_modules (
  echo Instalando dependencias por primera vez...
  call npm install
  if errorlevel 1 goto error
)
if not exist .env.local (
  copy .env.local.example .env.local >nul
  echo.
  echo Abre .env.local y pega tu clave de Google Gemini.
  notepad .env.local
  echo Cuando guardes el archivo, vuelve a esta ventana y pulsa una tecla.
  pause >nul
)
call npm run dev -- --host 127.0.0.1
if errorlevel 1 goto error
exit /b 0
:error
echo.
echo Hubo un error. Revisa el mensaje anterior.
pause
