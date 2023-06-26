//Current Date
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
  console.log(response);
  document.querySelector(
    "#city"
  ).innerHTML = `${response.data.city}, ${response.data.country}`;

  document.querySelector("#current-temperature").innerHTML = Math.round(
    response.data.temperature.current
  );

  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${response.data.temperature.humidity}%`;

  let windSpeed = Math.round(response.data.wind.speed);
  document.querySelector("#wind").innerHTML = `Wind Speed: ${windSpeed} m/s`;

  document.querySelector("#weather-description").innerHTML =
    response.data.condition.description;

  document.querySelector("#current-date").innerHTML = formatDate(
    response.data.time * 1000
  );

  document.querySelector("#current-time").innerHTML = formatTime(
    response.data.time * 1000
  );

  document
    .querySelector("#symbol")
    .setAttribute(
      "src",
      `https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
    );

  document
    .querySelector("#symbol")
    .setAttribute("alt", response.data.condition.icon);
}

function searchCity(city) {
  let key = "t7f33fba3c8900c9o18fa862df4036ba";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${key}&units=metric`;
  console.log(apiUrl);

  axios.get(apiUrl).then(displayCityData);
}

function submitInput(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

let form = document.querySelector("form#city-search");
form.addEventListener("submit", submitInput);

// Current Location Button
function searchLocation(position) {
  let key = "t7f33fba3c8900c9o18fa862df4036ba";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${position.coordinates.longitude}&lat=${position.coordinates.latitude}&key=${key}&units=metric`;

  axios.get(apiUrl).then(displayCityData);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let button = document.querySelector("#reset-button");
button.addEventListener("click", getCurrentLocation);

searchCity("Lagos");
