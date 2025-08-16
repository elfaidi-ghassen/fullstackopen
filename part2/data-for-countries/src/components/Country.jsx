function Country({name, capital, area, languages, flag}) {
    return (
        <>  
            <h2>{name}</h2>
            <p>
            Capital: {capital}
            </p>
            <p>
            Area: {area}
            </p>
            <h3>Languages</h3>
            <ul>
            {languages
                .map(language => 
                    <li key={language}>{language}</li>
                )}
            </ul>
            <img src={flag.png} alt={flag.alt} />
        </>
    )
}

export default Country