const api = {
  key: '99ec1addcde85c0fc586c05bb9c1a2c7',
  base: 'https://api.openweathermap.org/data/2.5/',
};

const searchbox = document.getElementById('search');
searchbox.addEventListener('keypress', setQuery);

function setQuery(e) {
  if (e.keyCode == 13) {
    getResults(searchbox.value);
    console.log(searchbox.value);
  }
}

function getResults(query) {
  fetch(`${api.base}weather?q=${query}&units=imperial&appid=${api.key}`)
    .then((weather) => {
      return weather.json();
    })
    .then(displayResults);
}

function displayResults(weather) {
  console.log(weather);
  let city = document.getElementById('city');
  city.innerText = `${weather.name}`;

  let now = new Date();
  let date = document.getElementById('date');
  date.innerText = dateBuilder(now);

  let temp = document.getElementById('temp');
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°F</span>`;

  let feelsLike = document.getElementById('feelslike');
  feelsLike.innerText = `Feels like ${Math.round(weather.main.feels_like)}°F`;

  document.getElementById(
    'icon'
  ).src = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;

  let weather_el = document.getElementById('weather');
  weather_el.innerText = weather.weather[0].main;

  let hiLow = document.getElementById('hi-low');
  hiLow.innerText = `H:${Math.round(weather.main.temp_max)}°F    L:${Math.round(
    weather.main.temp_min
  )}°F`;
}

function dateBuilder(d) {
  let months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  let days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${month} ${date}, ${year}`;
}
