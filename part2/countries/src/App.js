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
//Country name in list
const CountryName = ({ country, toggleShow }) => {
  return (
    <div>
      <p>{country.name.common} <button onClick={toggleShow}>show</button></p>
    </div>
  )
}
//List languages of a country
const Language = ({ language }) => {
  //console.log(language)
  return (
    <div>
      <li>{language}</li>
    </div>
  )
}
//Display details of a single country
const SingleCountry = ({ country }) => {
  //console.log(country.capital[0] | null);
 if (typeof country.capital !== "undefined"){
  //console.log(selectedCountry.flags.png)
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>capital {country.capital[0] || null}</p>
      <p>area {country.area}</p>
      <h3>Languages:</h3>
      <ul>
        {Object.entries(country.languages).map(([code, language]) =>

          <Language key={code} language={language} />

        )}
      </ul>
      <img src={country.flags.png} alt={country.name.common} />
      <Weather capital={country.capital[0]} />
    </div>
  )
}
else{
  return(
   
      <div>
        <h2>{country.name.common}</h2>
        <p>capital {}</p>
        <p>area {country.area}</p>
        <h3>Languages:</h3>
        <ul>
          {Object.entries(country.languages).map(([code, language]) =>
  
            <Language key={code} language={language} />
  
          )}
        </ul>
        <img src={country.flags.png} alt={country.name.common} />
        
      </div>
      )
  }

}
//Display list of countries as per no of results returned
const CountryDisplay = ({ filteredCountries }) => {
  //console.log(filteredCountries);
  if (filteredCountries.length > 10) {
    return (
      <div>
        <p>Too many matches. Please specify another filter</p>
      </div>
    )
  }
  else if (filteredCountries.length <= 10 && filteredCountries.length > 1) {
    return <Countries countries={filteredCountries} />
  }
  else if (filteredCountries.length === 1) {
    //console.log(filteredCountries);
    return <SingleCountry country={filteredCountries[0]} />
  }
  else {
    return <p></p>
  }
}


const CountryNames = ({ country }) => {
  const [show, setShow] = useState(false);
  // fucntion to toggle whether the country details are shown or not
  function toggleShow() {
    setShow(!show);
    //console.log(show);
  }

  if (show) {
    return (
      <div>
        <CountryName country={country} toggleShow={toggleShow} />
        <SingleCountry country={country} />
 <hr></hr>
      </div>
    )
  }
  return (
    <div>
      <CountryName country={country} toggleShow={toggleShow} />
      <hr></hr>
    </div>
  )
}
const Countries = ({ countries }) => {
  //console.log(countries)
  //using the cca3 as id because it is unique
  return (
    <div>
      <ul>
        {
          countries.map(country =>
            <CountryNames key={country.cca3} country={country} />
          )}
      </ul>
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [lookingForCountry, setLookingForCountry] = useState('')


  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])


  const handleCountryChange = (event) => {
    //console.log(event.target.value)
    //if there is a string entered, start searching
    if (typeof event.target.value === 'string' && event.target.value.length > 0) {
      const filtered = countries.filter(country => country.name.common.toLowerCase().includes(event.target.value))
      //console.log((filtered.length))
      setFilteredCountries(filtered)
    }
    else {
      //if the search bar is empty or everthing in it is deleted by user
      setFilteredCountries('')
    }
    setLookingForCountry(event.target.value)
  }


  /*
  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)
*/
  return (
    <div>
      
      <form>
      find countries <input 
          value={lookingForCountry}
          onChange={handleCountryChange}
        />

      </form>
      <CountryDisplay filteredCountries={filteredCountries} />
    
    </div>
  )
}

export default App