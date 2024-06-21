import './App.css';

import React, { useState, useEffect } from 'react';

function App() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setCountries(data);
      })
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
      });
  }, []);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{
      display:"flex",
        flexWrap:"wrap",
        alignItems:"center",
        height:"50vh",
        justifyContent:"center",
    }}>
      <input style={{ width:'400px', height:'25px',padding:'10px', borderRadius:'5px'}} type="text" value={searchTerm} onChange={handleChange} placeholder="Search for countries..." />
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', width:'100%' }}>
        {filteredCountries.map(country => (
          <div key={country.cca2} className="countryCard" style={{ margin: '10px', padding: '10px', border: '1px solid #ccc', width: '150px' }}>
            <img src={country.flags.png} alt={country.name.common} width="100%" />
            <p>{country.name.common}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
