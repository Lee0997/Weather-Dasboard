var APIkey = "619c7fba2dc462d55fa066f68e0813bf";
var city = $("#city-name");
var APIcall =
  "api.openweathermap.org/data/2.5/weather?q={city name},{state code},{country code}&appid={API key}";
var cityFormEl = document.querySelector("#city-form");
var citySearchTerm = document.querySelector("#city-search-term");
var cityContainer = document.querySelector("#city-container");
var weatherContainer = document.querySelector("#weather-container");
var cityNameEl = document.querySelector("#city-name");

var formSubmitHandler = function (event) {
  event.preventDefault();

  var cityName = cityNameEl.value.trim();

  if (cityName) {
    getCityStates(cityName);

    cityContainer.textContent = "";
    city.value = "";
  } else {
    alert("Please enter a city");
  }
};

var getCityStates = function (city) {
  var queryURL =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    APIkey;

  fetch(queryURL)
    .then((response) => response.json())
    .then(function (data) {
      var clouds = data.clouds;
      for (let i = 0; i < clouds.length; i++) {
        var cloudsObject = clouds[i];
        cityContainer.append(`<li> ${cloudsObject.clouds}`);
        console.log(clouds)
      }
      var weather = data.weather; 
      for (let i = 0; i < weather.length; i++) {
        const weatherObject = weather[i];
        cityContainer.append(`<li> ${weatherObject.weather}`);
      console.log(weather)
      }
    });
};

var buttonClickHandler = function (event) {
  var search = event.target.getAttribute("#submit-btn");

  if (search) {
    getCityStates(search);

    weatherContainer.textContent = "";
  }
};

var displayCities = function (cities, searchTerm) {
  if (cities.length === 0) {
    weatherContainer.textContent = "No cities found.";
    return;
  }

  weatherContainer.textContent = searchTerm;

  var name = cities.name.weather;
  console.log(typeof name);

  var cityEl = document.createElement("div");
  console.log(typeof cityEl);
  cityEl.classList = "list-item flex-row justify-space-between align-center";

  var titleEl = document.createElement("span");
  titleEl.textContent = name;

  cityEl.appendChild(titleEl);

  var statusEl = document.createElement("span");
  statusEl.classList = "flex-row align-center";

  if (cities.open_issues_count > 0) {
    statusEl.innerHTML =
      "<i class='fas fa-times status-icon icon-danger'></i>" +
      cities.open_issues_count +
      " issue(s)";
  } else {
    statusEl.innerHTML =
      "<i class='fas fa-check-square status-icon icon-success'></i>";
  }

  cityEl.appendChild(statusEl);

  cityContainer.appendChild(cityEl);
};

cityFormEl.addEventListener("submit", formSubmitHandler);
