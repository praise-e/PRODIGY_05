// Date and Time
let date = new Date();
let dateModified = date.toString().split(" ");
let dateOutput = document.getElementById("dateOutput");
dateOutput.innerHTML = dateModified[1] + " " + dateModified[2] + " " + dateModified[3];

let hour = date.getHours();
let minute = date.getMinutes();
let amPM = hour >= 12 ? "pm" : "am";
let timeOutput = document.getElementById("timeOutput");
timeOutput.innerHTML =
  (hour % 12).toString().padStart(2, 0) +
  ":" +
  minute.toString().padStart(2, 0) +
  amPM;

// All Variables
let app = document.querySelector(".container"),
weatherDiv = document.getElementById("weatherDiv"),
temperatureOutput = document.getElementById("temperature"),
locationInput = document.getElementById("location"),
weatherIcon = document.getElementById("weatherIcon"),
weatherDescription = document.getElementById("description"),
searchBox = document.getElementById("searchBox"),
searchBtn = document.getElementById("searchBtn"),
cities = document.querySelectorAll(".city"),
feelsLike = document.getElementById("cloudy"),
humidityOutput = document.getElementById("humidity"),
windSpeedOutput = document.getElementById("wind");

let cityInput = "Benin city";
locationInput.innerHTML = cityInput;
cities.forEach(city => {
    city.addEventListener("click", e => {
        cityInput = e.target.innerHTML;
        locationInput.innerHTML = cityInput;
        fetchWeatherData();

    })
})

searchBtn.addEventListener("click", e => {
    if (searchBox.value.length == 0) {
        alert("Please type in a city name");
    } else {
        cityInput = searchBox.value;

        fetchWeatherData();

    }
    e.preventDefault();
})
function fetchWeatherData() {
    const myAPIKey = "8f11f0fe932d1fbcbdd20231d90e9c4d";
    const myURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${myAPIKey}&units=metric`;
    fetch(myURL).then(response => response.json()).then(data => {
        console.log(data);
        temperatureOutput.innerHTML = data.main.temp + "&#176;";
        locationInput.innerHTML = data.name;
        weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        weatherDescription.innerHTML = data.weather[0].description;
        feelsLike.innerHTML = data.main.feels_like + "&#176;" + "C";
        humidityOutput.innerHTML = data.main.humidity + "%";
        if(data.cod == "404") {
            alert("City not found.");
        }
    }).catch(() => {
        alert("City not found")
    });
}
fetchWeatherData();
