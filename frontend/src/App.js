// src/App.js
import React, { useEffect, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import theme from './theme'; // Assuming you have a theme file already
import './i18n'; // Ensure this file initializes i18next
import { useTranslation } from 'react-i18next';
import GoogleLoginButton from './components/GoogleLoginButton';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  const { i18n } = useTranslation();
  const [customizedTheme, setCustomizedTheme] = useState(createTheme({ ...theme, direction: 'ltr' }));

  useEffect(() => {
    const direction = i18n.language === 'fa' || i18n.language === 'ur' || i18n.language === 'ar' ? 'rtl' : 'ltr';
    setCustomizedTheme(createTheme({ ...theme, direction }));
  }, [i18n.language]);

  return (
    <ThemeProvider theme={customizedTheme}>
      <AuthProvider>
        <div className="App">
          <GoogleLoginButton />
          <NavBar />
          <HomePage />
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
