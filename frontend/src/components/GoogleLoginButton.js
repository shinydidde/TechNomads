// frontend/src/components/GoogleLoginButton.js
import React, { useEffect, useState } from 'react';
import { getAuth, signInWithPopup, signOut } from 'firebase/auth';
import { auth, provider } from '../firebase';

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
        <div>
          <p>Welcome, {user.displayName}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <button onClick={handleLogin}>Login with Google</button>
      )}
    </div>
  );
};

export default GoogleLoginButton;
