const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'b77c3af152msh7f0d02729cfc406p1413eajsncd28bdc8d7d8',
        'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
    }
};

const getWeather = (city) => {
    cityname.innerHTML = city
    fetch('https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=' + city, options)
        .then(response => response.json())
        .then((response) => {
            console.log(response)
            cloud_pct.innerHTML = response.cloud_pct
            temp1.innerHTML = response.temp
            // feels_like.innerHTML = response.feels_like
            humidity.innerHTML = response.humidity
            // min_temp.innerHTML = response.min_temp
            // max_temp.innerHTML = response.max_temp
            wind_speed.innerHTML = response.wind_speed
            wind_degrees.innerHTML = response.wind_degrees
            sunrise.innerHTML = window.moment(response.sunrise * 1000).format('HH:mm a')
            sunset.innerHTML = window.moment(response.sunset * 1000).format('HH:mm a')
        })
        .catch(err => console.error(err));
}

submit.addEventListener("click", (e) => {
    e.preventDefault()
    getWeather(city.value)
    getWeather1(city.value)
})

getWeather("Delhi")

// const timeEl = document.getElementById('date_current');

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const API_KEY = '49cc8c821cd2aff9af04c9f98c36eb74';

setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const day = time.getDay();
    const date = time.getDate();
    const hour = time.getHours();
    const hoursIn12HourFormar = hour >= 13 ? hour % 12 : hour;
    const minutes = time.getMinutes();
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const min = minutes < 10 ? '0' + minutes : minutes;

    date_current.innerHTML = `${months[month]} ${date} , ${hoursIn12HourFormar}:${min} ${ampm}`;
    //`${month} ${date} , ${hour}:${minutes} ${ampm}`
    tag.innerHTML = `${months[month]} ${date} , ${days[day]}`
}, 1000)


const options1 = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'b77c3af152msh7f0d02729cfc406p1413eajsncd28bdc8d7d8',
        'X-RapidAPI-Host': 'geocoding-by-api-ninjas.p.rapidapi.com'
    }
};

const getWeather1 = (city) => {
    fetch('https://geocoding-by-api-ninjas.p.rapidapi.com/v1/geocoding?city=' + city, options1)
        .then(response => response.json())
        .then((response) => {
            console.log(response);
            let latitude = response[0].latitude;
            let longitude = response[0].longitude;
            // navigator.geolocation.getCurrentPosition((success) => {

            //     let {latitude, longitude } = success.coords;
            console.log(latitude)
            console.log(longitude);
            // fetch('https://api.openweathermap.org/data/3.0/onecall?lat='+lat+'&lon='+long+'&exclude=minutely&appid='+API_KEY)
            fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {
                console.log(data);
                showWeatherData(data);
                make_graph(data);
            })
        })
        .catch(err => console.error(err));
}

getWeather1("Delhi")

function showWeatherData(data) {

    let otherDayForcast = ''
    data.daily.forEach((day, idx) => {
        if (idx == 0 || idx == 6 || idx == 7) {
            
        } else {
            otherDayForcast +=
                `
            <div class="day">
            <h3>${window.moment(day.dt * 1000).format('ddd')}</h3>
            <img class="sunrise" src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png">
            <span>Day - ${day.temp.day}&#176;C</span>
            <span>Night - ${day.temp.night}&#176;C</span>
            </div>
            `
        }
    })

    weatherForecastEl.innerHTML = otherDayForcast;
}

var time = [];
var temp = [];

function make_graph(data){
    data.hourly.forEach((day,idx) => {
        if(idx>10){}
        else{
            time.push(window.moment(day.dt * 1000).format('HH:mm a'));
            temp.push(day.temp);
            // window.moment(day.dt * 1000).format('HH:mm a'
        }
    })
}

new Chart("myChart", {
    type: "line",
    data: {
      labels: time,
      datasets: [{
        fill: false,
        lineTension: 0,
        backgroundColor: "rgba(0,0,255,1.0)",
        borderColor: "rgba(0,0,255,0.1)",
        // backgroundColor: "rgba(255,255,255,1.0)",
        data: temp
      }]
    },
    options: {
      legend: {display: false},
      scales: {
        yAxes: [{ticks: {min: 10, max:40}}],
      }
    }
  });







