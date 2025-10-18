const apiUrl = "https://api.openweathermap.org/data/2.5/weather";
const apikey = "7026f3b3e6fb2220b3437fc5aaed9070";

$(document).ready(function () {
  weatherFn("tokyo");

  $("#city-input-btn").on("click", function () {
    const city = $("#city-input").val().trim();
    if (city) {
      weatherFn(city);
    } else {
      alert("Please enter a city name");
    }
  });
});

async function weatherFn(cName) {
  const url = `${apiUrl}?q=${cName}&appid=${apikey}&units=metric`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (res.ok) {
      weathershowFn(data);
    } else {
      alert("City not found, please try again.");
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

function weathershowFn(data) {
  $("#city-name").text(data.name);
  $("#date").text(moment().format("MMM Do YYYY, h:mm:ss a"));
  $("#temperature").html(`${data.main.temp}°C`);
  $("#description").text(data.weather[0].description);
  $("#wind-speed").html(`Wind speed: ${data.wind.speed} m/s`);
  $("#weather-icon").attr(
    "src",
    `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
  );
  $("#weather-info").fadeIn();
}
