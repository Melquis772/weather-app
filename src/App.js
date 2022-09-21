import { useEffect, useState, useRef } from "react";

import fetchApi from "./fetchApi";
import { weatherImages } from './utils/weatherParameters'
//import InputSuggestions from "./components/InputSuggestions";
//import { cities } from "./utils/cities";



function App() {

  const [cityName, setCityName] = useState('london');
  const [weatherData, setWeatherData] = useState({})
  const [grade, setGrade] = useState('°C')
  const [units, setUnits] = useState('metric')
  const [weatherInfo, setWeatherInfo] = useState('')
  const [loading, setLoading] = useState(false)
  //const [showSuggestions, setShowSuggestions] = useState(true)

  const input = useRef()


  const handleSearch = (e) => {
    e.preventDefault()
    if (e.target[0].value === "") return
    setCityName(e.target[0].value)
    input.current.value = ""


  }

  const handleGradeCelsius = () => {
    setGrade('°C')
    setUnits('metric')
  }

  const handleGradeFarenheit = () => {
    setGrade('°F')
    setUnits('imperial')
  }


  useEffect(() => {
    setLoading(true)
    const getData = async () => {
      const data = await fetchApi(cityName, units)
      setWeatherData(data)
      setWeatherInfo(data.weather[0])

      setLoading(false)


    }
    getData()
  }, [cityName, units])


  /* const setInputValue = (e) => {
     input.current.value = e.target.innerText
     setShowSuggestions(false)
 
   }
 
       const filteredSuggestions = (
      <ul id="list_suggestions">
        {cities.map((city, index) => (
          <li
            key={index}
            onClick={setInputValue}
          >
            {city}
          </li>
        ))}
  
      </ul>
    ) */

  const getTime = (timezone) => {

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']


    const date = new Date()
    const localTime = date.getTime()
    const localOffset = date.getTimezoneOffset() * 60000
    const currentUtcTime = localOffset + localTime
    const cityOffset = currentUtcTime + 1000 * timezone
    const cityTime = new Date(cityOffset).toTimeString().split(' ')
    const day = new Date(cityOffset).getDay();
    const time = cityTime[0].split(':')
    const hourMinutes = time.slice(0, 2).join(':')

    return `${days[day]}, ${hourMinutes}`
  }

  const backgroundImages = (parameter) => {
    if (weatherImages.hasOwnProperty(parameter)) {
      return weatherImages[parameter]
    } else {
      return weatherImages.default
    }
  }



  return (
    <>
      <div className="background" style={{ backgroundImage: `url(${backgroundImages(weatherInfo.main)})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <header className="header">
          <div className="header_container container">
            <form className="search_form" onSubmit={handleSearch}>
              <div className="input_search">
                <input type="text" placeholder="search city..." ref={input} />
                {/* {filteredSuggestions} */}
              </div>

              <button>search</button>
            </form>

            <div className="grades">
              <span onClick={handleGradeCelsius}>°C</span>
              <span onClick={handleGradeFarenheit}>°F</span>
            </div>
          </div>

        </header>
        {weatherData?.cod === '404' ? (
          <div className='preload'>
            <h3>City not found...</h3>
          </div>
        ) : (
          <>
            {loading && (
              <div className='preload'>
                <h3>Loading...</h3>
              </div>
            )}

            <main>
              <div className="data_container container">
                <div className="main_info">
                  <div className="text_wrapper">
                    <h4 className="city_name">{weatherData.name}, {weatherData?.sys?.country}</h4>
                    <h4 className="temp_grade">{weatherData?.main?.temp}{grade}</h4>
                  </div>
                  <div className="icon_wrapper">
                    <img src={`http://openweathermap.org/img/wn/${weatherInfo.icon}@2x.png`} alt="weather icon" className="weather-icon" />
                  </div>
                </div>

                <div className="weather_details">
                  <div className="day_info_wrapper">
                    <h3 className="day_info">{getTime(weatherData.timezone)}</h3>
                    <h3 className="weather_condition">{weatherInfo.description}</h3>
                  </div>

                  <div className="weather_detail_boxes_wrapper">
                    <div className="detail_box">
                      <span className="title">Feels like</span>
                      <span className="data">{weatherData?.main?.feels_like}{grade}</span>
                    </div>
                    <div className="detail_box">
                      <span className="title">Humidity</span>
                      <span className="data">{weatherData?.main?.humidity}%</span>
                    </div>
                    <div className="detail_box">
                      <span className="title">Min</span>
                      <span className="data">{weatherData?.main?.temp_min}{grade}</span>
                    </div>
                    <div className="detail_box">
                      <span className="title">Max</span>
                      <span className="data">{weatherData?.main?.temp_max}{grade}</span>
                    </div>
                    <div className="detail_box lg">
                      <span className="title">Wind</span>
                      <span className="data">{units === 'metric' ? weatherData?.wind?.speed + 'm/s' : weatherData?.wind?.speed + 'mph'}</span>
                    </div>

                  </div>
                </div>
              </div>

            </main>

          </>
        )}

      </div>
    </>
  );
}

export default App;
