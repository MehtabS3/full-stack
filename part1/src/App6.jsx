import { useState, useEffect } from "react";
import CountryDetails from "./components/CountryDetails";

const App = () => {
  const [query, setQuery] = useState("");
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (query) {
      fetch(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then((response) => response.json())
        .then((data) => {
          const filtered = data.filter((country) =>
            country.name.common.toLowerCase().includes(query.toLowerCase())
          );
          setCountries(filtered);
        })
        .catch((error) => setError(error));
    } else {
      setCountries([]);
    }
  }, [query]);

  const handleSearchChange = (event) => {
    setQuery(event.target.value);
    setSelectedCountry(null); // Clear selected country when the query changes
  };

  const handleShowCountry = (country) => {
    setSelectedCountry(country);
  };

  return (
    <div>
      <h1>Country Information</h1>
      <input
        type="text"
        value={query}
        onChange={handleSearchChange}
        placeholder="Search for a country..."
      />
      {error && <p>Error fetching data: {error.message}</p>}
      {!selectedCountry && countries.length > 10 && (
        <p>Too many matches, specify another filter</p>
      )}
      {!selectedCountry && countries.length > 1 && countries.length <= 10 && (
        <ul>
          {countries.map((country) => (
            <li key={country.cca3}>
              {country.name.common}
              <button onClick={() => handleShowCountry(country)}>Show</button>
            </li>
          ))}
        </ul>
      )}
      {selectedCountry && <CountryDetails country={selectedCountry} />}
    </div>
  );
};

export default App;
