// src/components/NavBar.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

const NavBar = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <AppBar position="static">
      <Toolbar>
      <Typography variant="h6" style={{ flexGrow: 1 }}>
          {t('appTitle')}
        </Typography>
        <Button color="inherit" onClick={() => changeLanguage('en')}>
          English
        </Button>
        <Button color="inherit" onClick={() => changeLanguage('fa')}>
          فارسی
        </Button>
        <Button color="inherit" onClick={() => changeLanguage('ur')}>
          اردو
        </Button>
        <Button color="inherit" onClick={() => changeLanguage('ar')}>
          Arabic
        </Button>
        <Button color="inherit" onClick={() => changeLanguage('es')}>
          Espanol
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
