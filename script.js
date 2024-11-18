document.getElementById('getWeatherBtn').addEventListener('click', getWeather);

async function getWeather() {
    const city = document.getElementById('city').value;
    const apiKey = '318bc62ac89b8f4721240f32fac9ef41'; // Replace with your OpenWeatherMap API key
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const weatherResponse = await fetch(weatherUrl);
        const forecastResponse = await fetch(forecastUrl);
        
        if (!weatherResponse.ok || !forecastResponse.ok) {
            throw new Error('City not found');
        }

        const weatherData = await weatherResponse.json();
        const forecastData = await forecastResponse.json();

        // Display current weather
        document.getElementById('location').textContent = `${weatherData.name}, ${weatherData.sys.country}`;
        document.getElementById('temperature').textContent = `${weatherData.main.temp}°C`;
        document.getElementById('description').textContent = weatherData.weather[0].description;
        document.getElementById('weather-icon').src = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
        document.getElementById('humidity').textContent = weatherData.main.humidity;
        document.getElementById('wind').textContent = weatherData.wind.speed;

        // Display 5-day forecast
        const forecastContainer = document.getElementById('forecast-cards');
        forecastContainer.innerHTML = '';
        for (let i = 0; i < forecastData.list.length; i += 8) {
            const day = forecastData.list[i];
            const forecastCard = document.createElement('div');
            forecastCard.classList.add('forecast-card');
            forecastCard.innerHTML = `
                <h4>${new Date(day.dt_txt).toLocaleDateString()}</h4>
                <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="Weather Icon">
                <p>${day.main.temp}°C</p>
                <small>${day.weather[0].description}</small>
            `;
            forecastContainer.appendChild(forecastCard);
        }
    } catch (error) {
        alert(error.message);
    }
}
