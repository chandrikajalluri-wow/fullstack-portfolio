OpenWeatherMap provides a suite of APIs that deliver real-time weather data, forecasts, and historical information for any location worldwide. The data is accessible in various formats, including JSON, XML, and HTML.

 Key API Endpoints
1. Current Weather Data

Retrieve real-time weather information for a specific location.

Endpoint: /weather

Parameters: q (city name), appid (API key)

Example Request:

https://api.openweathermap.org/data/2.5/weather?q=London&appid=your_api_key


Response Example:

{
  "coord": {"lon": -0.13, "lat": 51.51},
  "weather": [{"id": 801, "main": "Clouds", "description": "few clouds", "icon": "02d"}],
  "main": {"temp": 280.32, "pressure": 1012, "humidity": 81},
  "wind": {"speed": 4.1, "deg": 80},
  "clouds": {"all": 20},
  "dt": 1485789600,
  "sys": {"type": 1, "id": 5091, "message": 0.0103, "country": "GB", "sunrise": 1485762037, "sunset": 1485794875},
  "id": 2643743,
  "name": "London",
  "cod": 200
}

2. Forecast Data

Obtain weather forecasts for a specified number of days.

Endpoint: /forecast

Parameters: q (city name), appid (API key)

Example Request:

https://api.openweathermap.org/data/2.5/forecast?q=London&appid=your_api_key

3. One Call API 3.0

Access comprehensive weather data, including current conditions, minute-by-minute forecasts, hourly and daily forecasts, and historical data.

Endpoint: /onecall

Parameters: lat, lon (latitude and longitude), appid (API key)

Example Request:

https://api.openweathermap.org/data/2.5/onecall?lat=51.51&lon=-0.13&appid=your_api_key

4. Geocoding API

Convert city names or postal codes into geographic coordinates.

Endpoint: /geo/1.0/direct

Parameters: q (city name), appid (API key)

Example Request:

https://api.openweathermap.org/data/2.5/geo/1.0/direct?q=London&appid=your_api_key

5. Historical Weather Data

Retrieve historical weather data for specific dates.

Endpoint: /timemachine

Parameters: lat, lon (latitude and longitude), dt (timestamp), appid (API key)

Example Request:

https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=51.51&lon=-0.13&dt=1609459200&appid=your_api_key

## Authentication

1. To use the OpenWeatherMap API, you need to sign up and obtain an API key:

2. Visit the OpenWeatherMap website

3. Create an account or log in.

4. Navigate to the "API keys" section.

5. Generate a new API key.

6. Include this key in your API requests as the appid parameter.

## Units of Measurement

OpenWeatherMap supports various units for temperature, pressure, and wind speed:

Temperature: Kelvin (default), Celsius (metric), Fahrenheit (imperial)

Pressure: hPa

Wind Speed: meter/sec (default), miles/hour (imperial), meter/sec (metric)

Specify the desired units using the units parameter in your API requests.

## Rate Limiting

OpenWeatherMap imposes rate limits on API usage:

Free Tier: Up to 60 calls per minute

Paid Plans: Higher limits based on the subscription

Exceeding these limits may result in temporary access restrictions.