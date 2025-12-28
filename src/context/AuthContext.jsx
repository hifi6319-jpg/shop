import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const savedUser = localStorage.getItem('nutrimix_user');
        const token = localStorage.getItem('nutrimix_token');
        if (savedUser && token) {
            setUser(JSON.parse(savedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('nutrimix_token', data.token);
                localStorage.setItem('nutrimix_user', JSON.stringify(data.user));
                setUser(data.user);
                return { success: true };
            }
            return { success: false, message: data.message };
        } catch (error) {
            console.error('Login Error:', error);
            return { success: false, message: error.message || 'Network Error' };
        }
    };

    const register = async (userDetails) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userDetails)
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('nutrimix_token', data.token);
                localStorage.setItem('nutrimix_user', JSON.stringify(data.user));
                setUser(data.user);
                return { success: true };
            }
            return { success: false, message: data.message };
        } catch (error) {
            console.error('Registration Error:', error);
            return { success: false, message: error.message || 'Network Error' };
        }
    };

    const logout = () => {
        localStorage.removeItem('nutrimix_token');
        localStorage.removeItem('nutrimix_user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
