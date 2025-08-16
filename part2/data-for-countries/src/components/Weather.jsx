function Weather({city, imagePath, wind, temperature}) {
    return (
        <div>
            <h2>Weather in {city}</h2>
            <p>Temperature {temperature} Celsius</p>
            <img src={imagePath} alt="" />
            <p>Wind {wind} m/s</p>
        </div>
    )
}

export default Weather