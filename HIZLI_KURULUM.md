# ⚡ Weather Forecast Pro - Hızlı Kurulum

## 🎯 Sadece Çalıştırın!

API anahtarları zaten ayarlanmış. Sadece aşağıdaki adımları takip edin:

---

## 🚀 1. Otomatik Kurulum

**KURULUM_SCRIPT.bat** dosyasını çift tıklayın ve bekleyin.

✅ Sistem kontrolleri yapılacak  
✅ Bağımlılıklar yüklenecek  
✅ Kurulum tamamlanacak  

---

## 🖥️ 2. Uygulamayı Başlatın

### Backend'i Başlatın:
```bash
cd backend
dotnet run
```

**Başarılı olduğunda şu mesajı göreceksiniz:**
```
Now listening on: http://localhost:5012
```

### Frontend'i Başlatın (Yeni Terminal):
```bash
cd frontend
npm run dev
```

**Başarılı olduğunda şu mesajı göreceksiniz:**
```
Local: http://localhost:5173/
```

---

## 🌐 3. Tarayıcıda Açın

**http://localhost:5173** adresine gidin

---

## ✅ Tamam! Uygulama Çalışıyor!

### 🎉 Özellikler:
- **🌤️ Gerçek Zamanlı Hava Durumu**
- **🤖 AI Önerileri** (Kıyafet, Aktivite, Sağlık)
- **📅 5 Günlük Tahmin**
- **🇹🇷 Türkiye Şehirleri**
- **📱 Modern Tasarım**

### 🎯 Nasıl Kullanılır:
1. **Büyük Şehirler**: Kartlara tıklayın
2. **Arama**: Şehir adı yazın ve "Ara" butonuna tıklayın
3. **AI Önerileri**: Otomatik olarak görüntülenir

---

## 🆘 Sorun Yaşarsanız

### Backend Çalışmıyor:
```bash
# Port kullanımda olabilir
dotnet run --urls "http://localhost:5013"
```

### Frontend Çalışmıyor:
```bash
# Node modules'ü temizleyin
rm -rf node_modules
npm install
npm run dev
```

### Tarayıcıda Açılmıyor:
- **http://localhost:5173** adresini kontrol edin
- Backend ve frontend'in çalıştığından emin olun

---

## 📞 Destek

Sorun yaşarsanız:
1. Bu rehberi tekrar okuyun
2. Hata mesajlarını kontrol edin
3. Backend ve frontend'in aynı anda çalıştığından emin olun

---

## 🎊 Tebrikler!

Modern AI destekli hava durumu uygulamanız hazır! 🌟 