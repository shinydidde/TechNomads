// frontend/src/components/ServiceSearch.js
import React, { useState } from 'react';
import axios from 'axios';
import { Autocomplete, TextField, Container } from '@mui/material';
import '../components/styles.css';

const ServiceSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (event) => {
    setQuery(event.target.value);
    if (event.target.value.length > 2) {  // Start searching when query length > 2
      try {
        const response = await axios.get('/api/services/search', {
          params: { query: event.target.value }
        });
        setResults(response.data);
      } catch (error) {
        console.error('Error searching services:', error, query);
      }
    } else {
      setResults([]);
    }
  };

  return (
    <Container>
      {/* <Typography variant="h4">Search Services</Typography> */}
      <Autocomplete
        freeSolo
        options={results.map((service) => service.name)}
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
