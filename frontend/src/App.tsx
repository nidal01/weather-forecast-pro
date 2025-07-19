import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ForecastCard from './components/ForecastCard';
import WeatherAdvice from './components/WeatherAdvice';

interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
    pressure: number;
    temp_min: number;
    temp_max: number;
  };
  weather: Array<{
    description: string;
    icon: string;
  }>;
}

interface ForecastResponse {
  list: Array<{
    dt: number;
    main: {
      temp: number;
      temp_min: number;
      temp_max: number;
      humidity: number;
    };
    weather: Array<{
      description: string;
      icon: string;
    }>;
    dt_txt: string;
  }>;
  city: {
    name: string;
  };
}

interface CitySuggestion {
  name: string;
  country: string;
  state?: string;
  isTurkish?: boolean;
}

// Türkiye'nin büyük şehirleri
const MAJOR_CITIES = [
  { name: 'Istanbul', displayName: 'İstanbul' },
  { name: 'Ankara', displayName: 'Ankara' },
  { name: 'Izmir', displayName: 'İzmir' },
  { name: 'Bursa', displayName: 'Bursa' },
  { name: 'Antalya', displayName: 'Antalya' },
  { name: 'Adana', displayName: 'Adana' }
];

// Türkiye şehirleri listesi (öncelik için)
const TURKISH_CITIES = [
  'Adana', 'Adıyaman', 'Afyonkarahisar', 'Ağrı', 'Amasya', 'Ankara', 'Antalya', 'Artvin', 'Aydın', 'Balıkesir',
  'Bilecik', 'Bingöl', 'Bitlis', 'Bolu', 'Burdur', 'Bursa', 'Çanakkale', 'Çankırı', 'Çorum', 'Denizli',
  'Diyarbakır', 'Edirne', 'Elazığ', 'Erzincan', 'Erzurum', 'Eskişehir', 'Gaziantep', 'Giresun', 'Gümüşhane', 'Hakkari',
  'Hatay', 'Isparta', 'Mersin', 'İstanbul', 'İzmir', 'Kars', 'Kastamonu', 'Kayseri', 'Kırklareli', 'Kırşehir',
  'Kocaeli', 'Konya', 'Kütahya', 'Malatya', 'Manisa', 'Kahramanmaraş', 'Mardin', 'Muğla', 'Muş', 'Nevşehir',
  'Niğde', 'Ordu', 'Rize', 'Sakarya', 'Samsun', 'Siirt', 'Sinop', 'Sivas', 'Tekirdağ', 'Tokat',
  'Trabzon', 'Tunceli', 'Şanlıurfa', 'Uşak', 'Van', 'Yozgat', 'Zonguldak', 'Aksaray', 'Bayburt', 'Karaman',
  'Kırıkkale', 'Batman', 'Şırnak', 'Bartın', 'Ardahan', 'Iğdır', 'Yalova', 'Karabük', 'Kilis', 'Osmaniye', 'Düzce'
];

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState<CitySuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [majorCitiesWeather, setMajorCitiesWeather] = useState<WeatherData[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);

  // Ana sayfa yüklendiğinde büyük şehirlerin hava durumunu al
  useEffect(() => {
    fetchMajorCitiesWeather();
  }, []);

  // Dinamik arama önerileri
  useEffect(() => {
    if (city.trim().length >= 2) {
      fetchCitySuggestions(city);
    } else {
      setSearchSuggestions([]);
      setShowSuggestions(false);
    }
  }, [city]);

  // %100 eşleşme kontrolü
  useEffect(() => {
    if (searchSuggestions.length > 0 && city.trim()) {
      const exactMatch = searchSuggestions.find(suggestion => 
        suggestion.name.toLowerCase() === city.toLowerCase()
      );
      
      if (exactMatch) {
        setShowSuggestions(false);
      }
    }
  }, [searchSuggestions, city]);

  const fetchCitySuggestions = async (searchTerm: string) => {
    setSearchLoading(true);
    try {
      // Sadece Türkiye şehirlerinden arama yap
      const turkishMatches = TURKISH_CITIES.filter(cityName => 
        cityName.toLowerCase().includes(searchTerm.toLowerCase())
      ).map(cityName => ({
        name: cityName,
        country: 'Türkiye',
        state: undefined,
        isTurkish: true
      }));
      
      // Sonuçları sınırla ve ayarla
      setSearchSuggestions(turkishMatches.slice(0, 12));
      setShowSuggestions(true);
      
    } catch (error) {
      console.error('Şehir önerileri alınamadı:', error);
      setSearchSuggestions([]);
      setShowSuggestions(false);
    } finally {
      setSearchLoading(false);
    }
  };

  const fetchMajorCitiesWeather = async () => {
    try {
      const promises = MAJOR_CITIES.map(city => 
        axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5012'}/api/weather/${city.name}`)
          .then(response => response.data)
          .catch(() => null)
      );
      
      const results = await Promise.all(promises);
      const validResults = results.filter(result => result !== null);
      setMajorCitiesWeather(validResults);
    } catch (error) {
      console.error('Büyük şehirler hava durumu alınamadı:', error);
    }
  };

  const fetchWeather = async (cityName: string) => {
    if (!cityName.trim()) {
      setError('Lütfen bir şehir adı girin');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      // Hava durumu verilerini paralel olarak al
      const [weatherResponse, forecastResponse] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5012'}/api/weather/${cityName}`),
        axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5012'}/api/forecast/${cityName}`)
      ]);
      
      setWeatherData(weatherResponse.data);
      setForecastData(forecastResponse.data);
      
      // Sayfanın en üstüne scroll et
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
    } catch (error: any) {
      console.error('Hava durumu verisi alınamadı:', error);
      if (error.response?.status === 404) {
        setError(`Hava durumu bilgisi bulunamadı: ${cityName}`);
      } else {
        setError('Hava durumu verisi alınırken bir hata oluştu');
      }
      setWeatherData(null);
      setForecastData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchWeather(city);
  };

  const handleSuggestionClick = (suggestion: CitySuggestion) => {
    setCity(suggestion.name);
    setShowSuggestions(false);
    fetchWeather(suggestion.name);
  };

  // Güvenli weather verisi alma
  const getWeatherInfo = (data: WeatherData) => {
    if (!data || !data.weather || data.weather.length === 0) {
      return {
        description: 'Bilinmiyor',
        icon: '01d'
      };
    }
    return data.weather[0];
  };

  // Güvenli main verisi alma
  const getMainInfo = (data: WeatherData) => {
    if (!data || !data.main) {
      return {
        temp: 0,
        humidity: 0,
        pressure: 0,
        temp_min: 0,
        temp_max: 0
      };
    }
    return data.main;
  };

  // Özel ikon seçimi fonksiyonu
  const getCustomIcon = (description: string, apiIcon: string) => {
    const desc = description.toLowerCase();
    
    // Güneşli hava durumları için özel ikonlar
    if (desc.includes('açık') || desc.includes('clear')) {
      return '☀️'; // Güneş emoji
    }
    if (desc.includes('parçalı') || desc.includes('partly')) {
      return '⛅'; // Parçalı bulutlu
    }
    if (desc.includes('bulutlu') || desc.includes('cloudy')) {
      return '☁️'; // Bulutlu
    }
    if (desc.includes('yağmur') || desc.includes('rain')) {
      return '🌧️'; // Yağmurlu
    }
    if (desc.includes('kar') || desc.includes('snow')) {
      return '❄️'; // Karlı
    }
    if (desc.includes('fırtına') || desc.includes('storm')) {
      return '⛈️'; // Fırtınalı
    }
    if (desc.includes('sis') || desc.includes('fog')) {
      return '🌫️'; // Sisli
    }
    
    // Varsayılan olarak API ikonunu kullan
    return `https://openweathermap.org/img/wn/${apiIcon}@2x.png`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Weather Forecast Pro
          </h1>
          <p className="text-gray-600">
            Dünyanın her yerinden hava durumu bilgilerini görüntüleyin
          </p>
        </div>

        {/* Arama Formu */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8 max-w-md mx-auto relative">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <div className="flex-1 relative">
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Şehir adı girin (en az 2 harf)..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              
              {/* Arama Önerileri */}
              {showSuggestions && searchSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-80 overflow-y-auto">
                  {searchLoading && (
                    <div className="px-4 py-2 text-gray-500 text-center">
                      Aranıyor...
                    </div>
                  )}
                  
                  {/* Türkiye Şehirleri */}
                  <div className="px-4 py-2 bg-blue-50 text-blue-700 font-semibold text-sm border-b">
                    🇹🇷 Türkiye Şehirleri
                  </div>
                  {searchSuggestions.map((suggestion, index) => (
                    <button
                      key={`turkish-${index}`}
                      type="button"
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="w-full text-left px-4 py-2 hover:bg-blue-50 focus:bg-blue-50 focus:outline-none border-b border-gray-100 last:border-b-0"
                    >
                      <div className="font-medium">{suggestion.name}</div>
                      <div className="text-sm text-blue-600">
                        {suggestion.state && `${suggestion.state}, `}{suggestion.country}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Aranıyor...' : 'Ara'}
            </button>
          </form>
        </div>

        {/* Hata Mesajı */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6 max-w-md mx-auto">
            {error}
          </div>
        )}

        {/* Seçilen Şehrin Detaylı Hava Durumu - ÜSTTE */}
        {weatherData && (
          <div className="mb-8 space-y-8">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
              {weatherData.name} - Detaylı Hava Durumu
            </h2>
            
            {/* Ana Hava Durumu Kartı - AI Önerileri ile Entegre */}
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-2xl p-8 max-w-5xl mx-auto text-white">
              <div className="text-center">
                <h2 className="text-4xl font-bold mb-4">{weatherData.name}</h2>
                
                <div className="flex items-center justify-center mb-6">
                  <div className="bg-white/20 rounded-full p-4 mr-6">
                    {(() => {
                      const customIcon = getCustomIcon(getWeatherInfo(weatherData).description, getWeatherInfo(weatherData).icon);
                      const isEmoji = typeof customIcon === 'string' && customIcon.length <= 2;
                      
                      return isEmoji ? (
                        <div className="text-6xl w-20 h-20 flex items-center justify-center">
                          {customIcon}
                        </div>
                      ) : (
                        <img 
                          src={customIcon}
                          alt={getWeatherInfo(weatherData).description}
                          className="w-20 h-20"
                        />
                      );
                    })()}
                  </div>
                  <div>
                    <div className="text-6xl font-bold mb-2">{Math.round(getMainInfo(weatherData).temp)}°C</div>
                    <div className="text-xl capitalize opacity-90">{getWeatherInfo(weatherData).description}</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="bg-white/20 rounded-xl p-4 backdrop-blur-sm">
                    <div className="text-sm opacity-80 mb-1">Nem</div>
                    <div className="text-2xl font-bold">{getMainInfo(weatherData).humidity}%</div>
                  </div>
                  <div className="bg-white/20 rounded-xl p-4 backdrop-blur-sm">
                    <div className="text-sm opacity-80 mb-1">Basınç</div>
                    <div className="text-2xl font-bold">{getMainInfo(weatherData).pressure} hPa</div>
                  </div>
                </div>

                {/* AI Önerileri - Ana kartın içinde */}
                <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm border border-white/20">
                  <div className="text-center mb-4">
                    <div className="text-2xl font-bold mb-2">🤖 AI Önerileri</div>
                    <div className="text-sm opacity-80">Kişiselleştirilmiş hava durumu tavsiyeleri</div>
                  </div>
                  
                  <WeatherAdvice
                    city={weatherData.name}
                    temperature={getMainInfo(weatherData).temp}
                    weatherDescription={getWeatherInfo(weatherData).description}
                    humidity={getMainInfo(weatherData).humidity}
                    minTemperature={getMainInfo(weatherData).temp_min}
                    maxTemperature={getMainInfo(weatherData).temp_max}
                  />
                </div>
              </div>
            </div>

            {/* Sıcaklık Bilgileri - Yeniden Tasarlandı */}
            <div className="max-w-5xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-800 text-center mb-8">
                {weatherData.name} - Sıcaklık Bilgileri
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl shadow-xl p-6 text-white transform hover:scale-105 transition-transform duration-300">
                  <div className="text-center">
                    <div className="text-lg font-semibold mb-2 opacity-90">Mevcut Sıcaklık</div>
                    <div className="text-5xl font-bold mb-3">{Math.round(getMainInfo(weatherData).temp)}°C</div>
                    <div className="text-sm opacity-80 capitalize">{getWeatherInfo(weatherData).description}</div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-2xl shadow-xl p-6 text-white transform hover:scale-105 transition-transform duration-300">
                  <div className="text-center">
                    <div className="text-lg font-semibold mb-2 opacity-90">Günlük En Düşük</div>
                    <div className="text-5xl font-bold mb-3">{Math.round(getMainInfo(weatherData).temp_min)}°C</div>
                    <div className="text-sm opacity-80">Bugün</div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-red-400 to-red-600 rounded-2xl shadow-xl p-6 text-white transform hover:scale-105 transition-transform duration-300">
                  <div className="text-center">
                    <div className="text-lg font-semibold mb-2 opacity-90">Günlük En Yüksek</div>
                    <div className="text-5xl font-bold mb-3">{Math.round(getMainInfo(weatherData).temp_max)}°C</div>
                    <div className="text-sm opacity-80">Bugün</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 5 Günlük Tahmin */}
            {forecastData && (
              <div className="mt-12 max-w-5xl mx-auto">
                <ForecastCard forecastData={forecastData} />
              </div>
            )}
          </div>
        )}

        {/* Büyük Şehirler Hava Durumu - ALTTA */}
        {majorCitiesWeather.length > 0 && (
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              Türkiye'nin Büyük Şehirleri
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {majorCitiesWeather.map((cityData, index) => {
                const weatherInfo = getWeatherInfo(cityData);
                const mainInfo = getMainInfo(cityData);
                
                return (
                  <div key={index} 
                       className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105 border border-gray-100"
                       onClick={() => {
                         setCity(cityData.name);
                         fetchWeather(cityData.name);
                         // Sayfanın en üstüne scroll et
                         window.scrollTo({ top: 0, behavior: 'smooth' });
                       }}>
                    <div className="p-6 text-center">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">{cityData.name}</h3>
                      
                      <div className="flex items-center justify-center mb-6">
                        <div className="bg-blue-50 rounded-full p-3 mr-4">
                          {(() => {
                            const customIcon = getCustomIcon(weatherInfo.description, weatherInfo.icon);
                            const isEmoji = typeof customIcon === 'string' && customIcon.length <= 2;
                            
                            return isEmoji ? (
                              <div className="text-3xl w-14 h-14 flex items-center justify-center">
                                {customIcon}
                              </div>
                            ) : (
                              <img 
                                src={customIcon}
                                alt={weatherInfo.description}
                                className="w-14 h-14"
                              />
                            );
                          })()}
                        </div>
                        <div>
                          <div className="text-3xl font-bold text-gray-800 mb-1">{Math.round(mainInfo.temp)}°C</div>
                          <div className="text-sm text-gray-600 capitalize">{weatherInfo.description}</div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-blue-50 rounded-xl p-3">
                          <div className="text-xs text-blue-600 font-medium mb-1">Nem</div>
                          <div className="text-lg font-bold text-blue-800">{mainInfo.humidity}%</div>
                        </div>
                        <div className="bg-green-50 rounded-xl p-3">
                          <div className="text-xs text-green-600 font-medium mb-1">Günlük Min/Max</div>
                          <div className="text-lg font-bold text-green-800">{Math.round(mainInfo.temp_min)}°/{Math.round(mainInfo.temp_max)}°</div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App; 