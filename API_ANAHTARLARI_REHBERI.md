# 🔑 API Anahtarları - Hızlı Rehber

## ⚡ 5 Dakikada API Anahtarlarını Alın

### 1️⃣ OpenWeatherMap API Anahtarı (2 dakika)

1. **https://openweathermap.org** adresine gidin
2. Sağ üstte **"Sign Up"** butonuna tıklayın
3. E-posta ve şifre ile ücretsiz hesap oluşturun
4. Giriş yaptıktan sonra **"API Keys"** sekmesine tıklayın
5. **"Default"** anahtarınızı kopyalayın (uzun bir metin)

### 2️⃣ Gemini AI API Anahtarı (3 dakika)

1. **https://makersuite.google.com/app/apikey** adresine gidin
2. Google hesabınızla giriş yapın
3. **"Create API Key"** butonuna tıklayın
4. Oluşturulan anahtarı kopyalayın

### 3️⃣ API Anahtarlarını Ayarlama (1 dakika)

1. `backend/Program.cs` dosyasını **Notepad** ile açın
2. Aşağıdaki satırları bulun:

```csharp
// Satır 50 civarı - OpenWeatherMap
const string apiKey = "BURAYA_OPENWEATHER_API_ANAHTARINIZI_YAZIN";

// Satır 250 civarı - Gemini AI  
const string geminiApiKey = "BURAYA_GEMINI_API_ANAHTARINIZI_YAZIN";
```

3. Bu satırları şu şekilde değiştirin:

```csharp
// OpenWeatherMap API anahtarınızı buraya yapıştırın
const string apiKey = "abc123def456ghi789..."; // Sizin anahtarınız

// Gemini AI API anahtarınızı buraya yapıştırın
const string geminiApiKey = "AIzaSyC..."; // Sizin anahtarınız
```

4. Dosyayı kaydedin

### ✅ Tamam! Artık uygulama çalışmaya hazır!

---

## 🆘 Sorun Yaşarsanız

### API Anahtarı Çalışmıyor
- Anahtarları doğru kopyaladığınızdan emin olun
- Backend'i yeniden başlatın: `Ctrl+C` → `dotnet run`

### Hesap Oluşturma Sorunu
- **OpenWeatherMap**: E-posta doğrulaması gerekebilir
- **Gemini AI**: Google hesabı yeterli

### Dosya Açma Sorunu
- **Notepad** yerine **VS Code** kullanabilirsiniz
- Dosyayı sağ tıklayıp "Birlikte Aç" → "Notepad" seçin

---

## 💡 İpucu

API anahtarlarını aldıktan sonra **KURULUM_SCRIPT.bat** dosyasını çalıştırarak otomatik kurulum yapabilirsiniz! 