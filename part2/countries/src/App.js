import React, { useState, useEffect } from 'react'
import axios from "axios"

const Search = (props) => {
  return (
  <div>
    Search countries <input 
    type="search"
    value={props.searchCountry}
    onChange={props.onChange}
    />  
  </div>
  )
}

const CountryName = (props) => {
  return (
  <div>
      <li>{props.name}
      <Button onClick={() => 
       props.onClick(props.name)}/>
      </li>
  </div>
  )
}

const Button = (props) => {
  return (
  <button onClick={props.onClick}>...</button>
  )
}

const CountryInfo = (props) => {
  const [weather, setWeather] = useState()

  const hook = () => {
    const api_key = process.env.REACT_APP_API_KEY
    const params = {
      access_key: api_key,
      query: props.capital
    }
    axios
    .get('http://api.weatherstack.com/current', {params})
      .then(response => {
        setWeather(response.data)
      })
  }
  useEffect(hook, [props.capital])

  return (
    <div>
    <h2>{props.name}</h2>
    <img width="200" height="100" src={props.flag} alt="flag" />
    <li>Capital: {props.capital}</li>
    <li>Population: {props.population}</li>
    <h3>Languages</h3>
    {props.languages
      .map(language => <li key={language.name}>{language.name}</li>)}
    <br />
    {weather &&
    <Weather 
    capital={props.capital}
    temperature={weather.current.temperature} 
    wind_speed={weather.current.wind_speed}
    wind_dir={weather.current.wind_dir}
    weather_descriptions={weather.current.weather_descriptions}
    weather_icon={weather.current.weather_icons}/>}    
    </div>
  )
}

const Weather = (props) => {
  return (
    <div>
    <h4>Weather in {props.capital}</h4>
    <img width="100" height="100" src={props.weather_icon} alt="weather_icon" />
    <li>{props.temperature} degrees Celsius</li>
    <li>Wind {props.wind_speed} mph, direction {props.wind_dir}</li>
    <li>{props.weather_descriptions}</li>
    <br />
    <br/>
    <div>Data collected {Date()}</div>
    </div>
    
  
  )  
}

const ShowInfo1 = (props) => {
  return (
  props.filteredCountries.map(country =>
    <CountryInfo 
      key={country.name} 
      name={country.name}
      capital={country.capital}
      population={country.population}
      languages={country.languages}
      flag={country.flag} />,
      )
  )
}

const ShowFilteredList = (props) => {
  return (
    props.filteredCountries.length < 10
      ? props.filteredCountries.map(country =>
        <CountryName 
        key={country.name} 
        name={country.name}
        onClick={props.onClick} />
      )
      : "Please be more specific"
  )
}

const App = (props) => {

  const [countries, setCountries] = useState([]) 
  const [searchCountry, setSearchCountry] = useState('')
  
  const filteredCountries = searchCountry
  ? countries.filter(country => country.name.toLowerCase().includes(searchCountry.toLowerCase()))
  : countries

 const hook = () => {
   axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      setCountries(response.data)
    })
  }
  useEffect(hook, [])

  const onClick = (name) => {
    setSearchCountry(name)   
  }
  const handleSearch = (event) => {
    setSearchCountry(event.target.value)
  }

  return (
    <ul>
      <h2>Search countries</h2>
      <Search 
      onChange={handleSearch}
      searchCountry={searchCountry}/>

      <br />
      {filteredCountries.length === 0
      ? "No matches to show"
      : filteredCountries.length === 1 
        ? <ShowInfo1 
          filteredCountries={filteredCountries}/>
        : <ShowFilteredList 
          filteredCountries={filteredCountries}
          onClick={onClick}/>
          }
    </ul>
  )
}

export default App
