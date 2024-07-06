// src/App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import theme from './theme'; // Assuming you have a theme file already
import './i18n'; // Ensure this file initializes i18next
import { useTranslation } from 'react-i18next';
import BookingForm from './components/BookingForm';
import Checkout from './components/Checkout';
import { CartProvider, CartContext } from './context/CartContext';


function App() {
  const { i18n } = useTranslation();
  const [location, setLocation] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [language, setLanguage] = useState('en');
  const [customizedTheme, setCustomizedTheme] = useState(createTheme({ ...theme, direction: 'ltr' }));

  const handleLocationChange = (newLocation) => {
    setLocation(newLocation);
  };

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
  };

  useEffect(() => {
    const direction = i18n.language === 'fa' ? 'rtl' : 'ltr';
    setCustomizedTheme(createTheme({ ...theme, direction }));
  }, [i18n.language]);

  return (
    <ThemeProvider theme={customizedTheme}>
      <AuthProvider>
      <CartProvider>
        <Router>
          <div className="App">
          <CartContext.Consumer>
          {({ cart }) => (
            <NavBar cartItemCount={cart.length} onLocationChange={handleLocationChange} onLanguageChange={handleLanguageChange} />
          )}
          </CartContext.Consumer>
            <div style={{ marginTop: '70px' }}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/services" element={<Services location={location} />} />
                <Route path="/service/:id" element={<ServiceDetail location={location} />} />
                <Route path="/services/:id/book" element={<BookingForm location={location} />} />
                <Route path="/checkout" element={<Checkout location={location} />} />
              </Routes>
            </div>
          </div>
        </Router>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
