const api = {
    key: "39e69962ae6d03fcd32496a060164137",
    base: 'https://api.openweathermap.org/data/2.5/'
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

let am1;
let am2;
let am3;
let am4;
let pm1;
let pm2;
let pm3;
let pm4;
let pm5;


function setQuery(evt) {
    if (evt.keyCode == 13) {
        getResults(searchbox.value);
        getForecastResults(searchbox.value);
    }
}

function getResults(query) {
  fetch(`${api.base}weather?q=${query}&units=imperial&APPID=${api.key}`)
  .then(weather => {
        return weather.json();
    }).then(displayResults);
}

function displayResults (weather) {
    console.log(weather);
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°F</span>`;

    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;
    let hilow = document.querySelector('.hi-low');
    hilow.innerText = `${Math.round(weather.main.temp_min)}°F / ${Math.round(weather.main.temp_max)}°F`;
}

function dateBuilder (d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;

}


function getForecastResults(query) {
    fetch(`${api.base}forecast?q=${query}&units=imperial&APPID=${api.key}`)
    .then(forecast => {
          return forecast.json();
      }).then(displayForecastResults);
  }

  function displayForecastResults(forecast) {
    let wf1 = document.querySelector('.wf1');
    wf1.innerText = forecast.list[3].weather[0].main;
    let hl1 = document.querySelector('.hl1');
    hl1.innerText = `${Math.round(forecast.list[3].main.temp)}°F / ${Math.round(forecast.list[6].main.temp)}°F`;
    //
    let am1 = parseInt(`${Math.round(forecast.list[3].main.temp)}`);
    let pm1 = parseInt(`${Math.round(forecast.list[6].main.temp)}`);

    let wf2 = document.querySelector('.wf2');
    wf2.innerText = forecast.list[11].weather[0].main;
    let hl2 = document.querySelector('.hl2');
    hl2.innerText = `${Math.round(forecast.list[11].main.temp)}°F / ${Math.round(forecast.list[14].main.temp)}°F`;
    //
    let am2 = parseInt(`${Math.round(forecast.list[11].main.temp)}`);
    let pm2 = parseInt(`${Math.round(forecast.list[14].main.temp)}`);

    let wf3 = document.querySelector('.wf3');
    wf3.innerText = forecast.list[19].weather[0].main;
    let hl3 = document.querySelector('.hl3');
    hl3.innerText = `${Math.round(forecast.list[19].main.temp)}°F / ${Math.round(forecast.list[22].main.temp)}°F`;
    //
    let am3 = parseInt(`${Math.round(forecast.list[19].main.temp)}`);
    let pm3 = parseInt(`${Math.round(forecast.list[22].main.temp)}`);


    let wf4 = document.querySelector('.wf4');
    wf4.innerText = forecast.list[27].weather[0].main;
    let hl4 = document.querySelector('.hl4');
    hl4.innerText = `${Math.round(forecast.list[27].main.temp)}°F / ${Math.round(forecast.list[30].main.temp)}°F`;
    //
    let am4 = parseInt(`${Math.round(forecast.list[27].main.temp)}`);
    let pm4 = parseInt(`${Math.round(forecast.list[30].main.temp)}`);


    let wf5 = document.querySelector('.wf5');
    wf5.innerText = forecast.list[35].weather[0].main;
    let hl5 = document.querySelector('.hl5');
    hl5.innerText = `${Math.round(forecast.list[35].main.temp)}°F / ${Math.round(forecast.list[38].main.temp)}°F`;
    //
    let am5 = parseInt(`${Math.round(forecast.list[35].main.temp)}`);
    let pm5 = parseInt(`${Math.round(forecast.list[38].main.temp)}`);

    //
    let total = (am1 + am2 + am3 + am4 + am5 + pm1 + pm2 + pm3 + pm4 + pm5);
    let average = total/10;
    average = Math.round(average);

    let decision = document.querySelector('.camping');
    decision.innerHTML = "Average: " + average + " °F - ";

    if (average > 78) {
        decision.innerHTML += " Too hot for camping!";
    } else if (average < 78 && average > 60) {
        decision.innerHTML += " Ideal camping weather!";
    } else {
        decision.innerHTML += " Too cold for camping!";
    }
    }
  