# 🌤️ Weather Forecast Pro - Kurulum Rehberi

## 📋 Gereksinimler

### Sistem Gereksinimleri
- **İşletim Sistemi**: Windows 10/11
- **RAM**: En az 4GB (8GB önerilen)
- **Disk Alanı**: En az 2GB boş alan
- **İnternet Bağlantısı**: Kurulum ve API kullanımı için gerekli

### Yazılım Gereksinimleri
- **Node.js**: v18.0.0 veya üzeri
- **.NET 8.0 SDK**: En son sürüm
- **Git**: Versiyon kontrolü için
- **Visual Studio Code**: Kod editörü (önerilen)

---

## 🚀 Kurulum Adımları

### 1. Yazılımları İndirme ve Kurma

#### Node.js Kurulumu
1. [Node.js resmi sitesine](https://nodejs.org/) gidin
2. **LTS (Long Term Support)** sürümünü indirin
3. İndirilen `.msi` dosyasını çalıştırın
4. Kurulum sırasında tüm varsayılan seçenekleri kabul edin
5. Kurulum tamamlandıktan sonra bilgisayarınızı yeniden başlatın

#### .NET 8.0 SDK Kurulumu
1. [.NET 8.0 SDK sayfasına](https://dotnet.microsoft.com/download/dotnet/8.0) gidin
2. **Windows x64 Installer**'ı indirin
3. İndirilen `.exe` dosyasını çalıştırın
4. Kurulum sırasında tüm seçenekleri işaretleyin
5. Kurulum tamamlandıktan sonra bilgisayarınızı yeniden başlatın

#### Git Kurulumu
1. [Git resmi sitesine](https://git-scm.com/) gidin
2. **Windows** sürümünü indirin
3. İndirilen `.exe` dosyasını çalıştırın
4. Kurulum sırasında varsayılan seçenekleri kabul edin
5. Kurulum tamamlandıktan sonra bilgisayarınızı yeniden başlatın

#### Visual Studio Code Kurulumu (Önerilen)
1. [VS Code resmi sitesine](https://code.visualstudio.com/) gidin
2. **Windows** sürümünü indirin
3. İndirilen `.exe` dosyasını çalıştırın
4. Kurulum sırasında tüm seçenekleri işaretleyin

---

### 2. Proje Dosyalarını İndirme

#### Yöntem 1: Git ile (Önerilen)
```bash
# Masaüstünde veya istediğiniz klasörde
git clone https://github.com/kullaniciadi/hava_durumu.git
cd hava_durumu
```

#### Yöntem 2: ZIP Dosyası ile
1. Proje ZIP dosyasını indirin
2. Masaüstüne çıkartın
3. Klasör adını `hava_durumu` olarak değiştirin

---

### 3. API Anahtarlarını Alma

#### OpenWeatherMap API Anahtarı
1. [OpenWeatherMap](https://openweathermap.org/) sitesine gidin
2. **Sign Up** ile ücretsiz hesap oluşturun
3. Giriş yaptıktan sonra **API Keys** bölümüne gidin
4. **Default** anahtarınızı kopyalayın
5. Bu anahtarı not alın (daha sonra kullanacağız)

#### Gemini AI API Anahtarı
1. [Google AI Studio](https://makersuite.google.com/app/apikey) sitesine gidin
2. Google hesabınızla giriş yapın
3. **Create API Key** butonuna tıklayın
4. Oluşturulan anahtarı kopyalayın
5. Bu anahtarı not alın (daha sonra kullanacağız)

---

### 4. Backend Kurulumu

#### Backend Klasörüne Geçiş
```bash
cd backend
```

#### API Anahtarlarını Ayarlama
1. `Program.cs` dosyasını VS Code ile açın
2. Aşağıdaki satırları bulun ve API anahtarlarınızı girin:

```csharp
// OpenWeatherMap API anahtarı (satır 50 civarı)
const string apiKey = "BURAYA_OPENWEATHER_API_ANAHTARINIZI_YAZIN";

// Gemini AI API anahtarı (satır 250 civarı)
const string geminiApiKey = "BURAYA_GEMINI_API_ANAHTARINIZI_YAZIN";
```

#### Backend'i Çalıştırma
```bash
# Bağımlılıkları yükle
dotnet restore

# Backend'i çalıştır
dotnet run
```

**Başarılı olduğunda şu mesajı göreceksiniz:**
```
info: Microsoft.Hosting.Lifetime[14]
      Now listening on: https://localhost:7012
      Now listening on: http://localhost:5012
```

---

### 5. Frontend Kurulumu

#### Yeni Terminal Açma
- Backend çalışırken **yeni bir terminal** açın
- Veya **yeni bir Command Prompt** penceresi açın

#### Frontend Klasörüne Geçiş
```bash
cd frontend
```

#### Bağımlılıkları Yükleme
```bash
npm install
```

#### Frontend'i Çalıştırma
```bash
npm run dev
```

**Başarılı olduğunda şu mesajı göreceksiniz:**
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

---

### 6. Uygulamayı Test Etme

#### Tarayıcıda Açma
1. Tarayıcınızı açın (Chrome, Firefox, Edge)
2. `http://localhost:5173` adresine gidin
3. Uygulama açılacak

#### Test Senaryoları
1. **Büyük Şehirler**: Sayfadaki 6 büyük şehir kartlarından birine tıklayın
2. **Arama**: Arama kutusuna "İstanbul" yazın ve "Ara" butonuna tıklayın
3. **AI Önerileri**: Hava durumu detaylarında AI önerilerini kontrol edin
4. **5 Günlük Tahmin**: Sayfanın altında 5 günlük tahmin kartlarını görün

---

## 🔧 Sorun Giderme

### Backend Çalışmıyor
```bash
# Port kullanımda olabilir, farklı port deneyin
dotnet run --urls "http://localhost:5013"

# Veya çalışan process'leri sonlandırın
netstat -ano | findstr :5012
taskkill /PID [PID_NUMARASI] /F
```

### Frontend Çalışmıyor
```bash
# Node modules'ü temizleyin
rm -rf node_modules
npm install

# Port çakışması varsa
npm run dev -- --port 5174
```

### API Anahtarları Çalışmıyor
1. API anahtarlarının doğru kopyalandığından emin olun
2. Backend'i yeniden başlatın: `Ctrl+C` ile durdurup `dotnet run` ile başlatın
3. API anahtarlarının aktif olduğundan emin olun

### CORS Hatası
Backend'de CORS ayarlarının doğru olduğundan emin olun:
```csharp
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});
```

---

## 📱 Uygulama Özellikleri

### 🌟 Ana Özellikler
- **Gerçek Zamanlı Hava Durumu**: OpenWeatherMap API ile
- **AI Önerileri**: Gemini AI ile kişiselleştirilmiş tavsiyeler
- **5 Günlük Tahmin**: Detaylı hava durumu tahminleri
- **Türkiye Şehirleri**: 81 il için arama önerisi
- **Modern UI**: Responsive ve kullanıcı dostu tasarım

### 🤖 AI Önerileri Kategorileri
- **Kıyafet Önerileri**: Hava durumuna göre giyim tavsiyeleri
- **Aktivite Önerileri**: Uygun aktiviteler
- **Aksesuar Önerileri**: Şemsiye, şapka gibi gerekli eşyalar
- **Sağlık Önerileri**: Dikkat edilmesi gereken sağlık konuları

---

## 🚀 Geliştirme

### Kod Düzenleme
1. VS Code ile projeyi açın: `code .`
2. Frontend kodları: `frontend/src/` klasöründe
3. Backend kodları: `backend/` klasöründe

### Yeni Özellik Ekleme
1. Frontend: React + TypeScript + Tailwind CSS
2. Backend: ASP.NET Core + C#
3. API: OpenWeatherMap + Gemini AI

---

## 📞 Destek

### Sorun Yaşarsanız
1. Bu rehberi tekrar okuyun
2. Hata mesajlarını kontrol edin
3. API anahtarlarının doğru olduğundan emin olun
4. Backend ve frontend'in aynı anda çalıştığından emin olun

### İletişim
- **Geliştirici**: [İletişim bilgileriniz]
- **GitHub**: [Proje linki]
- **E-posta**: [E-posta adresiniz]

---

## ✅ Kurulum Tamamlandı!

Tebrikler! Weather Forecast Pro uygulamanız başarıyla kuruldu ve çalışıyor. 

**Uygulama Adresi**: `http://localhost:5173`

**Backend Adresi**: `http://localhost:5012`

Artık modern AI destekli hava durumu uygulamanızı kullanabilirsiniz! 🌟 