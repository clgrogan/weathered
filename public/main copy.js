const main = () => {
  // openweathermap.org KEY: bdb29d22e5632a99066f7973fed663ad
  // 20191112140353
  // https://api.openweathermap.org/data/2.5/weather?q=Tampa&appid=bdb29d22e5632a99066f7973fed663ad
  // by zip without country
  // https://samples.openweathermap.org/data/2.5/weather?zip=94040&appid=b6907d289e10d714a6e88b30761fae22

  // If there is a URL for a prior search stored, fetch and display. Else if Geolocation is available get the location
  if (typeof localStorage.apiURL !== 'undefined') {
    console.log('LOCAL STORED: ', localStorage.apiURL)
    fetchWeatherLocalStorage(localStorage.apiURL)
  } else if ('geolocation' in navigator) {
    /* geolocation is available */
    console.log('Location Available')
    navigator.geolocation.getCurrentPosition(loadGeolocation)
  }
}
// Globalish Variables
let weatherData

// Functions Below
const search = () => {
  console.log('Search Button Clicked')
  fetchWeather()
  displayResults(weatherData)
}

const loadGeolocation = position => {
  weatherData = ''
  const geoCoord =
    'lat=' + position.coords.latitude + '&lon=' + position.coords.longitude
  console.log('loadGeolocation executed', geoCoord)
  fetchWeatherByGeoCoord(geoCoord)
}
const fetchWeatherByGeoCoord = async geoCoord => {
  // const inputValue = document.querySelector('.search-input').value
  const apiURL =
    'https://api.openweathermap.org/data/2.5/weather?' +
    geoCoord +
    '&units=imperial&appid=bdb29d22e5632a99066f7973fed663ad'
  console.log('Input: ', geoCoord)
  console.log(apiURL)
  const response = await fetch(
    // 'https://api.openweathermap.org/data/2.5/weather?q=33615,us&units=imperial&appid=bdb29d22e5632a99066f7973fed663ad'
    apiURL
  )
  console.log('back from API')
  console.log(response)
  weatherData = await response.json()
  displayResults(weatherData)
  console.log(weatherData)
}

const fetchWeather = async () => {
  const inputValue = document.querySelector('.search-input').value
  const apiURL =
    'https://api.openweathermap.org/data/2.5/weather?q=' +
    inputValue +
    ',us&units=imperial&appid=bdb29d22e5632a99066f7973fed663ad'
  console.log('Input: ', inputValue)
  console.log(apiURL)
  const response = await fetch(
    // 'https://api.openweathermap.org/data/2.5/weather?q=33615,us&units=imperial&appid=bdb29d22e5632a99066f7973fed663ad'
    apiURL
  )
  console.log('back from API')

  // Store URL Locally
  if (typeof Storage !== 'undefined') {
    localStorage.apiURL = apiURL
    console.log('Local Storage Exists', localStorage.apiURL)
  } else {
    // No local web storage support
    console.log('NO LOCAL STORAGE!!!!!!!!!!!!!!')
  }

  console.log(response)
  weatherData = await response.json()
  console.log(weatherData)
  displayResults(weatherData)
}

const fetchWeatherLocalStorage = async apiURL => {
  // const inputValue = document.querySelector('.search-input').value

  console.log(apiURL)
  const response = await fetch(
    // 'https://api.openweathermap.org/data/2.5/weather?q=33615,us&units=imperial&appid=bdb29d22e5632a99066f7973fed663ad'
    apiURL
  )
  console.log('back from API')

  console.log(response)
  weatherData = await response.json()
  console.log(weatherData)
  displayResults(weatherData)
}

const displayResults = weatherData => {
  console.log('weatherData: ', weatherData)
  // Delete the contents of the weather section
  document.getElementById('weather-section').innerHTML = ''

  console.log('weatherData.main.temp ', weatherData.main.temp)
  // Create the weather description from the returned data
  const weatherSection = document.createElement('section')
  weatherSection.textContent =
    'It is currently ' +
    weatherData.main.temp +
    ' Degrees Fahrenheit with ' +
    weatherData.weather[0].description +
    's in ' +
    weatherData.name +
    '.'

  // Add weather description section to the display weather section.
  document.querySelector('.display-weather-section').appendChild(weatherSection)
}
// Listen Here

document.addEventListener('DOMContentLoaded', main)
document.querySelector('.search-btn').addEventListener('click', search)
