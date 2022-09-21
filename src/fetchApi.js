
const fetchApi = async (cityName, units) => {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${process.env.REACT_APP_API_KEY}&units=${units}`)
        const data = await response.json()

        return data

    } catch (error) {
        console.log(error.message)
    }
}


export default fetchApi;