import { useEffect, useState } from "react";

const CountryCard = ({name, flagimg, flagAltTxt}) => {
    return (
        <div className="countryCard" style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            flexDirection: "column",
            padding: "20px",
            margin: "10px",
            border: "1px solid black",
            borderRadius: "8px",
            width: "200px",
            height: "200px"
        }}>
            <img src={flagimg}
            alt={flagAltTxt}
            style={{width:"100%", height:"100px", }}
            />
            <h2>{name}</h2>
        </div>
    );
}

function Countries() {
    const API_URL = "https://restcountries.com/v3.1/all";
    const [countries, setCountries] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetch(API_URL)
        .then((res) => res.json())
        .then((data) => setCountries(data))
        .catch((error) => console.error("Error fetching data:", error));
    }, []);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredCountries = countries.filter((country) =>
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <nav style={{width:"100%", backgroundColor:"#dddddd"}}>
            <input
                type="text"
                placeholder="Search for a country..."
                value={searchTerm}
                onChange={handleSearch}
                style={{
                    padding: "10px",
                    margin: "10px",
                    width: "50%",
                    fontSize: "16px",
                }}
            />
            </nav>
            <div style={{
                display:"flex",
                flexWrap:"wrap",
                alignItems:"center",
                height:"100vh",
                justifyContent:"center",
            }}>
                {filteredCountries.map((country) => (
                    <CountryCard 
                        key={country.cca3}
                        name={country.name.common} 
                        flagimg={country.flags.png} 
                        flagAltTxt={country.name.alt || country.name.common}
                    />
                ))}
            </div>
        </div>
    );
}

export default Countries;


// import { useEffect, useState } from "react";

// const CountryCard = ({name, flagimg, flagAltTxt}) => {
//     return (
//         <div style={{
//             display: "flex",
//             justifyContent: "center",
//             alignContent: "center",
//             flexDirection: "column",
//             padding: "20px",
//             margin: "10px",
//             border: "1px solid black",
//             borderRadius: "8px",
//             width: "200px",
//             height: "200px"
//         }}>
//             <img src={flagimg}
//             alt={flagAltTxt}
//             style={{width:"100%", height:"100px", }}
//             />
//             <h2>{name}</h2>
//         </div>
//     );
// }

// function Countries() {
//     const API_URL = "https://restcountries.com/v3.1/all";
//     const [countries, setCountries] = useState([]);

//     useEffect(() => {
//         fetch(API_URL)
//         .then((res) => res.json())
//         .then((data) => setCountries(data))
//         .catch((error) => console.error("Error fetching data:", error));
//     }, []);
//     console.log(countries.map((country) => (<CountryCard name={country.name.common} flagimg={country.flags.png} flagAltTxt={country.name.alt}/>)));

//     return (<div style={{
//         display:"flex",
//         flexWrap:"wrap",
//         alignItems:"center",
//         height:"100vh",
//         justifyContent:"center",
//     }}>
//     {countries.map((country) => (<CountryCard name={country.name.common} flagimg={country.flags.png} flagAltTxt={country.name.alt}/>))}
//     </div>
// );

// }

// export default Countries