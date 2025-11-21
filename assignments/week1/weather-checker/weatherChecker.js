/* eslint-disable no-undef */
const {API_KEY} = require("./utils")
async function fetchWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    try {
        const res = await fetch(url);

        if (!res.ok) {
            console.log("City not found");
        }

        const data = await res.json();
        console.log(data);
    } catch (err) {
        console.log(err);
    }
    
}
fetchWeather("Delhi");