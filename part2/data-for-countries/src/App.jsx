import SearchInput from "./components/SearchInput"
import Country from "./components/Country"
import Weather from "./components/Weather"

import { useEffect, useState } from "react"
import CountryService from "./services/Country"
import OpenWeatherService from "./services/OpenWeather"

import "./main.css"
function App() {
  ///> STATE: searchString // Type: string
  // used to control the search input element
  // represents the input string entered by the user to search for countries
  const [searchString, setSearchString] = useState("")

  ///> STATE: countries // Type: Array of strings | null
  // The list of the names of all countries
  const [countries, setCountries] = useState(null)

  ///> STATE: countriesToDisplay // Type: Array of strings | null
  // The list of the names of all countries that should be displayed
  const [countriesToDisplay, setCountriesToDisplay] = useState(null)

  ///> STATE: countryToDisplay // Type: string | null
  // the name of country that the user search for
  const [countryToDisplay, setCountryToDisplay] = useState(null)

  ///> STATE: countryInfo // Type: <object: country's information> | null
  // e.g. { name: { common: "Tunisia", ...}, ...}
  // an object representing information of the country to be displayed
  const [countryInfo, setCountryInfo] = useState(null)

  const [weatherInfo, setWeatherInfo] = useState(null)


  useEffect(()=> {
    if (!countries) return
    let selectedCountries = 
      countries.filter(countryName =>
          countryName.includes(searchString) && searchString !== "")
    if (selectedCountries.length == 0) {
      setCountryInfo(null)
      setWeatherInfo(null)
      setCountryToDisplay(null)
      setCountriesToDisplay([])
    }
    else if (selectedCountries.length == 1) {
      let country = selectedCountries[0] 
      setCountryToDisplay(country)
      setCountriesToDisplay(null)
      CountryService
        .getByName(country)
        .then(data => {
          OpenWeatherService
            .get(data.name.common, data.cca2)
            .then(weatherData => {
              setCountryInfo(data)
              setWeatherInfo(weatherData)
            })
        })
    } else {
      setCountryInfo(null)
      setWeatherInfo(null)
      setCountriesToDisplay(selectedCountries)
      setCountryToDisplay(null)
    }
  }, [searchString, countries])


  useEffect(loadCountries, [])
  return (
    <>
      <div>
       <label htmlFor="search-country">find countries</label>
        <SearchInput 
          onChange={handleSearchChange}
          searchState={searchString}
          id="search-country"
        />
        <div>
          {displayCountries()}
          {displayCountry()}
        </div>
      </div>
    </>
  )

  function displayCountry() {
    if (countryToDisplay && !countryInfo) {
      return "loading country..."
    }
    if (!countryInfo) return;
    if (!weatherInfo) return;
    return (
      <>
        <Country
          name={countryInfo.name.common}
          capital={countryInfo.capital[0]}
          area={countryInfo.area}
          languages={Object.values(countryInfo.languages)}
          flag={countryInfo.flags}
        />
        <Weather 
          city={countryInfo.capital[0]}
          imagePath={weatherInfo.imagePath}
          wind={weatherInfo.wind.speed}
          temperature={weatherInfo.main.temp}
        />
      </>
    )
  }

  // Helper from controller component
  function handleSearchChange(event) {
    let inputCountry = event.target.value
    setSearchString(inputCountry)
  }

  function loadCountries() {
    CountryService
      .getAllNames()
      .then(countries => setCountries(countries))
  }

  function displayCountries() {
    if (countries === null) {
      return <div>loading countries...</div>
    }
    if (!countriesToDisplay) return

    if (countriesToDisplay.length == 0) {
      return <div>no matches found</div>
    }

    if (countriesToDisplay.length <= 10) {
      return countriesToDisplay.map(countryName => {
        return (<div key={countryName}>
                  {countryName}
                   <button 
                      onClick={() => setSearchString(countryName)}
                      value={countryName}>
                    Show
                    </button>
                </div>)
      })
    } else {
      return <div>too many matches, specify another filter</div>
    }
  }


}

export default App
