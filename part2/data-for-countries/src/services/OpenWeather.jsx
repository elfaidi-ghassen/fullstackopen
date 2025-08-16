import axios from "axios"

const API_KEY = import.meta.env.VITE_OPEN_WEATHER
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather?units=metric"
function get(cityName, CountryCode) {
    return axios.get(`${BASE_URL}&q=${cityName},${CountryCode}&appid=${API_KEY}`)
                .then(response => response.data)
                .then(data => {
                    let icon_code = data.weather[0].icon
                    return {...data, imagePath:`https://openweathermap.org/img/wn/${icon_code}@2x.png`}
                })
}

export default { get }
