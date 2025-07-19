# 🚀 Vercel Deployment Rehberi

## 📋 Ön Gereksinimler

### 1. Vercel Hesabı
- [Vercel](https://vercel.com) sitesine gidin
- GitHub hesabınızla ücretsiz kayıt olun

### 2. GitHub Repository
- Projeyi GitHub'a yükleyin
- Public repository olmalı

---

## 🔧 Backend Deployment (Railway/Render)

### Seçenek 1: Railway (Önerilen)

1. **Railway'e gidin**: https://railway.app
2. **GitHub ile giriş** yapın
3. **"New Project"** → **"Deploy from GitHub repo"**
4. Repository'nizi seçin
5. **Backend klasörünü** seçin
6. **Environment Variables** ekleyin:
   ```
   ASPNETCORE_ENVIRONMENT=Production
   ```
7. **Deploy** butonuna tıklayın
8. **Domain URL'ini** not alın (örn: `https://your-app.railway.app`)

### Seçenek 2: Render

1. **Render'e gidin**: https://render.com
2. **GitHub ile giriş** yapın
3. **"New Web Service"** → Repository seçin
4. **Build Command**: `dotnet restore && dotnet build`
5. **Start Command**: `dotnet run --urls "http://0.0.0.0:$PORT"`
6. **Environment Variables** ekleyin
7. **Deploy** edin

---

## 🌐 Frontend Deployment (Vercel)

### 1. Vercel'e Proje Yükleyin

1. **Vercel Dashboard**'a gidin
2. **"New Project"** butonuna tıklayın
3. **GitHub repository**'nizi seçin
4. **Framework Preset**: `Vite` seçin
5. **Root Directory**: `frontend` seçin
6. **Build Command**: `npm run build`
7. **Output Directory**: `dist`
8. **Install Command**: `npm install`

### 2. Environment Variables Ayarlayın

**Vercel Dashboard** → **Settings** → **Environment Variables**:

```
Name: VITE_API_URL
Value: https://your-backend-url.railway.app
Environment: Production
```

### 3. Deploy Edin

**"Deploy"** butonuna tıklayın ve bekleyin.

---

## 🔗 Domain Ayarları

### Custom Domain (İsteğe Bağlı)

1. **Vercel Dashboard** → **Settings** → **Domains**
2. **"Add Domain"** butonuna tıklayın
3. Domain adınızı girin
4. DNS ayarlarını yapın

---

## ✅ Deployment Sonrası Kontroller

### 1. Frontend Test
- Vercel URL'inizi açın
- Ana sayfa yükleniyor mu?
- Büyük şehir kartları görünüyor mu?

### 2. Backend Test
- Backend URL'inizi test edin
- API endpoint'leri çalışıyor mu?

### 3. Entegrasyon Test
- Şehir arama çalışıyor mu?
- AI önerileri geliyor mu?
- 5 günlük tahmin görünüyor mu?

---

## 🐛 Sorun Giderme

### Frontend Sorunları

**Build Hatası**
```bash
# Local test
cd frontend
npm run build
```

**Environment Variable Hatası**
- Vercel Dashboard'da `VITE_API_URL` doğru ayarlandı mı?
- Backend URL'i çalışıyor mu?

### Backend Sorunları

**Port Hatası**
```csharp
// Program.cs'de port ayarı
var port = Environment.GetEnvironmentVariable("PORT") ?? "5012";
app.Run($"http://0.0.0.0:{port}");
```

**CORS Hatası**
```csharp
// Program.cs'de CORS ayarı
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

## 📱 Production Optimizasyonları

### 1. Performance
- **Image Optimization**: Vercel otomatik yapar
- **Code Splitting**: Vite otomatik yapar
- **Caching**: Vercel otomatik yapar

### 2. SEO
- **Meta Tags**: `index.html`'de güncelleyin
- **Sitemap**: Otomatik oluşturulur
- **Robots.txt**: Otomatik oluşturulur

### 3. Analytics
- **Vercel Analytics**: Dashboard'da aktifleştirin
- **Google Analytics**: İsteğe bağlı ekleyin

---

## 🔄 Güncelleme Süreci

### 1. Kod Güncelleme
```bash
# Local değişiklikler
git add .
git commit -m "Update features"
git push origin main
```

### 2. Otomatik Deployment
- Vercel otomatik olarak yeni deployment başlatır
- Railway/Render de otomatik güncellenir

### 3. Rollback
- Vercel Dashboard'da önceki versiyona dönebilirsiniz

---

## 💰 Maliyet

### Vercel (Frontend)
- **Hobby Plan**: Ücretsiz
- **Pro Plan**: $20/ay (isteğe bağlı)

### Railway (Backend)
- **Hobby Plan**: Ücretsiz (500 saat/ay)
- **Pro Plan**: $5/ay (isteğe bağlı)

### Render (Backend)
- **Free Tier**: Ücretsiz (15 dakika idle)
- **Paid Plan**: $7/ay

---

## 🎉 Tebrikler!

Uygulamanız artık canlıda! 

**Frontend URL**: `https://your-app.vercel.app`  
**Backend URL**: `https://your-app.railway.app`

### 📊 Monitoring
- **Vercel Analytics**: Performans takibi
- **Railway Logs**: Backend logları
- **Uptime Monitoring**: Çalışma süresi

---

## 📞 Destek

### Vercel Destek
- [Vercel Docs](https://vercel.com/docs)
- [Vercel Community](https://github.com/vercel/vercel/discussions)

### Railway Destek
- [Railway Docs](https://docs.railway.app)
- [Railway Discord](https://discord.gg/railway)

### Render Destek
- [Render Docs](https://render.com/docs)
- [Render Community](https://community.render.com) 