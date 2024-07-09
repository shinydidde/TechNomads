import React, { createContext, useState, useEffect, useContext } from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth'; // Import signOut from firebase/auth
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser(user);
                sendUserDetailsToBackend(user); // Send user details to backend upon login
            } else {
                setCurrentUser(null);
            }
        });

        return () => unsubscribe();
    }, []);

    const sendUserDetailsToBackend = async (user) => {
        try {
            await axios.post('https://u13u7uffbc.execute-api.eu-west-1.amazonaws.com/Development/login', {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
            });
        } catch (error) {
            console.error('Error sending user details to backend:', error);
        }
    };

    const loginWithGoogle = async () => {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();

        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.error('Error during Google login:', error);
        }
    };

    const logout = async () => {
        const auth = getAuth();
        await signOut(auth); // Fix signOut usage by importing it from firebase/auth
    };

    return (
        <AuthContext.Provider value={{ currentUser, loginWithGoogle, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Export useAuth along with other context components
export const useAuth = () => {
    return useContext(AuthContext);
};
