# 🔧 DNS Ayarları - wfp.nidalirfanuymaz.com.tr

## 📋 Gerekli DNS Kayıtları

### Domain Provider'ınızda (nidalirfanuymaz.com.tr) şu kayıtları ekleyin:

---

## 🌐 Frontend DNS Ayarı

### CNAME Kaydı
```
Type: CNAME
Name: wfp
Value: cname.vercel-dns.com
TTL: 3600 (veya 1 saat)
```

**Sonuç**: `wfp.nidalirfanuymaz.com.tr` → Vercel

---

## 🔌 Backend DNS Ayarı

### CNAME Kaydı
```
Type: CNAME
Name: wfp-api
Value: [Railway verdiği URL]
TTL: 3600 (veya 1 saat)
```

**Not**: Railway'den aldığınız URL'yi buraya yazın (örn: `your-app.railway.app`)

**Sonuç**: `wfp-api.nidalirfanuymaz.com.tr` → Railway

---

## ⏱️ DNS Yayılma Süresi

- **Yerel**: 1-2 saat
- **Global**: 24-48 saat
- **Test**: `nslookup wfp.nidalirfanuymaz.com.tr`

---

## ✅ Test Komutları

### DNS Çözümleme Testi
```bash
# Frontend test
nslookup wfp.nidalirfanuymaz.com.tr

# Backend test  
nslookup wfp-api.nidalirfanuymaz.com.tr
```

### SSL Sertifika Testi
```bash
# Frontend SSL
curl -I https://wfp.nidalirfanuymaz.com.tr

# Backend SSL
curl -I https://wfp-api.nidalirfanuymaz.com.tr
```

---

## 🐛 Sorun Giderme

### DNS Çözümlenmiyor
1. **TTL süresini bekleyin** (1-2 saat)
2. **DNS cache'i temizleyin**: `ipconfig /flushdns`
3. **Farklı DNS server deneyin**: 8.8.8.8, 1.1.1.1

### SSL Sertifika Hatası
1. **Platform'da domain'i doğrulayın**
2. **DNS ayarlarının doğru olduğundan emin olun**
3. **24 saat bekleyin** (SSL otomatik oluşturulur)

---

## 📞 Destek

### Domain Provider
- DNS ayarları için domain provider'ınızın destek ekibi
- CNAME kayıtları için teknik destek

### Platform Destek
- **Vercel**: [Vercel Docs](https://vercel.com/docs)
- **Railway**: [Railway Docs](https://docs.railway.app) 