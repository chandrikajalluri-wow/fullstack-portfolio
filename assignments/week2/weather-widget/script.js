const API_KEY = my_api_key;
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherResult = document.getElementById("result");

searchBtn.addEventListener("click", () => {
    const city = cityInput.value;
    if (city) {
        getWeather(city);
    }else {
        weatherResult.innerHTML = "Please enter a city name.";
    }
});

async function getWeather(city) {
    
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    try {
        const response = await fetch(url);
        if(!response.ok) {
            throw new Error("City not found");
        }
        const data = await response.json();
        showWeather(data);
    } catch (error) {
        weatherResult.innerHTML = `<p>${error.message}</p>`;
    }
}

function showWeather(data) {
    const {name, main, weather} = data;
    weatherResult.innerHTML=`
    <h2>${name}</h2>
    <p>Temperature: ${main.temp}\u00B0 C</p>
    <p>Feels like: ${main.feels_like}\u00B0 C</p>
    <p>Humidity: ${main.humidity}%</p>\
    <p>condition: ${weather[0].description}</p>`;
}
