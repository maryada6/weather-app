import './App.css';
import { Display } from "./displayWeather";
import {useState} from 'react'
import { TiWeatherPartlySunny } from 'react-icons/ti';

function App() {
  const [input,setInput]=useState('');
  const [display,setDisplay]=useState({"coord":{"lon":null,"lat":null},"weather":[{"id":null,"main":"","description":"","icon":""}],"base":"","main":{"temp":null,"feels_like":null,"temp_min":null,"temp_max":null,"pressure":null,"humidity":null},"visibility":null,"wind":{"speed":null,"deg":null},"clouds":{"all":null},"dt":null,"sys":{"type":null,"id":null,"country":"","sunrise":null,"sunset":null},"timezone":null,"id":null,"name":"","cod":null});
  const [loading , setLoading]=useState(false);
  const[errorMsg,setErrorMsg]=useState("");
  const [error,setError]=useState(false);

  function fetchWeather(){
  if(input==='')
  { setErrorMsg("Enter a valid city name👀");
    setError(true);
    return;
  }
  const apiKey="13393b032f8fdee237a93fad4cfb2a54";
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
     {
       setErrorMsg("Enter a valid city name👀");
       setError(true);
     }
     
      setLoading(false);
  })
  .catch(() => {
    setLoading("false");
    setErrorMsg("Not able to connect , please check your connection")
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
<Display loading={loading} input={input} error={error} fetchWeather={fetchWeather} display={display} setInput={setInput}/>
:
(<div>
<h1>{loading && !error ?"Loading...":""}</h1>
</div>)}

 {
   error && <h1>{errorMsg}</h1>
 }
</>
);
}

export default App;
