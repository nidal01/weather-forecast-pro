import React from 'react';

interface ForecastData {
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
}

interface ForecastResponse {
  list: ForecastData[];
  city: {
    name: string;
  };
}

interface ForecastCardProps {
  forecastData: ForecastResponse | null;
}

const ForecastCard: React.FC<ForecastCardProps> = ({ forecastData }) => {
  if (!forecastData || !forecastData.list || forecastData.list.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 max-w-6xl mx-auto">
        <div className="text-center text-gray-500">
          6 günlük tahmin verisi bulunamadı
        </div>
      </div>
    );
  }

  // Bugünün tarihini al
  const today = new Date();
  const todayString = today.toLocaleDateString('tr-TR', { 
    weekday: 'long', 
    month: 'short', 
    day: 'numeric' 
  });

  // 6 günlük veriyi günlere ayır (bugün dahil 6 gün)
  const groupByDay = (forecastList: ForecastData[]) => {
    const days: { [key: string]: ForecastData[] } = {};
    
    forecastList.forEach(item => {
      const date = new Date(item.dt * 1000);
      const dayKey = date.toLocaleDateString('tr-TR', { 
        weekday: 'long', 
        month: 'short', 
        day: 'numeric' 
      });
      
      if (!days[dayKey]) {
        days[dayKey] = [];
      }
      days[dayKey].push(item);
    });
    
    return days;
  };

  const allDailyForecasts = groupByDay(forecastData.list);
  
  // Sadece ilk 6 günü al (bugün + 5 gün sonrası)
  const dailyForecasts = Object.entries(allDailyForecasts)
    .slice(0, 6)
    .reduce((obj, [key, value]) => {
      obj[key] = value;
      return obj;
    }, {} as { [key: string]: ForecastData[] });

  // Her gün için en uygun ikonu ve istatistikleri hesapla
  const getDailyStats = (dayForecasts: ForecastData[]) => {
    const temps = dayForecasts.map(f => f.main.temp);
    const minTemps = dayForecasts.map(f => f.main.temp_min);
    const maxTemps = dayForecasts.map(f => f.main.temp_max);
    const humidities = dayForecasts.map(f => f.main.humidity);
    
    // En sık görülen hava durumunu bul
    const weatherCounts: { [key: string]: number } = {};
    dayForecasts.forEach(f => {
      const weatherKey = f.weather[0].description;
      weatherCounts[weatherKey] = (weatherCounts[weatherKey] || 0) + 1;
    });
    
    const mostCommonWeather = Object.entries(weatherCounts)
      .sort(([,a], [,b]) => b - a)[0][0];
    
    // En sık görülen hava durumuna ait ikonu bul
    const representativeForecast = dayForecasts.find(f => 
      f.weather[0].description === mostCommonWeather
    );
    
    // Özel ikon seçimi
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
    
    const customIcon = getCustomIcon(mostCommonWeather, representativeForecast?.weather[0].icon || dayForecasts[0].weather[0].icon);
    
    return {
      avgTemp: Math.round(temps.reduce((a, b) => a + b, 0) / temps.length),
      minTemp: Math.round(Math.min(...minTemps)),
      maxTemp: Math.round(Math.max(...maxTemps)),
      avgHumidity: Math.round(humidities.reduce((a, b) => a + b, 0) / humidities.length),
      icon: customIcon,
      description: mostCommonWeather,
      isEmoji: typeof customIcon === 'string' && customIcon.length <= 2
    };
  };

  return (
    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-2xl p-8 text-white">
      <h3 className="text-3xl font-bold text-center mb-8">
        {forecastData.city.name} - 6 Günlük Tahmin
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {Object.entries(dailyForecasts).map(([day, forecasts]) => {
          const stats = getDailyStats(forecasts);
          const isToday = day === todayString;
          
          return (
            <div key={day} className={`rounded-xl p-4 backdrop-blur-sm transition-all duration-300 ${
              isToday 
                ? 'bg-gradient-to-br from-yellow-400 to-orange-500 shadow-2xl scale-105 border-2 border-yellow-300' 
                : 'bg-white/20 hover:bg-white/30'
            }`}>
              <div className="text-center">
                <div className={`text-lg font-semibold mb-3 ${
                  isToday ? 'text-gray-800' : 'opacity-90'
                }`}>
                  {day}
                  {isToday && <span className="ml-2 text-sm bg-yellow-300 text-gray-800 px-2 py-1 rounded-full">BUGÜN</span>}
                </div>
                
                <div className="flex justify-center mb-4">
                  <div className={`rounded-full p-2 ${
                    isToday ? 'bg-white/80' : 'bg-white/30'
                  }`}>
                    {stats.isEmoji ? (
                      <div className="text-4xl w-12 h-12 flex items-center justify-center">
                        {stats.icon}
                      </div>
                    ) : (
                      <img 
                        src={stats.icon}
                        alt={stats.description}
                        className="w-12 h-12"
                      />
                    )}
                  </div>
                </div>
                
                <div className={`text-2xl font-bold mb-2 ${
                  isToday ? 'text-gray-800' : ''
                }`}>
                  {stats.avgTemp}°C
                </div>
                
                <div className={`text-sm capitalize mb-3 ${
                  isToday ? 'text-gray-700' : 'opacity-80'
                }`}>
                  {stats.description}
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className={isToday ? 'text-gray-700' : 'opacity-80'}>Min:</span>
                    <span className={`font-semibold ${isToday ? 'text-gray-800' : ''}`}>{stats.minTemp}°C</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className={isToday ? 'text-gray-700' : 'opacity-80'}>Max:</span>
                    <span className={`font-semibold ${isToday ? 'text-gray-800' : ''}`}>{stats.maxTemp}°C</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className={isToday ? 'text-gray-700' : 'opacity-80'}>Nem:</span>
                    <span className={`font-semibold ${isToday ? 'text-gray-800' : ''}`}>{stats.avgHumidity}%</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ForecastCard; 