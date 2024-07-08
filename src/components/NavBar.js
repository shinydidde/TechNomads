import React, { useState, useEffect, useContext } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { AppBar, Toolbar, Select, MenuItem, Box, Typography, IconButton, Badge, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import GoogleLoginButton from './GoogleLoginButton';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const NavBar = ({ onLocationChange, onLanguageChange }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [selectedLocation, setSelectedLocation] = useState('Dublin');
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);
  const locations = t('locations', { returnObjects: true });
  const { cart } = useContext(CartContext);
  const cartItemCount = cart.length;

  useEffect(() => {
    onLocationChange('Dublin');
  }, [onLocationChange]);

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleLocationChange = (event) => {
    const location = event.target.value;
    setSelectedLocation(location);
    onLocationChange(location);
  };

  const handleLanguageChange = (event) => {
    const language = event.target.value;
    setSelectedLanguage(language);
    i18n.changeLanguage(language);
    onLanguageChange(language);
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <Link to={'/'}><Box component="img" src="/genie-full-logo.png" alt="Logo" sx={{ height: 50, marginRight: 2 }} /></Link>
        </Typography>
        <Button color="inherit" onClick={() => handleNavigate('/services')}>
            {t('services')}
          </Button>
          <Button color="inherit" onClick={() => handleNavigate('/bookings')}>
            {t('myBookings')}
          </Button>
        <Select
          labelId="location-select-label"
          id="location-select"
          value={selectedLocation}
          label={t('selectLocation')}
          onChange={handleLocationChange}
        >
          {Object.keys(locations).map((key) => (
            <MenuItem key={key} value={key}>
              {locations[key]}
            </MenuItem>
          ))}
        </Select>
        <Select
          labelId="language-select-label"
          id="language-select"
          value={selectedLanguage}
          label={t('selectLanguage')}
          onChange={handleLanguageChange}
        >
          <MenuItem value="en">English</MenuItem>
          <MenuItem value="ga">Irish</MenuItem>
          <MenuItem value="es">Español</MenuItem>
          <MenuItem value="fa">فارسی</MenuItem>
        </Select>
        <IconButton
          component={Link}
          to={cartItemCount > 0 ? '/checkout' : '/'}
          color="inherit"
        >
          <Badge badgeContent={cartItemCount} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <GoogleLoginButton />
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
