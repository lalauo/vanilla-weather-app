//Current Date
let now = new Date(`${response.data.time}` * 1000);

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let dayName = days[now.getDay()];

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
  let month = months[now.getMonth()];

  let dayNumber = now.getDate();

  let year = now.getFullYear();
  return `${dayName} ${month} ${dayNumber}th ${year}`;
}

document.querySelector("#current-date").innerHTML = formatDate(now);

//Current Time
function formatTime(time) {
  function addZero(digit) {
    if (digit < 10) {
      digit = "0" + digit;
    }
    return digit;
  }

  let hours = addZero(now.getHours());

  let minutes = addZero(now.getMinutes());
  return `${hours}:${minutes}`;
}

document.querySelector("#current-time").innerHTML = formatTime(now);

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
