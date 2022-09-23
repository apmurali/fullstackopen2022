//Display details of a single country
import Weather from './Weather'
//List languages of a country
const Language = ({ language }) => {
    //console.log(language)
    return (
      <div>
        <li>{language}</li>
      </div>
    )
  }
  
  
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

  export default SingleCountry