import React, { useState, useEffect, useContext } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import TranslateIcon from '@mui/icons-material/Translate';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import { AppBar, Toolbar, Select, MenuItem, Box, Typography, IconButton, Badge, Drawer, List, ListItem, ListItemText, useMediaQuery } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@mui/styles';
import GoogleLoginButton from './GoogleLoginButton';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex : '9999 !important'
  },
  links: {
    textDecoration: 'none',
    color: 'inherit',
    marginLeft: '20px',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  drawer: {
    width: 250,
    marginTop: '70px',
  },
}));

const NavBar = ({ onLocationChange, onLanguageChange }) => {
  const { t, i18n } = useTranslation();
  const classes = useStyles();
  const [selectedLocation, setSelectedLocation] = useState('Dublin');
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const locations = t('locations', { returnObjects: true });
  const { cart } = useContext(CartContext);
  const cartItemCount = cart.length;

  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  useEffect(() => {
    onLocationChange('Dublin');
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

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const drawerList = () => (
    <Box
      className={classes.drawer}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem component={Link} to="/services">
          <ListItemText primary={t('services')} />
        </ListItem>
        <ListItem component={Link} to="/bookings">
          <ListItemText primary={t('myBookings')} />
        </ListItem>
        <ListItem>
          <Select
            labelId="location-select-label"
            id="location-select"
            value={selectedLocation}
            onChange={handleLocationChange}
            fullWidth
            startAdornment={<LocationOnIcon />}
          >
            {Object.keys(locations).map((key) => (
              <MenuItem key={key} value={key}>
                {locations[key]}
              </MenuItem>
            ))}
          </Select>
        </ListItem>
        <ListItem>
          <Select
            labelId="language-select-label"
            id="language-select"
            value={selectedLanguage}
            onChange={handleLanguageChange}
            fullWidth
            startAdornment={<TranslateIcon />}
          >
            <MenuItem value="en">English</MenuItem>
            <MenuItem value="ga">Irish</MenuItem>
            <MenuItem value="es">Español</MenuItem>
            <MenuItem value="fa">فارسی</MenuItem>
          </Select>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar className={classes.appBar} position="fixed">
        <Toolbar>
          {isSmallScreen && (
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            <Link to={'/'}><Box component="img" src="/genie-full-logo.png" alt="Logo" sx={{ height: 50, marginRight: 2 }} /></Link>
          </Typography>
          {!isSmallScreen && (
            <>
              <Link className={classes.links} to={'/services'}>{t('services')}</Link>
              <Link className={classes.links} to={'/bookings'}>{t('myBookings')}</Link>
              <Select
                labelId="location-select-label"
                id="location-select"
                value={selectedLocation}
                label={t('selectLocation')}
                onChange={handleLocationChange}
                startAdornment={<LocationOnIcon />}
                sx={{ minWidth: 100 }}
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
                startAdornment={<TranslateIcon />}
                sx={{ minWidth: 100 }}
              >
                <MenuItem value="en">English</MenuItem>
                <MenuItem value="ga">Irish</MenuItem>
                <MenuItem value="es">Español</MenuItem>
                <MenuItem value="fa">فارسی</MenuItem>
              </Select>
            </>
          )}
          <GoogleLoginButton/>
          <IconButton
            component={Link}
            to={cartItemCount > 0 ? '/checkout' : '/'}
            color="inherit"
          >
            <Badge badgeContent={cartItemCount} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawerList()}
      </Drawer>
    </>
  );
};

export default NavBar;
