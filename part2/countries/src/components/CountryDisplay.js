//Display list of countries as per no of results returned
//import { useState, useEffect } from 'react'
//import axios from 'axios'

import Countries from './Countries'
import SingleCountry from './SingleCountry'


//const api_key = process.env.REACT_APP_API_KEY
//const open_weather_api = "https://api.openweathermap.org/data/2.5/weather?q="



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

  export default CountryDisplay