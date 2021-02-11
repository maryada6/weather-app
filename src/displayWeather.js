import React from 'react';
import {unixToDate,unixToTime,secondsToHms} from './time'
import  {GoLocation} from 'react-icons/go';
import {WiHumidity} from 'react-icons/wi';
import {FiWind} from 'react-icons/fi';
import {BiTachometer} from 'react-icons/bi';
import {GiPaperWindmill} from 'react-icons/gi';
import {IoCloudSharp} from 'react-icons/io5';
import {GiSunrise} from 'react-icons/gi';
import {GiSunset} from 'react-icons/gi';
import {BiCurrentLocation} from 'react-icons/bi';
import {MdDateRange} from 'react-icons/md';
import {GiExtraTime} from 'react-icons/gi';
import {BiWorld} from 'react-icons/bi';

 function Display({input,fetchWeather,display,setInput,error})
{   
    return (<div>
  <div className="container">
  <label style={{display:'block'}}>Enter City Name:</label>
  <input type="text" value={input} onChange={(e)=>setInput(e.target.value)} placeholder="Enter City"/>
  <button  onClick={()=>fetchWeather()} type="submit">Submit</button>
  </div>
  {(!error && display.cod!==null && input!=='')&&
  <div>
    <div className="container">
    <h2 className="city-name"><GoLocation/>{display.name}</h2>  
    <div className="temp-container">
    <h1><img loading='lazy' src= {`http://openweathermap.org/img/wn/${display.weather[0].icon}@2x.png`} alt="Weather day"/> <span style={{display:'inline', textTransform:'capitalize'}}>{display.main.temp}°C</span></h1>
    <h4 className="feels">{display.main.temp_max}°C/{display.main.temp_min}°C feels like {display.main.feels_like}°C</h4>
    <h4 style={{display:'inline', textTransform:'capitalize'}}>{display.weather[0].main}</h4>
    <h6 style={{textTransform:'capitalize' , fontStyle: 'oblique'}}>Description: {display.weather[0].description}</h6>
    </div>
    </div>

    <div className="container">
    <h4>Details:</h4>
    <h5 className="highlight"><WiHumidity style={{backgroundColor:'grey'}}/>Humidity: {display.main.humidity}%</h5>
    <h5 className="highlight"><BiTachometer style={{backgroundColor:'grey'}}/>Pressure: {display.main.pressure} hPa</h5>
    <h5 className="highlight"><FiWind style={{backgroundColor:'grey'}}/>Wind Speed: {display.wind.speed} m/s</h5>
    <h5 className="highlight"><GiPaperWindmill style={{backgroundColor:'grey'}}/>Wind Degree: {display.wind.deg} ° </h5>
    <h5 className="highlight"><IoCloudSharp style={{backgroundColor:'grey'}}/>Clouds: {display.clouds.all}%</h5>
    <h5 className="highlight"><GiSunrise style={{backgroundColor:'grey'}}/>Sunrise: {unixToTime(display.sys.sunrise)} </h5>
    <h5 className="highlight"><GiSunset style={{backgroundColor:'grey'}}/>Sunset: {unixToTime(display.sys.sunset)} </h5>
    </div>
    <div className="container">
    <h4 className="highlight"><BiCurrentLocation style={{backgroundColor:'grey'}}/>Location: {display.name} ,{display.sys.country}.</h4>
    <h4 className="latlon highlight"><BiWorld style={{backgroundColor:'grey'}}/>Longitude: {display.coord.lon} and  Latitude: {display.coord.lat}</h4>
    <h4 className="highlight"><MdDateRange style={{backgroundColor:'grey'}}/>Date: {unixToDate(display.dt)} </h4>
    <h4 className="highlight"><GiExtraTime style={{backgroundColor:'grey'}}/>Timezone: GMT {display.timezone>0?"+":'-'}{secondsToHms(Math.abs(display.timezone))}</h4>
   </div>
      </div> 
  }
</div>);
}

export {Display}