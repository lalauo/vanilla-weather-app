//Current Date & Time
function formatDate(timestamp) {
  let date = new Date(timestamp);

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let dayName = days[date.getDay()];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[date.getMonth()];
  let dayNumber = date.getDate();
  let year = date.getFullYear();
  return `${dayName} ${month} ${dayNumber}th ${year}`;
}

function formatTime(timestamp) {
  let date = new Date(timestamp * 1000);
  let hours = date.getHours();
  if (hours < 10) {
    hours = "0" + hours;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  return `${hours}:${minutes}`;
}

// City Search
function displayCityData(response) {
  document.querySelector(
    "#city"
  ).innerHTML = `${response.data.city}, ${response.data.country}`;

  document.querySelector("#current-date").innerHTML = formatDate(
    response.data.time * 1000
  );

  document.querySelector("#current-time").innerHTML = formatTime(
    response.data.time * 1000
  );

  celsiusTemperature = response.data.temperature.current;

  document.querySelector("#current-temperature").innerHTML =
    Math.round(celsiusTemperature);

  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${response.data.temperature.humidity}%`;

  let windSpeed = Math.round(response.data.wind.speed);
  document.querySelector("#wind").innerHTML = `Wind Speed: ${windSpeed} m/s`;

  document.querySelector("#weather-description").innerHTML =
    response.data.condition.description;

  document
    .querySelector("#weather-icon")
    .setAttribute(
      "src",
      `https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
    );

  document
    .querySelector("#weather-icon")
    .setAttribute("alt", response.data.condition.icon);
}

function searchCity(city) {
  let key = "t7f33fba3c8900c9o18fa862df4036ba";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${key}&units=metric`;

  axios.get(apiUrl).then(displayCityData);
}

function submitInput(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

// Current Location Button
function searchLocation(position) {
  let lon = position.coordinates.longitude;
  let lat = position.coordinates.latitude;
  let key = "t7f33fba3c8900c9o18fa862df4036ba";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${lon}&lat=${lat}&key=${key}&units=metric`;

  axios.get(apiUrl).then(displayCityData);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

// Unit Conversion

function displayFahrenheitTemperature(event) {
  event.preventDefault();

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");

  let fahrenheitTemperature = Math.round((celsiusTemperature * 9) / 5 + 32);
  document.querySelector("#current-temperature").innerHTML =
    fahrenheitTemperature;
}

function displayCelsiusTemperature(event) {
  event.preventDefault();

  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");

  document.querySelector("#current-temperature").innerHTML =
    Math.round(celsiusTemperature);
}

// Forecast

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let days = ["Wed", "Thu", "Fri", "Sat", "Sun", "Mon"];

  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
              <div class="col-2">
                <div class="weekday" id="weekday">${day}</div>
                <img
                  src="https://shecodes-assets.s3.amazonaws.com/api/weather/icons/few-clouds-night.png"
                  alt="few-clouds-night"
                  width="45px"
                />
                <div class="daily-temperature" id="daily-temperature">
                  <span class="daily-high" id="daily-high">34°C</span>
                  <span class="daily-low" id="daily-low">24°C</span>
                </div>
              </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

let celsiusTemperature = "null";

let fahrenheitLink = document.querySelector("#fahrenheit-link");

fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");

celsiusLink.addEventListener("click", displayCelsiusTemperature);

let form = document.querySelector("form#city-search");
form.addEventListener("submit", submitInput);

let button = document.querySelector("#reset-button");
button.addEventListener("click", getCurrentLocation);

searchCity("Lagos");

displayForecast();
