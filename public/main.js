const main = () => {
  // openweathermap.org KEY: bdb29d22e5632a99066f7973fed663ad
  // 20191112140353
  // https://api.openweathermap.org/data/2.5/weather?q=Tampa&appid=bdb29d22e5632a99066f7973fed663ad
  // by zip without country
  // https://samples.openweathermap.org/data/2.5/weather?zip=94040&appid=b6907d289e10d714a6e88b30761fae22
}
// Globalish Variables
let weatherData

// Functions Below
const search = () => {
  console.log('Search Button Clicked')
  fetchWeather()
  displayResults(weatherData)
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
  console.log(response)
  weatherData = await response.json()
  console.log(weatherData)
}

const displayResults = weatherData => {
  console.log(weatherData, 'xxxxx')
  // Delete the contents of the weather section
  document.getElementById('weather-section').innerHTML = ''

  // Create the weather description from the returned data
  const weatherSection = document.createElement('section')
  weatherSection.textContent =
    'It is currently ' +
    weatherData.main.temp +
    ' Degrees Fahrenheit with ' +
    weatherData.weather[0].description +
    's. '

  // Add weather description section to the display weather section.
  document.querySelector('.display-weather-section').appendChild(weatherSection)
}
// Listen Here

document.addEventListener('DOMContentLoaded', main)
document.querySelector('.search-btn').addEventListener('click', search)
