import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CountryCard from './CountryCard';

const CountryList = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
  
    const fetchCountries = async () => {
        
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        setCountries(response.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching countries:', error);
        setError('Failed to fetch countries. Please try again later.');
      }
    };
  
    fetchCountries();
  }, []);

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search for countries..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="country-grid">
      {filteredCountries.length > 0 ? (
  filteredCountries.map(country => (
    <CountryCard key={country.cca3} country={country} />
  ))
) : (
  <div>No matching countries found</div>
)}

      </div>
    </div>
  );
};

export default CountryList;
