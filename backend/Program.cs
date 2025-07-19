using System.Text;
using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddOpenApi();
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.WithOrigins("https://wfp.nidalirfanuymaz.com.tr")
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

builder.Services.AddHttpClient();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

// Production için HTTPS yönlendirmesini kaldır
if (app.Environment.IsDevelopment())
{
    app.UseHttpsRedirection();
}

app.UseCors();

// Anlık hava durumu endpoint'i (günlük min/max değerleri ile)
app.MapGet("/api/weather/{city}", async (string city, IHttpClientFactory httpClientFactory) =>
{
    // ⚠️ ÖNEMLİ: Buraya kendi OpenWeatherMap API anahtarınızı ekleyin!
    // https://openweathermap.org/ adresinden ücretsiz hesap oluşturup API anahtarı alın
    const string apiKey = "8926caaf9ed4e4375965e33dc03c7c78";
    
    // Doğru API endpoint'i: Current Weather Data API
    const string currentWeatherUrl = "https://api.openweathermap.org/data/2.5/weather";
    const string forecastUrl = "https://api.openweathermap.org/data/2.5/forecast";
    
    if (apiKey == "AIzaSyCP7jGDFdjKhqqA--ejr0gkvJZwJpQRBRY")
    {
        return Results.Problem("API anahtarı ayarlanmamış! Lütfen Program.cs dosyasında kendi API anahtarınızı ekleyin.");
    }
    
    try
    {
        var client = httpClientFactory.CreateClient();
        
        // Anlık hava durumu ve günlük tahmin verilerini paralel olarak al
        var currentWeatherTask = client.GetAsync($"{currentWeatherUrl}?q={city}&appid={apiKey}&units=metric&lang=tr");
        var forecastTask = client.GetAsync($"{forecastUrl}?q={city}&appid={apiKey}&units=metric&lang=tr");
        
        await Task.WhenAll(currentWeatherTask, forecastTask);
        
        var currentWeatherResponse = await currentWeatherTask;
        var forecastResponse = await forecastTask;
        
        Console.WriteLine($"Anlık hava durumu API yanıt kodu: {currentWeatherResponse.StatusCode}");
        Console.WriteLine($"Tahmin API yanıt kodu: {forecastResponse.StatusCode}");
        
        if (currentWeatherResponse.IsSuccessStatusCode && forecastResponse.IsSuccessStatusCode)
        {
            var currentWeatherContent = await currentWeatherResponse.Content.ReadAsStringAsync();
            var forecastContent = await forecastResponse.Content.ReadAsStringAsync();
            
            Console.WriteLine($"Başarılı yanıt alındı: {currentWeatherContent.Substring(0, Math.Min(200, currentWeatherContent.Length))}...");
            
            // JSON'ları parse et
            var currentWeatherJson = System.Text.Json.JsonSerializer.Deserialize<System.Text.Json.JsonElement>(currentWeatherContent);
            var forecastJson = System.Text.Json.JsonSerializer.Deserialize<System.Text.Json.JsonElement>(forecastContent);
            
            // Günlük min/max değerlerini hesapla
            var dailyMinMax = CalculateDailyMinMax(forecastJson);
            
            // Anlık hava durumu verisine günlük min/max değerlerini ekle
            if (currentWeatherJson.TryGetProperty("main", out var mainElement))
            {
                var mainObject = mainElement.GetRawText();
                var mainJson = System.Text.Json.JsonSerializer.Deserialize<System.Text.Json.JsonElement>(mainObject);
                
                // Min/max değerlerini güncelle
                var updatedMain = new
                {
                    temp = mainJson.GetProperty("temp").GetDouble(),
                    humidity = mainJson.GetProperty("humidity").GetInt32(),
                    pressure = mainJson.GetProperty("pressure").GetInt32(),
                    temp_min = dailyMinMax.min,
                    temp_max = dailyMinMax.max
                };
                
                // Güncellenmiş veriyi oluştur
                var updatedWeather = new
                {
                    name = currentWeatherJson.GetProperty("name").GetString(),
                    main = updatedMain,
                    weather = currentWeatherJson.GetProperty("weather")
                };
                
                return Results.Json(updatedWeather);
            }
            
            // Fallback: Orijinal veriyi döndür
            return Results.Json(System.Text.Json.JsonSerializer.Deserialize<object>(currentWeatherContent));
        }
        else
        {
            var errorContent = await currentWeatherResponse.Content.ReadAsStringAsync();
            Console.WriteLine($"Hata yanıtı: {errorContent}");
            
            if (currentWeatherResponse.StatusCode == System.Net.HttpStatusCode.Unauthorized)
            {
                return Results.Problem("API anahtarı geçersiz. Lütfen OpenWeatherMap API anahtarınızı kontrol edin.");
            }
            else if (currentWeatherResponse.StatusCode == System.Net.HttpStatusCode.NotFound)
            {
                return Results.NotFound($"Hava durumu bilgisi bulunamadı: {city}");
            }
            else
            {
                return Results.Problem($"API hatası: {currentWeatherResponse.StatusCode} - {errorContent}");
            }
        }
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Hata oluştu: {ex.Message}");
        return Results.Problem($"Hava durumu verisi alınırken hata oluştu: {ex.Message}");
    }
})
.WithName("GetWeatherForecast");

