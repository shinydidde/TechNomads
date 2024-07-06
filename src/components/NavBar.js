import React, { useState, useEffect, useContext } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { AppBar, Toolbar, Select, MenuItem, Box, Typography, IconButton } from '@mui/material';
import { useTranslation } from 'react-i18next';
import GoogleLoginButton from './GoogleLoginButton';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import '../App.css';


const NavBar = ({ onLocationChange, onLanguageChange }) => {
  const { t, i18n } = useTranslation();
  const [selectedLocation, setSelectedLocation] = useState('Dublin');
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);
  const locations = t('locations', { returnObjects: true });
  const { cart } = useContext(CartContext);
  const cartItemCount = cart.length;

  useEffect(() => {
    onLocationChange('Dublin'); // Notify parent component of default location
  }, [onLocationChange]);

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
        <Link to="/checkout">
          <IconButton>
            <ShoppingCartIcon />
            {cartItemCount > 0 && <span className="CartItemCount">{cartItemCount}</span>}
          </IconButton>
        </Link>
        <GoogleLoginButton />
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
