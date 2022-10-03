const input = document.getElementById('location');
const submit = document.getElementById('submit');
const weatherInfo = document.getElementById('weatherInfo');


async function getWeather (city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8b3f6eb46972851ada044b9545ed5fef`, {mode: 'cors'});
        const weatherData = await response.json();
        const weatherCity = weatherData.name;
        const weatherTemp = Math.round((weatherData.main.temp) - 273.15) + '°C';
        const weatherHumidity = weatherData.main.humidity + '%';
        populateWeather(weatherCity, weatherTemp, weatherHumidity);
    }
    catch (error) {
        console.log('there was an error', error);
    }
}

function searchWeather(e) {
    let city = input.value;
    if (!city) {
        return alert('Please enter a location');
    }
    e.preventDefault();
    clearInfos();
    getWeather(city);
}

function populateWeather(weatherCity, weatherTemp, weatherHumidity) {
    const cityName = document.createElement('h2');
    const cityTemp = document.createElement('h3');
    const cityHumidity = document.createElement('h3');

    cityName.textContent = weatherCity;
    cityTemp.textContent = weatherTemp;
    cityHumidity.textContent = weatherHumidity;

    weatherInfo.appendChild(cityName);
    weatherInfo.appendChild(cityTemp);
    weatherInfo.appendChild(cityHumidity);
}

function clearInfos() {
    weatherInfo.innerHTML = '<h1>Weather</h1>';
}


submit.addEventListener('click', searchWeather);


input.addEventListener("keydown", (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      submit.click();
    }
  });