// Günlük min/max değerlerini hesaplayan yardımcı fonksiyon
(double min, double max) CalculateDailyMinMax(System.Text.Json.JsonElement forecastJson)
{
    try
    {
        if (forecastJson.TryGetProperty("list", out var listElement))
        {
            var today = DateTime.Today;
            var todayTemps = new List<double>();
            
            foreach (var item in listElement.EnumerateArray())
            {
                if (item.TryGetProperty("dt", out var dtElement) && 
                    item.TryGetProperty("main", out var mainElement))
                {
                    var timestamp = dtElement.GetInt64();
                    var itemDate = DateTimeOffset.FromUnixTimeSeconds(timestamp).DateTime.Date;
                    
                    // Sadece bugünün verilerini al
                    if (itemDate == today)
                    {
                        var temp = mainElement.GetProperty("temp").GetDouble();
                        todayTemps.Add(temp);
                    }
                }
            }
            
            if (todayTemps.Count > 0)
            {
                return (todayTemps.Min(), todayTemps.Max());
            }
        }
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Min/max hesaplama hatası: {ex.Message}");
    }
    
    // Fallback değerler
    return (0, 0);
}

// 5 günlük hava durumu tahmini endpoint'i
app.MapGet("/api/forecast/{city}", async (string city, IHttpClientFactory httpClientFactory) =>
{
    // ⚠️ ÖNEMLİ: Buraya kendi OpenWeatherMap API anahtarınızı ekleyin!
    const string apiKey = "8926caaf9ed4e4375965e33dc03c7c78";
    
    // 5 günlük tahmin API endpoint'i
    const string baseUrl = "https://api.openweathermap.org/data/2.5/forecast";
    
    if (apiKey == "BURAYA_KENDI_API_ANAHTARINIZI_YAZIN")
    {
        return Results.Problem("API anahtarı ayarlanmamış! Lütfen Program.cs dosyasında kendi API anahtarınızı ekleyin.");
    }
    
    try
    {
        var client = httpClientFactory.CreateClient();
        var url = $"{baseUrl}?q={city}&appid={apiKey}&units=metric&lang=tr";
        
        Console.WriteLine($"5 günlük tahmin API isteği gönderiliyor: {url}");
        
        var response = await client.GetAsync(url);
        
        Console.WriteLine($"5 günlük tahmin API yanıt kodu: {response.StatusCode}");
        
        if (response.IsSuccessStatusCode)
        {
            var content = await response.Content.ReadAsStringAsync();
            Console.WriteLine($"5 günlük tahmin başarılı yanıt alındı: {content.Substring(0, Math.Min(200, content.Length))}...");
            
            // JSON string'i JSON objesine çevir ve döndür
            return Results.Json(System.Text.Json.JsonSerializer.Deserialize<object>(content));
        }
        else
        {
            var errorContent = await response.Content.ReadAsStringAsync();
            Console.WriteLine($"5 günlük tahmin hata yanıtı: {errorContent}");
            
            if (response.StatusCode == System.Net.HttpStatusCode.Unauthorized)
            {
                return Results.Problem("API anahtarı geçersiz. Lütfen OpenWeatherMap API anahtarınızı kontrol edin.");
            }
            else if (response.StatusCode == System.Net.HttpStatusCode.NotFound)
            {
                return Results.NotFound($"5 günlük tahmin bilgisi bulunamadı: {city}");
            }
            else
            {
                return Results.Problem($"5 günlük tahmin API hatası: {response.StatusCode} - {errorContent}");
            }
        }
    }
    catch (Exception ex)
    {
        Console.WriteLine($"5 günlük tahmin hatası oluştu: {ex.Message}");
        return Results.Problem($"5 günlük tahmin verisi alınırken hata oluştu: {ex.Message}");
    }
})
.WithName("GetWeatherForecast5Days");

