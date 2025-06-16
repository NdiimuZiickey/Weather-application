/*let weather = {
  pretoria: {
    temp: 19.7,
    humidity: 80,
  },
  johannesburg: {
    temp: 17.3,
    humidity: 50,
  },
  midrand: {
    temp: 30.2,
    humidity: 20,
  },
  sandton: {
    temp: 20.9,
    humidity: 100,
  },
  centurion: {
    temp: -5,
    humidity: 20,
  },


// write your code here
let city = prompt("Enter a city").toLowerCase();

if (weather[city]) {
  let tempC = Math.round(weather[city].temp);
  let tempF = Math.round((weather[city].temp * 9) / 5 + 32);
  let humidity = weather[city].humidity;
  // Capitalize the first letter of the city for display
  let cityDisplay = city
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
  alert(
    `It is currently ${tempC}°C (${tempF}°F) in ${cityDisplay} with a humidity of ${humidity}%`
  );
} else {
  alert(
    `Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${city}`
  );
}*/

// FEATURE #1: Live Updating Date & Time
function formatDateTime(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let hours = date.getHours();
  let minutes = date.getMinutes();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function updateTime() {
  let now = new Date();
  let detailsElement = document.querySelector(".details");
  detailsElement.innerHTML = `${formatDateTime(now)}, moderate rain`;
}

// Initial call
updateTime();
// Update every 60 seconds
setInterval(updateTime, 60000);

// FEATURE #2: Display Searched City Name and Real Temperature using SheCodes API
let form = document.querySelector("#search-form");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  let input = document.querySelector("#city-input");
  let city = input.value.trim();

  if (city.length === 0) {
    alert("Please enter a city name.");
    return;
  }

  //have your apiKey here
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios
    .get(apiUrl)
    .then(function (response) {
      let temperature = Math.round(response.data.temperature.current);
      let cityName = response.data.city;

      document.querySelector("h1").innerHTML = cityName;
      document.querySelector(".degrees").innerHTML = temperature;
    })
    .catch(function (error) {
      alert("City not found. Please try another one.");
    });
});
