import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Autocomplete, TextField, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import './styles.css';

const ServiceSearch = () => {
  const { t } = useTranslation();
  const navigate = useNavigate(); // Use useNavigate instead of useHistory
  const services = t('servicesList', { returnObjects: true });

  const [results, setResults] = useState([]);

  useEffect(() => {
    // Initialize results with all services on load
    setResults(services);
  }, [services]);

  const handleSearch = (event) => {
    const searchQuery = event.target.value.toLowerCase();

    if (searchQuery.length > 2) {
      const filteredServices = Object.values(services).filter(service =>
        service.title.toLowerCase().includes(searchQuery)
      );
      setResults(filteredServices);
    } else {
      setResults([]);
    }
  };

  const handleSelectService = (title) => {
    const selectedService = services.find(service => t(service.title) === title);
    if (selectedService) {
      navigate(`/service/${selectedService.id}`); // Use navigate to navigate to the selected service
    }
  };

  return (
    <Container>
      <Autocomplete
        freeSolo
        options={results.map((service) => t(service.title))}
        getOptionLabel={(option) => option}
        renderInput={(params) => (
          <TextField
            {...params}
            label={t('searchForServices')}
            variant="outlined"
            onChange={handleSearch}
            className='SearchBar'
          />
        )}
        onChange={(event, value) => {
          if (value) {
            handleSelectService(value);
          }
        }}
      />
    </Container>
  );
};

export default ServiceSearch;
