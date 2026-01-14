import axios from "axios"

export async function connectApi(inputSearch) {
    try {
        let connection = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${inputSearch}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=metric`)
        return (connection.data)
    }
    catch (error) {
        if (error.response) {
            if (error.response.status === 404) {
                alert("Cant Find City , Please Enter A Proper City")
            }
            else if (error.response.status === 400) {
                alert("Bad Request")
            }
            else if (error.response.status === 401) {
                alert("Invalid API Key")
            }
        }
        return null
    }
}