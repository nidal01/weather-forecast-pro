import React from 'react';

interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
    pressure: number;
  };
  weather: Array<{
    description: string;
    icon: string;
  }>;
}

interface WeatherCardProps {
  weatherData: WeatherData | null;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weatherData }) => {
  if (!weatherData) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
        <div className="text-center text-gray-500">
          Hava durumu verisi bulunamadı
        </div>
      </div>
    );
  }

  const cityName = weatherData.name || 'Bilinmeyen Şehir';
  const temperature = Math.round(weatherData.main.temp);
  const humidity = weatherData.main.humidity;
  const pressure = weatherData.main.pressure;
  const description = weatherData.weather[0]?.description || '';
  const iconCode = weatherData.weather[0]?.icon || '01d';

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{cityName}</h2>
        
        <div className="flex items-center justify-center mb-4">
          <img 
            src={`https://openweathermap.org/img/wn/${iconCode}@2x.png`}
            alt={description}
            className="w-16 h-16"
          />
          <div className="ml-4">
            <div className="text-4xl font-bold text-gray-800">{temperature}°C</div>
            <div className="text-gray-600 capitalize">{description}</div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-gray-500">Nem</div>
            <div className="font-semibold text-gray-800">{humidity}%</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-gray-500">Basınç</div>
            <div className="font-semibold text-gray-800">{pressure} hPa</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard; 