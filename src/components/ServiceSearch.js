import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Autocomplete, TextField, Container } from '@mui/material';
import './styles.css';

const ServiceSearch = () => {
  const { t } = useTranslation();
  const services = t('services', { returnObjects: true });

  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    // Initialize results with all services on load
    setResults(services);
  }, [services]);

  const handleSearch = (event) => {
    const searchQuery = event.target.value.toLowerCase();
    setQuery(searchQuery);

    if (searchQuery.length > 2) {
      const filteredServices = Object.values(services).filter(service =>
        service.title.toLowerCase().includes(searchQuery)
      );
      setResults(filteredServices);
    } else {
      setResults([]);
    }
  };

  return (
    <Container>
      <Autocomplete
        freeSolo
        options={results.map((service) => service.title)}
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
