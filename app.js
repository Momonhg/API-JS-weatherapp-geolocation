//set up time and date
let today = new Date();
let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
let dateTime = date+' '+time;

//set up let on HTML
const timeAndDate = document.querySelector(".time-and-date");



//set up const to tap in each element inside HTML -- later will move to REACT object as useState with different value
const statusElement = document.querySelector(".status");
const iconElement = document.querySelector(".image-icon");
const temperatureElement = document.querySelector(".temperature p");
const descriptionElement = document.querySelector(".description p");
const locationElement = document.querySelector(".location p");

//set weather as an empty object with the specific unit which we need to update after onClick event
//-- note React will change as an useState with initial value as above

const weather = {}

weather.temperature = {
unit:"celcius"

}

const Kelvin =273;
//-- note React will change as a component

const keyAPI ="a78e3b4f6e2bd06b352e3c5d921447b4";

//set up geolocation

if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, showErr);

}else {
statusElement.style.display="block";
statusElement.innerHTML ="<p>doesn't support</p>"

};

//setPosition from geolocation
function setPosition(position){
let latitude = position.coords.latitude;
let longitude = position.coords.longitude;
// let longitude = "-79.383186";

getWeather(latitude,longitude);

}

//show err
function showErr(error){
statusElement.style.display="block";
statusElement.innerHTML =`<p>${error.message}</p>`

}

//get weather from API

function getWeather(latitude,longitude){
let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${keyAPI}`
console.log(url);

fetch(url)
.then(function(response){ //fetch data from the values from api call
    //open JSON to grab and how to target all the data needed as bellow
    let data = response.json();
    return data;
})
.then(function(data){ //change the element and set the of the weather data received
    //weather is an object has dif objects inside it forexemple: temperature, description, etc.
weather.temperature.value = Math.floor(data.main.temp - Kelvin);
weather.description = data.weather[0].description;
weather.iconID = data.weather[0].icon;
weather.city = data.name;
weather.country = data.sys.country;

}) 
.then(function(){
    displayWeather();
})

};

// display the weather to UI -> change the innerHTML of the props set up earlier
function displayWeather() {
    iconElement.innerHTML =`<img src="./images/${weather.iconID}.png" alt="${weather.description}"/>`;
    temperatureElement.innerHTML = `${weather.temperature.value}° <span>C</span>`;
    descriptionElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
    timeAndDate.innerHTML = dateTime;

}

//convert from celcius to farenheit

function celciusToFarenheit(temperature){
    return (temperature*9/5) +32;
}

//add click event listener
temperatureElement.addEventListener("click", function(){
if (weather.temperature.value === undefined) return;

if (weather.temperature.unit == "celcius") {
    let farenheit =celciusToFarenheit(weather.temperature.value);
    farenheit =Math.floor(farenheit);
temperatureElement.innerHTML =`${farenheit}°<span>F</span>`;
weather.temperature.unit = "farenheit";
}else{
    temperatureElement.innerHTML=`${weather.temperature.value}° <span>C</span>`;
    weather.temperature.unit="celcius"
}



})