// import './App.css';
// import CountrySearch from './CountrySearch';

// function App() {
//   return (
//     <div className="App">

//       <CountrySearch />
//     </div>
//   );
// }

// export default App;
import React, { useState, useEffect } from 'react';

const CountryCard = ({ flag, name }) => {
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
      <img src={flag} alt={`Flag of ${name}`} />
      <p>{name}</p>
    </div>
  );
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="App">
      <input type="text" placeholder="Search for countries" value={searchTerm} onChange={handleChange} />
      <div className="countries" style={{
                      display: "flex",
                      flexWrap: "wrap",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "100vh"
                  }}>
        {filteredCountries.map((country) => (
          <CountryCard key={country.cca3} flag={country.flags.png} name={country.name.common} />
        ))}
      </div>
    </div>
  );
};

export default App;
