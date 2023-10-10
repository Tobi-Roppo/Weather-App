import React, { useState } from 'react'
import './weatherApp.css'

import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import humidity_icon from '../assets/humidity.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'


export const WeatherApp = () => {

    const apiKey = process.env.REACT_APP_API_KEY;
    const apiUrl = process.env.REACT_APP_API_URL;   

    const [wicon,setWicon] = useState(cloud_icon);

    const search = async () => {
        const element = document.getElementsByClassName("cityInput");
        if(element[0].value===""){
            return 0;
        }
        const url = `${apiUrl}?q=${element[0].value}&appid=${apiKey}`;
         
        let response = await fetch(url);
        let data = await response.json();
        const humidity = document.getElementsByClassName("humidity-percent");
        const wind = document.getElementsByClassName("wind-rate");
        const temparature = document.getElementsByClassName("weather-temp");
        const location = document.getElementsByClassName("weather-location");

        humidity[0].innerHTML = data.main.humidity+" %";
        wind[0].innerHTML = data.wind.speed+" km/h";
        temparature[0].innerHTML = data.main.temp+" °C";
        location[0].innerHTML = data.name;

        const body = document.querySelector('body');

        if(data.weather[0].icon==="01d" || data.weather[0].icon==="01n"){
            setWicon(clear_icon);
            body.style.backgroundColor = '#F5FCCD'
        }
        else if(data.weather[0].icon==="02d" || data.weather[0].icon==="02n"){
            setWicon(cloud_icon);
            body.style.backgroundColor = '#78D6C6'
        }
        else if(data.weather[0].icon==="03d" || data.weather[0].icon==="03n"){
            setWicon(drizzle_icon);
            body.style.backgroundColor = '#419197'
        }
        else if(data.weather[0].icon==="04d" || data.weather[0].icon==="04n"){
            setWicon(drizzle_icon);
            body.style.backgroundColor = '#419197'
        }
        else if(data.weather[0].icon==="09d" || data.weather[0].icon==="09n"){
            setWicon(rain_icon);
            body.style.backgroundColor = '#12486B'
        }
        else if(data.weather[0].icon==="10d" || data.weather[0].icon==="10n"){
            setWicon(rain_icon);
            body.style.backgroundColor = '#12486B'
        }
        else if(data.weather[0].icon==="13d" || data.weather[0].icon==="13n"){
            setWicon(snow_icon);
            body.style.backgroundColor = '#ebfffc'
        }
        else{
            setWicon(clear_icon);
            body.style.backgroundColor = '#F5FCCD'
        }
    }

  return (
    <div className='container'>
        <div className='top-bar'>
            <input type="text" className='cityInput' placeholder='Search City' />
            <div className='search-icon' onClick={()=>{search()}}>
                <img src={search_icon} alt="" />
            </div>
        </div>

            <div className='weather-image'>
                <img src={wicon} alt="" />
            </div>
            <div className="weather-temp">24°c</div>
            <div className="weather-location">London</div>
            <div className="data-container">
                <div className="element">
                    <img src={humidity_icon} alt="" className='icon' />
                    <div className="data">
                        <div className="humidity-percent">64%</div>
                        <div className="text">Humidity</div>
                    </div>
                </div>
                <div className="element">
                    <img src={wind_icon} alt="" className='icon' />
                    <div className="data">
                        <div className="wind-rate">18 km/h</div>
                        <div className="text">Wind Speed</div>
                    </div>
                </div>
            </div>
        </div>

  )
}