// Gemini AI için hava durumu önerileri endpoint'i
app.MapPost("/api/weather-advice", async (WeatherAdviceRequest request, IHttpClientFactory httpClientFactory) =>
{
    // ⚠️ ÖNEMLİ: Buraya kendi Gemini API anahtarınızı ekleyin!
    // https://makersuite.google.com/app/apikey adresinden ücretsiz API anahtarı alın
    const string geminiApiKey = "AIzaSyCP7jGDFdjKhqqA--ejr0gkvJZwJpQRBRY";
    const string geminiApiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
    
    try
    {
        var client = httpClientFactory.CreateClient();
        
        // Gemini AI için prompt oluştur
        var prompt = $@"
{request.City}: {request.Temperature}°C, {request.WeatherDescription}

SADECE 4 KISA CÜMLE YAZ:

**Kıyafet**: [1 cümle]
**Aktivite**: [1 cümle]  
**Aksesuar**: [1 cümle]
**Sağlık**: [1 cümle]

Maksimum 4 cümle. Uzun açıklamalar YOK. Sadece cümle yaz.
";

        var requestBody = new
        {
            contents = new[]
            {
                new
                {
                    parts = new[]
                    {
                        new { text = prompt }
                    }
                }
            }
        };

        var jsonContent = JsonSerializer.Serialize(requestBody);
        var content = new StringContent(jsonContent, Encoding.UTF8, "application/json");
        
        // Header ile API anahtarını gönder
        var requestMessage = new HttpRequestMessage(HttpMethod.Post, geminiApiUrl);
        requestMessage.Headers.Add("X-goog-api-key", geminiApiKey);
        requestMessage.Content = content;
        
        var response = await client.SendAsync(requestMessage);
        
        if (response.IsSuccessStatusCode)
        {
            var responseContent = await response.Content.ReadAsStringAsync();
            var responseJson = JsonSerializer.Deserialize<JsonElement>(responseContent);
            
            if (responseJson.TryGetProperty("candidates", out var candidates) && 
                candidates.GetArrayLength() > 0 &&
                candidates[0].TryGetProperty("content", out var contentElement) &&
                contentElement.TryGetProperty("parts", out var parts) &&
                parts.GetArrayLength() > 0 &&
                parts[0].TryGetProperty("text", out var textElement))
            {
                var advice = textElement.GetString();
                return Results.Ok(new { advice });
            }
        }
        
        return Results.Problem("Gemini AI'dan yanıt alınamadı.");
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Gemini AI hatası: {ex.Message}");
        return Results.Problem($"AI önerisi alınırken hata oluştu: {ex.Message}");
    }
})
.WithName("GetWeatherAdvice");

// Production port ayarı
var port = Environment.GetEnvironmentVariable("PORT") ?? "5012";
app.Run($"http://0.0.0.0:{port}");
