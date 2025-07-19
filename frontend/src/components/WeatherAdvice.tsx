import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface WeatherAdviceProps {
  city: string;
  temperature: number;
  weatherDescription: string;
  humidity: number;
  minTemperature: number;
  maxTemperature: number;
}

interface WeatherAdviceResponse {
  advice: string;
}

const WeatherAdvice: React.FC<WeatherAdviceProps> = ({
  city,
  temperature,
  weatherDescription,
  humidity,
  minTemperature,
  maxTemperature
}) => {
  const [advice, setAdvice] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (city && temperature !== 0) {
      fetchWeatherAdvice();
    }
  }, [city, temperature, weatherDescription, humidity, minTemperature, maxTemperature]);

  const fetchWeatherAdvice = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.post<WeatherAdviceResponse>(`${import.meta.env.VITE_API_URL || 'http://localhost:5012'}/api/weather-advice`, {
        city,
        temperature,
        weatherDescription,
        humidity,
        minTemperature,
        maxTemperature
      });
      
      setAdvice(response.data.advice);
    } catch (error: any) {
      console.error('AI önerisi alınamadı:', error);
      setError('AI önerisi alınırken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
          <span className="text-sm">AI önerileri hazırlanıyor...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center">
        <div className="text-sm opacity-80">{error}</div>
      </div>
    );
  }

  if (!advice) {
    return null;
  }

  return (
    <div className="text-center">
      <div className="prose prose-invert max-w-none">
        {advice.split('\n').map((line, index) => {
          if (line.trim() === '') return null;
          
          // Başlıkları kalın yap
          if (line.includes('**')) {
            const formattedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
            return (
              <div 
                key={index} 
                className="text-base font-semibold mb-2 text-yellow-200"
                dangerouslySetInnerHTML={{ __html: formattedLine }}
              />
            );
          }
          
          // Normal metin
          return (
            <p key={index} className="text-sm mb-2 leading-relaxed">
              {line}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default WeatherAdvice; 