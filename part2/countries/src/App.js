import { useState, useEffect } from 'react'
import axios from 'axios'

const Languages = ({language}) =>
{
  console.log(language)
  return(
    <div>
 <li>{language}</li>
    </div>
  )
}
const SingleCountry = ({country})=>{
  console.log(country[0]);
  const selectedCountry = country[0]
  return(
    <div>
     <h2>{selectedCountry.name.common}</h2>
     <p>capital {selectedCountry.capital[0]}</p>
     <p>area {selectedCountry.area}</p>
     <h3>Languages:</h3>
     <ul>
      {Object.entries(selectedCountry.languages).map(([code,language]) => 
       
        <Languages key={code} language={language}/>
              
      )}
     </ul>
    </div>
  )
}

const CountryDisplay = ({filteredCountries}) =>

{console.log(filteredCountries);
  if (filteredCountries.length >10) {
    return (
      <div>
        <p>Too many matches. Please specify another filter</p>
      </div>
    )
  }
  else if (filteredCountries.length <= 10 && filteredCountries.length >1){
    return <Countries countries={filteredCountries}/>
  }
  else if (filteredCountries.length === 1) {
    return <SingleCountry country={filteredCountries}/>
    }
  else{
    return <p></p>
  }
}


const CountryName = ({country}) => {

  return(
  <div>
    <p>{country.name.common}</p>
  </div>
  )
}
const Countries = ({countries}) => {
console.log(countries)
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
    console.log(event.target.value)
    //if there is a string entered, start searching
    if (typeof event.target.value === 'string' && event.target.value.length >0){
const filtered = countries.filter(country =>country.name.common.toLowerCase().includes(event.target.value))
console.log((filtered.length))
setFilteredCountries(filtered)
    }
    else{
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
      find countries
      <form>
        <input
          value={lookingForCountry}
          onChange={handleCountryChange}
        />
        
      </form>
      <CountryDisplay filteredCountries={filteredCountries}/>
    </div>
  )
}

export default App