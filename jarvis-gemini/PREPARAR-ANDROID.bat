@echo off
setlocal
cd /d "%~dp0"
where node >nul 2>nul || (echo Instala Node.js 20+ desde https://nodejs.org & pause & exit /b 1)
if not exist .env.local copy .env.local.example .env.local >nul
if not exist node_modules call npm install
if errorlevel 1 goto error
call npm run build
if errorlevel 1 goto error
call npx cap add android
if errorlevel 1 (
  echo Si Android ya existe, ejecuta: npx cap sync android
  goto error
)
call npx cap sync android
if errorlevel 1 goto error
node scripts/patch-android-manifest.mjs
if errorlevel 1 goto error
call npx cap open android
exit /b 0
:error
echo No se pudo terminar. Revisa README-ANDROID.md.
pause
