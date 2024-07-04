// frontend/src/components/GoogleLoginButton.js
import React, { useEffect, useState } from 'react';
import { getAuth, signInWithPopup, signOut } from 'firebase/auth';
import { auth, provider } from '../firebase';
import { Button } from '@mui/material';

const GoogleLoginButton = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = getAuth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <div>
      {user ? (
        <Button variant="contained" onClick={handleLogout} size="small" color="secondary"> Logout </Button>
      ) : (
        <Button variant="contained" onClick={handleLogin} size="small" color="primary"> Login </Button>
      )}
    </div>
  );
};

export default GoogleLoginButton;
