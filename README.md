# 🌤️ Weather Forecast Pro

Modern AI destekli hava durumu uygulaması. OpenWeatherMap API ile gerçek zamanlı hava durumu verileri ve Gemini AI ile kişiselleştirilmiş öneriler sunar.

## ✨ Özellikler

### 🌟 Ana Özellikler
- **🤖 AI Önerileri**: Gemini AI ile kişiselleştirilmiş hava durumu tavsiyeleri
- **🌍 Gerçek Zamanlı Hava Durumu**: OpenWeatherMap API ile güncel veriler
- **📅 5 Günlük Tahmin**: Detaylı hava durumu tahminleri
- **🇹🇷 Türkiye Şehirleri**: 81 il için arama önerisi
- **📱 Responsive Tasarım**: Tüm cihazlarda mükemmel görünüm
- **⚡ Hızlı Arama**: Dinamik şehir arama sistemi

### 🤖 AI Önerileri Kategorileri
- **👕 Kıyafet Önerileri**: Hava durumuna göre giyim tavsiyeleri
- **🏃 Aktivite Önerileri**: Uygun aktiviteler ve etkinlikler
- **👜 Aksesuar Önerileri**: Şemsiye, şapka, eldiven gibi gerekli eşyalar
- **🏥 Sağlık Önerileri**: Dikkat edilmesi gereken sağlık konuları

## 🛠️ Teknolojiler

### Frontend
- **React 18** - Modern UI framework
- **TypeScript** - Tip güvenliği
- **Tailwind CSS** - Modern CSS framework
- **Vite** - Hızlı build tool
- **Axios** - HTTP client

### Backend
- **ASP.NET Core 8** - Modern web framework
- **C#** - Güçlü programlama dili
- **HTTP Client** - API entegrasyonu
- **CORS** - Cross-origin resource sharing

### API'ler
- **OpenWeatherMap API** - Hava durumu verileri
- **Gemini AI API** - Yapay zeka önerileri

## 🚀 Hızlı Başlangıç

### Gereksinimler
- Node.js 18+
- .NET 8.0 SDK
- Git

### Kurulum

1. **Projeyi klonlayın**
```bash
git clone https://github.com/kullaniciadi/hava_durumu.git
cd hava_durumu
```

2. **Otomatik kurulum script'ini çalıştırın**
```bash
KURULUM_SCRIPT.bat
```

3. **API anahtarları zaten ayarlanmış!** 
   - Eğer API anahtarları eksikse: `API_ANAHTARLARI_REHBERI.md` dosyasını okuyun
   - OpenWeatherMap API anahtarı: https://openweathermap.org/
   - Gemini AI API anahtarı: https://makersuite.google.com/app/apikey

4. **Uygulamayı başlatın**
```bash
# Terminal 1 - Backend
cd backend
dotnet run

# Terminal 2 - Frontend
cd frontend
npm run dev
```

5. **Tarayıcıda açın**
```
http://localhost:5173
```

## 📖 Rehberler

### 🏠 Local Kurulum
- **[HIZLI_KURULUM.md](./HIZLI_KURULUM.md)** - API anahtarları ayarlanmışsa (önerilen)
- **[KURULUM_REHBERI.md](./KURULUM_REHBERI.md)** - Detaylı kurulum rehberi
- **[API_ANAHTARLARI_REHBERI.md](./API_ANAHTARLARI_REHBERI.md)** - API anahtarları alma rehberi

### 🌐 Canlıya Alma
- **[CUSTOM_DOMAIN_DEPLOYMENT.md](./CUSTOM_DOMAIN_DEPLOYMENT.md)** - Custom domain deployment (önerilen)
- **[VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)** - Genel Vercel deployment rehberi
- **[DEPLOYMENT_SCRIPT.bat](./DEPLOYMENT_SCRIPT.bat)** - Deployment hazırlık script'i

## 🎯 Kullanım

### Şehir Arama
1. Arama kutusuna şehir adı yazın (en az 2 harf)
2. Önerilerden birini seçin veya "Ara" butonuna tıklayın
3. Hava durumu detayları ve AI önerileri görüntülenecek

