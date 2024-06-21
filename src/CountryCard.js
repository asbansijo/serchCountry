import React from 'react';

const CountryCard = ({ country }) => {
  return (
    <div className="countryCard">
      <img src={country.flags.png} alt={`${country.name.common} flag`} />
      <h2>{country.name.common}</h2>
    </div>
  );
};

export default CountryCard;
