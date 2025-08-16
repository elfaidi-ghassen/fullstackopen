import axios from "axios"

const baseURL = "https://studies.cs.helsinki.fi/restcountries/api"
function getAll() {
    return axios.get(`${baseURL}/all`)
                .then(response => response.data)
}

function getAllNames() {
    return getAll()
        .then(countries => countries.map(toCountryName))
}

function getByName(countryName) {
    return axios.get(`${baseURL}/name/${countryName}`)
      .then(response => {
        return response.data})
}

/// Helper Functions
function toCountryName(country) {
    return country.name.common
}


export default { getAll, getAllNames, getByName }