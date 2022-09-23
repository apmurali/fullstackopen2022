import { useState, useEffect } from 'react'
import axios from 'axios'
import CountryDisplay from './components/CountryDisplay'

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