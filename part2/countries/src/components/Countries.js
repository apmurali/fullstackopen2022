import { useState } from 'react'


import SingleCountry from './SingleCountry'

//Country name in list
const CountryName = ({ country, toggleShow }) => {
  return (
    <div>
      <p>{country.name.common} <button onClick={toggleShow}>show</button></p>
    </div>
  )
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

export default  Countries