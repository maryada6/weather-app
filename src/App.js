import './App.css';
import {useState} from 'react'
import { TiWeatherPartlySunny } from 'react-icons/ti';
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
function App() {
  const [input,setInput]=useState('');
  const [display,setDisplay]=useState({"coord":{"lon":null,"lat":null},"weather":[{"id":null,"main":"","description":"","icon":""}],"base":"","main":{"temp":null,"feels_like":null,"temp_min":null,"temp_max":null,"pressure":null,"humidity":null},"visibility":null,"wind":{"speed":null,"deg":null},"clouds":{"all":null},"dt":null,"sys":{"type":null,"id":null,"country":"","sunrise":null,"sunset":null},"timezone":null,"id":null,"name":"","cod":null});
  const [loading , setLoading]=useState(false);
  const [error,setError]=useState(false);

  function secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);

    var hDisplay = h > 0 ? h + (h === 1 ? "" : "") : "";
    var mDisplay = m > 0 ? m + (m === 1 ? "" : "") : "";
    return hDisplay +":"+ mDisplay; 
}


function unixToDate(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  return time;
}

function unixToTime(unix)
{
  let unix_timestamp = unix
// Create a new JavaScript Date object based on the timestamp
// multiplied by 1000 so that the argument is in milliseconds, not seconds.
var date = new Date(unix_timestamp * 1000);
// Hours part from the timestamp
var hours = date.getHours();
// Minutes part from the timestamp
var minutes = "0" + date.getMinutes();
// Seconds part from the timestamp
// var seconds = "0" + date.getSeconds();

// Will display time in 10:30:23 format
var formattedTime = hours + ':' + minutes.substr(-2);

return(formattedTime);

}

  function fetchWeather(){
  if(input==='')
  { setError(true);
    return;
  }
  const apiKey="Your_API_KEY";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${apiKey}&units=metric`;
  setLoading(true);
  setError(false);
  fetch(url)
  .then(response => response.json())
  .then(data => {
    // do stuff with the data
     console.log(data);
     if(data.cod!=="404")
     setDisplay(data);
     else
     setError(true);
     setLoading(false);
  })
  .catch(() => {
    console.log("Please search for a valid city 😩");
    setError(true); 
  });
}
  return( 
<>
<header>
  <h1>Weather App <TiWeatherPartlySunny style={{backgroundColor:'grey'}}/></h1>
</header>
{
!loading ?
(<div>
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
    <h1><img src= {`http://openweathermap.org/img/wn/${display.weather[0].icon}@2x.png`} alt="Weather day"/> <span style={{display:'inline', textTransform:'capitalize'}}>{display.main.temp}°C</span></h1>
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
</div>)
:
(<div>
<h1>Loading...</h1>
</div>)}

 {
   error && <h1>"Please search for a valid city 😩"</h1>
 }
</>
);
}

export default App;
