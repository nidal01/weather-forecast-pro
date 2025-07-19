# 🌐 Custom Domain Deployment - wfp.nidalirfanuymaz.com.tr

## 📋 Domain Yapısı

### Frontend Domain
- **Ana Domain**: `wfp.nidalirfanuymaz.com.tr`
- **Platform**: Vercel
- **SSL**: Otomatik (Vercel sağlar)

### Backend Domain
- **API Domain**: `wfp-api.nidalirfanuymaz.com.tr`
- **Platform**: Railway/Render
- **SSL**: Otomatik (Platform sağlar)

---

## 🚀 Deployment Adımları

### 1. Backend Deployment (Railway)

#### Railway'de Proje Oluşturma
1. **https://railway.app** adresine gidin
2. **GitHub ile giriş** yapın
3. **"New Project"** → **"Deploy from GitHub repo"**
4. Repository'nizi seçin
5. **Backend klasörünü** seçin

#### Environment Variables
```
ASPNETCORE_ENVIRONMENT=Production
```

#### Custom Domain Ayarlama
1. **Railway Dashboard** → **Settings** → **Domains**
2. **"Add Domain"** butonuna tıklayın
3. **Domain**: `wfp-api.nidalirfanuymaz.com.tr`
4. **SSL Certificate**: Otomatik oluşturulacak

#### DNS Ayarları (Domain Provider'da)
```
Type: CNAME
Name: wfp-api
Value: [Railway verdiği URL]
TTL: 3600
```

### 2. Frontend Deployment (Vercel)

#### Vercel'de Proje Oluşturma
1. **https://vercel.com** adresine gidin
2. **GitHub ile giriş** yapın
3. **"New Project"** butonuna tıklayın
4. Repository'nizi seçin
5. **Framework Preset**: `Vite`
6. **Root Directory**: `frontend`
7. **Build Command**: `npm run build`
8. **Output Directory**: `dist`

#### Environment Variables
```
Name: VITE_API_URL
Value: https://wfp-api.nidalirfanuymaz.com.tr
Environment: Production
```

#### Custom Domain Ayarlama
1. **Vercel Dashboard** → **Settings** → **Domains**
2. **"Add Domain"** butonuna tıklayın
3. **Domain**: `wfp.nidalirfanuymaz.com.tr`
4. **SSL Certificate**: Otomatik oluşturulacak

#### DNS Ayarları (Domain Provider'da)
```
Type: CNAME
Name: wfp
Value: cname.vercel-dns.com
TTL: 3600
```

---

## 🔧 DNS Ayarları (Domain Provider'da)

### Ana Domain: nidalirfanuymaz.com.tr

#### Subdomain Ayarları
```
wfp.nidalirfanuymaz.com.tr → Vercel (Frontend)
wfp-api.nidalirfanuymaz.com.tr → Railway (Backend)
```

#### CNAME Kayıtları
```
Type: CNAME
Name: wfp
Value: cname.vercel-dns.com
TTL: 3600

Type: CNAME  
Name: wfp-api
Value: [Railway verdiği URL]
TTL: 3600
```

---

## ✅ Deployment Sonrası Kontroller

### 1. Backend Test
```bash
# API endpoint'lerini test edin
curl https://wfp-api.nidalirfanuymaz.com.tr/api/weather/Istanbul
curl https://wfp-api.nidalirfanuymaz.com.tr/api/forecast/Istanbul
```

### 2. Frontend Test
- **https://wfp.nidalirfanuymaz.com.tr** adresini açın
- Ana sayfa yükleniyor mu?
- Büyük şehir kartları görünüyor mu?

### 3. Entegrasyon Test
- Şehir arama çalışıyor mu?
- AI önerileri geliyor mu?
- 5 günlük tahmin görünüyor mu?

---

## 🐛 Sorun Giderme

### DNS Sorunları
```bash
# DNS çözümleme kontrolü
nslookup wfp.nidalirfanuymaz.com.tr
nslookup wfp-api.nidalirfanuymaz.com.tr

# SSL sertifika kontrolü
curl -I https://wfp.nidalirfanuymaz.com.tr
curl -I https://wfp-api.nidalirfanuymaz.com.tr
```

### CORS Sorunları
```csharp
// Backend'de CORS ayarı (Program.cs)
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.WithOrigins("https://wfp.nidalirfanuymaz.com.tr")
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});
```

### Environment Variable Sorunları
```bash
# Vercel'de environment variable kontrolü
# Dashboard → Settings → Environment Variables
# VITE_API_URL = https://wfp-api.nidalirfanuymaz.com.tr
```

---

## 🔄 Güncelleme Süreci

### 1. Kod Güncelleme
```bash
git add .
git commit -m "Update features"
git push origin main
```

### 2. Otomatik Deployment
- **Vercel**: Otomatik olarak yeni deployment başlatır
- **Railway**: Otomatik olarak güncellenir

### 3. Domain Güncelleme
- DNS değişiklikleri 24-48 saat sürebilir
- SSL sertifikaları otomatik yenilenir

---

## 📊 Monitoring

### Vercel Analytics
- **Dashboard** → **Analytics**
- **Performance**: Sayfa yükleme süreleri
- **Visitors**: Ziyaretçi istatistikleri

### Railway Monitoring
- **Dashboard** → **Metrics**
- **CPU/Memory**: Sunucu kullanımı
- **Logs**: Uygulama logları

---

## 🔒 Güvenlik

### SSL Sertifikaları
- **Vercel**: Otomatik Let's Encrypt
- **Railway**: Otomatik SSL
- **HTTPS**: Zorunlu yönlendirme

### CORS Güvenliği
```csharp
// Sadece kendi domain'inden istek kabul et
builder.WithOrigins("https://wfp.nidalirfanuymaz.com.tr")
```

---

## 💰 Maliyet

### Vercel (Frontend)
- **Hobby Plan**: Ücretsiz
- **Custom Domain**: Ücretsiz
- **SSL**: Ücretsiz

### Railway (Backend)
- **Hobby Plan**: Ücretsiz (500 saat/ay)
- **Custom Domain**: Ücretsiz
- **SSL**: Ücretsiz

---

## 🎉 Sonuç

### Canlı URL'ler
- **Frontend**: https://wfp.nidalirfanuymaz.com.tr
- **Backend**: https://wfp-api.nidalirfanuymaz.com.tr

### Özellikler
- ✅ Custom domain
- ✅ SSL sertifikası
- ✅ Otomatik deployment
- ✅ Performance monitoring
- ✅ Analytics

---

## 📞 Destek

### Domain Sorunları
- Domain provider'ınızın destek ekibi
- DNS ayarları için teknik destek

### Deployment Sorunları
- **Vercel**: [Vercel Docs](https://vercel.com/docs)
- **Railway**: [Railway Docs](https://docs.railway.app) 