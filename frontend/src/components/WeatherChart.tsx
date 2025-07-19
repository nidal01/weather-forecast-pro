import React from 'react';

interface WeatherData {
  name: string;
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
  };
  weather: Array<{
    description: string;
    icon: string;
  }>;
}

interface WeatherChartProps {
  weatherData: WeatherData | null;
}

const WeatherChart: React.FC<WeatherChartProps> = ({ weatherData }) => {
  if (!weatherData) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
        <div className="text-center text-gray-500">
          Grafik verisi bulunamadı
        </div>
      </div>
    );
  }

  const cityName = weatherData.name;
  const currentTemp = Math.round(weatherData.main.temp);
  const minTemp = Math.round(weatherData.main.temp_min);
  const maxTemp = Math.round(weatherData.main.temp_max);
  const description = weatherData.weather[0]?.description || '';

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
      <div className="text-center">
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          {cityName} - Anlık Hava Durumu
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="text-blue-600 font-semibold">Mevcut Sıcaklık</div>
            <div className="text-3xl font-bold text-blue-800">{currentTemp}°C</div>
            <div className="text-sm text-blue-600">{description}</div>
          </div>
          
          <div className="bg-green-50 rounded-lg p-4">
            <div className="text-green-600 font-semibold">En Düşük</div>
            <div className="text-3xl font-bold text-green-800">{minTemp}°C</div>
            <div className="text-sm text-green-600">Bugün</div>
          </div>
          
          <div className="bg-red-50 rounded-lg p-4">
            <div className="text-red-600 font-semibold">En Yüksek</div>
            <div className="text-3xl font-bold text-red-800">{maxTemp}°C</div>
            <div className="text-sm text-red-600">Bugün</div>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-gray-600">
            <strong>Not:</strong> Anlık hava durumu API'si kullanıldığı için 24 saatlik grafik mevcut değildir. 
            Grafik için 5 günlük tahmin API'si gerekir.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeatherChart; 