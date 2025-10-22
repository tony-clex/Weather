const apiUrl = "https://api.openweathermap.org/data/2.5/weather";
const apikey = "7026f3b3e6fb2220b3437fc5aaed9070";

let isCelsius = true; 
let currentTempC = 0; 

document.addEventListener("DOMContentLoaded", () => {
  weatherFn("tokyo");

  const cityBtn = document.getElementById("city-input-btn");
  const tempToggle = document.getElementById("temp-toggle");

  cityBtn.addEventListener("click", () => {
    const cityInput = document.getElementById("city-input").value.trim();
    if (cityInput) {
      weatherFn(cityInput);
    } else {
      alert("Please enter a city name");
    }
  });

  tempToggle.addEventListener("click", () => {
    isCelsius = !isCelsius;
    updateTemperature(currentTempC);
  });
});

async function weatherFn(cName) {
  const url = `${apiUrl}?q=${cName}&appid=${apikey}&units=metric`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (res.ok) {
      currentTempC = data.main.temp; 
      weathershowFn(data);
      updateTemperature(currentTempC); 
    } else {
      alert("City not found, please try again.");
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

function weathershowFn(data) {
  document.getElementById("city-name").textContent = data.name;
  document.getElementById("date").textContent = moment().format("MMM Do YYYY, h:mm:ss a");
  document.getElementById("description").textContent = data.weather[0].description;
  document.getElementById("wind-speed").innerHTML = `Wind speed: ${data.wind.speed} m/s`;
  document.getElementById("weather-icon").src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
  document.getElementById("weather-info").style.display = "block"; 
}

function updateTemperature(tempC) {
  const tempEl = document.getElementById("temperature");
  if (isCelsius) {
    tempEl.textContent = `${Math.round(tempC)} °C`;
  } else {
    tempEl.textContent = `${Math.round(tempC * 9/5 + 32)} °F`;
  }
}
