@echo off
echo ========================================
echo    Weather Forecast Pro - Deployment
echo ========================================
echo.

echo [1/4] Frontend build kontrol ediliyor...
cd frontend
npm run build
if %errorlevel% neq 0 (
    echo ❌ Frontend build hatasi!
    pause
    exit /b 1
) else (
    echo ✅ Frontend build basarili
)

echo.
echo [2/4] Backend build kontrol ediliyor...
cd ..\backend
dotnet build
if %errorlevel% neq 0 (
    echo ❌ Backend build hatasi!
    pause
    exit /b 1
) else (
    echo ✅ Backend build basarili
)

echo.
echo [3/4] Git durumu kontrol ediliyor...
cd ..
git status
echo.

echo [4/4] Deployment hazirligi tamamlandi!
echo.
echo ========================================
echo           DEPLOYMENT HAZIR
echo ========================================
echo.
echo 🚀 Deployment adimlari:
echo.
echo 1. BACKEND (Railway/Render):
echo    - https://railway.app veya https://render.com
echo    - GitHub repository'nizi baglayin
echo    - Backend klasorunu secin
echo    - Deploy edin
echo.
echo 2. FRONTEND (Vercel):
echo    - https://vercel.com
echo    - GitHub repository'nizi baglayin
echo    - Framework: Vite
echo    - Root Directory: frontend
echo    - Environment Variable: VITE_API_URL = https://wfp-api.nidalirfanuymaz.com.tr
echo    - Custom Domain: wfp.nidalirfanuymaz.com.tr
echo    - Deploy edin
echo.
echo 📖 Detayli rehber icin VERCEL_DEPLOYMENT.md dosyasini okuyun
echo.
echo ========================================
pause 