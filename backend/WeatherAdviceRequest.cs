// Weather advice request model
public class WeatherAdviceRequest
{
    public string City { get; set; } = "";
    public double Temperature { get; set; }
    public string WeatherDescription { get; set; } = "";
    public int Humidity { get; set; }
    public double MinTemperature { get; set; }
    public double MaxTemperature { get; set; }
} 