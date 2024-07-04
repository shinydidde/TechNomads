// frontend/src/components/ServiceSearch.js
import React, { useState } from 'react';
import axios from 'axios';
import { Autocomplete, TextField, Container } from '@mui/material';
import '../components/styles.css';

const ServiceSearch = () => {
  // eslint-disable-next-line no-unused-vars
  const [query,setQuery] = useState('');
  const [results, setResults] = useState(["Professional cleaning","Salon","Washing machine repair","Geyser repair","Carpenters","Plumbers","RO repair","Full home cleaning","Electricians","Refrigerator repair"]);

  const handleSearch = async (event) => {
    setQuery(event.target.value);
    if (event.target.value.length > 2) {  // Start searching when query length > 2
      try {
        const response = await axios.get('https://u13u7uffbc.execute-api.eu-west-1.amazonaws.com/Development/services', {
          params: { query: event.target.value }
        });
        setResults(response.data);
      } catch (error) {
        console.error('Error searching services:', error, query);
      }
      setResults([])
    } else {
      setResults([]);
    }
  };
  console.log(results)

  return (
    <Container>
      {/* <Typography variant="h4">Search Services</Typography> */}
      <Autocomplete
        freeSolo
        options={results.map((service) => service)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search for Services"
            variant="outlined"
            onChange={handleSearch}
            className='SearchBar'
          />
        )}
      />
    </Container>
  );
};

export default ServiceSearch;