### Büyük Şehirler
- Sayfadaki 6 büyük şehir kartlarından birine tıklayın
- Anında hava durumu detayları yüklenecek

### AI Önerileri
- Her şehir için otomatik olarak kişiselleştirilmiş öneriler
- Kıyafet, aktivite, aksesuar ve sağlık tavsiyeleri
- Hava durumuna göre özelleştirilmiş içerik

## 🏗️ Proje Yapısı

```
hava_durumu/
├── frontend/                 # React uygulaması
│   ├── src/
│   │   ├── components/       # React bileşenleri
│   │   │   ├── ForecastCard.tsx
│   │   │   └── WeatherAdvice.tsx
│   │   └── App.tsx          # Ana uygulama
│   ├── package.json
│   └── vite.config.ts
├── backend/                  # ASP.NET Core API
│   ├── Program.cs           # Ana uygulama
│   ├── WeatherAdviceRequest.cs
│   └── hava_durumu.csproj
├── KURULUM_REHBERI.md       # Detaylı kurulum rehberi
├── KURULUM_SCRIPT.bat       # Otomatik kurulum script'i
└── README.md               # Bu dosya
```

## 🔧 Geliştirme

### Frontend Geliştirme
```bash
cd frontend
npm run dev          # Geliştirme sunucusu
npm run build        # Production build
npm run preview      # Build önizleme
```

### Backend Geliştirme
```bash
cd backend
dotnet run           # Geliştirme sunucusu
dotnet build         # Proje derleme
dotnet test          # Testleri çalıştırma
```

### Yeni Özellik Ekleme
1. Frontend: `frontend/src/` klasöründe React bileşenleri
2. Backend: `backend/` klasöründe C# API endpoint'leri
3. Stil: Tailwind CSS ile modern tasarım

## 🌐 API Endpoint'leri

### Backend API'leri
- `GET /api/weather/{city}` - Anlık hava durumu
- `GET /api/forecast/{city}` - 5 günlük tahmin
- `POST /api/weather-advice` - AI önerileri

### Frontend URL'leri
- `http://localhost:5173` - Ana uygulama
- `http://localhost:5012` - Backend API

## 🐛 Sorun Giderme

### Yaygın Sorunlar

**Backend çalışmıyor**
```bash
# Port kontrolü
netstat -ano | findstr :5012
# Farklı port kullanın
dotnet run --urls "http://localhost:5013"
```

**Frontend çalışmıyor**
```bash
# Node modules'ü temizleyin
rm -rf node_modules
npm install
```

**API anahtarları çalışmıyor**
- API anahtarlarının doğru kopyalandığından emin olun
- Backend'i yeniden başlatın
- API anahtarlarının aktif olduğundan emin olun

## 📱 Özellikler

### 🌟 Benzersiz Özellikler
- **AI Önerileri**: Diğer hava durumu uygulamalarında olmayan özellik
- **Türkiye Odaklı**: 81 il için optimize edilmiş arama
- **Modern UI**: Gradient tasarım ve animasyonlar
- **Hızlı Performans**: Vite ile optimize edilmiş build

### 🎨 Tasarım Özellikleri
- **Responsive**: Mobil, tablet ve desktop uyumlu
- **Modern Gradients**: Çekici renk geçişleri
- **Hover Efektleri**: İnteraktif kullanıcı deneyimi
- **Loading Animasyonları**: Profesyonel görünüm

## 🤝 Katkıda Bulunma

1. Projeyi fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.

## 📞 İletişim

- **Geliştirici**: [İletişim bilgileriniz]
- **GitHub**: [Proje linki]
- **E-posta**: [E-posta adresiniz]

## 🙏 Teşekkürler

- **OpenWeatherMap** - Hava durumu verileri için
- **Google Gemini AI** - Yapay zeka önerileri için
- **React Team** - Harika frontend framework için
- **Microsoft** - ASP.NET Core için

---

⭐ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın! 