@echo off
echo ========================================
echo    Weather Forecast Pro - Kurulum Script
echo ========================================
echo.

echo [1/6] Sistem kontrolleri yapiliyor...
echo.

REM Node.js kontrolü
echo Node.js kontrol ediliyor...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js bulunamadi!
    echo    Lutfen https://nodejs.org adresinden Node.js LTS indirin ve kurun.
    pause
    exit /b 1
) else (
    echo ✅ Node.js bulundu
    node --version
)

echo.

REM .NET kontrolü
echo .NET SDK kontrol ediliyor...
dotnet --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ .NET SDK bulunamadi!
    echo    Lutfen https://dotnet.microsoft.com/download/dotnet/8.0 adresinden .NET 8.0 SDK indirin ve kurun.
    pause
    exit /b 1
) else (
    echo ✅ .NET SDK bulundu
    dotnet --version
)

echo.

REM Git kontrolü
echo Git kontrol ediliyor...
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Git bulunamadi!
    echo    Lutfen https://git-scm.com adresinden Git indirin ve kurun.
    pause
    exit /b 1
) else (
    echo ✅ Git bulundu
    git --version
)

echo.
echo [2/6] Proje klasorleri kontrol ediliyor...

REM Backend klasörü kontrolü
if not exist "backend" (
    echo ❌ Backend klasoru bulunamadi!
    echo    Lutfen proje dosyalarini dogru sekilde indirdiginizden emin olun.
    pause
    exit /b 1
) else (
    echo ✅ Backend klasoru bulundu
)

REM Frontend klasörü kontrolü
if not exist "frontend" (
    echo ❌ Frontend klasoru bulunamadi!
    echo    Lutfen proje dosyalarini dogru sekilde indirdiginizden emin olun.
    pause
    exit /b 1
) else (
    echo ✅ Frontend klasoru bulundu
)

echo.
echo [3/6] Backend bagimliliklari yukleniyor...
cd backend
dotnet restore
if %errorlevel% neq 0 (
    echo ❌ Backend bagimliliklari yuklenemedi!
    pause
    exit /b 1
) else (
    echo ✅ Backend bagimliliklari yuklendi
)

echo.
echo [4/6] Frontend bagimliliklari yukleniyor...
cd ..\frontend
npm install
if %errorlevel% neq 0 (
    echo ❌ Frontend bagimliliklari yuklenemedi!
    pause
    exit /b 1
) else (
    echo ✅ Frontend bagimliliklari yuklendi
)

echo.
echo [5/6] API anahtarlari kontrol ediliyor...
cd ..\backend
findstr /C:"BURAYA_OPENWEATHER_API_ANAHTARINIZI_YAZIN" Program.cs >nul
if %errorlevel% equ 0 (
    echo ⚠️  UYARI: API anahtarlari henuz ayarlanmamis!
    echo    Lutfen API_ANAHTARLARI_REHBERI.md dosyasini okuyun.
    echo.
) else (
    echo ✅ API anahtarlari ayarlanmis
)

findstr /C:"BURAYA_GEMINI_API_ANAHTARINIZI_YAZIN" Program.cs >nul
if %errorlevel% equ 0 (
    echo ⚠️  UYARI: API anahtarlari henuz ayarlanmamis!
    echo    Lutfen API_ANAHTARLARI_REHBERI.md dosyasini okuyun.
    echo.
) else (
    echo ✅ API anahtarlari ayarlanmis
)

echo.
echo [6/6] Kurulum tamamlandi!
echo.
echo ========================================
echo           KURULUM TAMAMLANDI
echo ========================================
echo.
echo 🚀 Uygulamayi baslatmak icin:
echo.
echo 1. Backend'i baslatmak icin:
echo    cd backend
echo    dotnet run
echo.
echo 2. Yeni bir terminal acip frontend'i baslatmak icin:
echo    cd frontend
echo    npm run dev
echo.
echo 3. Tarayicida http://localhost:5173 adresine gidin
echo.
echo 📖 Detayli kurulum rehberi icin KURULUM_REHBERI.md dosyasini okuyun
echo.
echo ========================================
pause 