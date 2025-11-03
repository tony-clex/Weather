const apiUrl = "https://api.openweathermap.org/data/2.5/weather";
const apikey = "7026f3b3e6fb2220b3437fc5aaed9070";

let isCelsius = true;
let currentTempC = 0;

document.addEventListener("DOMContentLoaded", () => {
  fetchWeather("Tokyo"); 
  const cityBtn = document.getElementById("city-input-btn");
  const tempToggle = document.getElementById("temp-toggle");

  cityBtn.addEventListener("click", () => {
    const city = document.getElementById("city-input").value.trim();
    if (city) fetchWeather(city);
    else alert("Please enter a city name");
  });

  tempToggle.addEventListener("click", () => {
    isCelsius = !isCelsius;
    updateTemperature(currentTempC);
  });

  document.getElementById("city-input").addEventListener("keydown", (e) => {
    if (e.key === "Enter") cityBtn.click();
  });
});

async function fetchWeather(cityName) {
  const url = `${apiUrl}?q=${encodeURIComponent(cityName)}&appid=${apikey}&units=metric`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (res.ok) {
      currentTempC = data.main.temp;
      displayWeather(data);
      updateTemperature(currentTempC);
    } else {
      alert(`City not found: ${cityName}`);
    }
  } catch (err) {
    console.error(err);
    alert("Failed to fetch weather data. Please try again.");
  }
}

function displayWeather(data) {
  document.getElementById("city-name").textContent = data.name;
  document.getElementById("date").textContent = formatDate(new Date());
  document.getElementById("description").textContent = data.weather[0].description;
  document.getElementById("wind-speed").textContent = `Wind speed: ${data.wind.speed} m/s`;

  const iconWrapper = document.querySelector(".icon-wrapper");
  const icon = document.getElementById("weather-icon");
  icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  iconWrapper.classList.add("update");
  setTimeout(() => iconWrapper.classList.remove("update"), 300);

  document.getElementById("weather-info").style.display = "block";
}

function updateTemperature(tempC) {
  const tempEl = document.getElementById("temperature");
  tempEl.textContent = isCelsius
    ? `${Math.round(tempC)} °C`
    : `${Math.round(tempC * 9 / 5 + 32)} °F`;
}

function formatDate(date) {
  const options = {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true
  };
  return date.toLocaleString("en-US", options);
}
