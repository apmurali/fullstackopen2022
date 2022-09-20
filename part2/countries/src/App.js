import { useState, useEffect } from 'react'
import axios from 'axios'

const CountryName = ({country}) => {

  return(
  <div>
    <p>{country.name.common}</p>
  </div>
  )
}
const Countries = ({countries}) => {

  //using the cca3 as id because it is unique
  return (
    <div>
      <ul>
        {
          countries.map(country =>
            <CountryName key={country.cca3} country={country} />
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
    if (typeof event.target.value === 'string'){
const filtered = countries.filter(country =>country.name.common.toLowerCase().includes(event.target.value))
console.log((filtered.length))
setFilteredCountries(filtered)
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
        <input
          value={lookingForCountry}
          onChange={handleCountryChange}
        />
        
      </form>
      <Countries countries={filteredCountries}/>
    </div>
  )
}

export default App