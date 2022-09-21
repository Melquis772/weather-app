
const fetchApi = async (cityName, units) => {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=6c5362dd3657aab7153a9abcbf6d3b70&units=${units}`)
        const data = await response.json()

        console.log(data)
        return data

    } catch (error) {
        console.log(error.message)
    }
}



export default fetchApi;