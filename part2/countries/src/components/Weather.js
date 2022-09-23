
import { useState, useEffect } from 'react'
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY
const open_weather_api = "https://api.openweathermap.org/data/2.5/weather?q="


const Weather = ({capital}) => {

    const [weather, setWeather] = useState(null)
  
    //console.log(`${open_weather_api}${capital}&appid=${api_key}`);
    useEffect(() => {
     axios
        .get(`${open_weather_api}${capital}&appid=${api_key}`)
        .then(res => {
          //console.log("response")
          //console.log('ok!')
          setWeather(res.data)
          console.log(res.data)
        })
    }, )
   console.log(`http://openweathermap.org/img/wn/${weather && weather.weather && (weather.weather[0].icon)}@2x.png`)
    return(
      <div>
        <h3>Weather in {capital} </h3>
        <p>temperature {(weather && weather.main && (weather.main.temp-273).toFixed(2))} Celcius</p>
        
        <img src={`http://openweathermap.org/img/wn/${weather && weather.weather && (weather.weather[0].icon)}@2x.png`} alt="current weather icon" />
        <p> wind {(weather && weather.main && (weather.wind.speed).toFixed(2))} m/s </p>
  
      </div>
    ) // the && are so that no error is thrown when the api takes some time to return the weather data
  }

  export default Weather