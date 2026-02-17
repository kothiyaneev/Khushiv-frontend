import { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import api from '../utils/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const router = useRouter();

    useEffect(() => {
        // Check if user is logged in (check localStorage)
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = async (email, password) => {
        try {
            setError(null);
            const { data } = await api.post('/users/login', { email, password });
            setUser(data);
            localStorage.setItem('user', JSON.stringify(data));
            router.push('/');
        } catch (err) {
            setError(err.response && err.response.data.message ? err.response.data.message : err.message);
        }
    };

    const signup = async (name, email, password) => {
        try {
            setError(null);
            const { data } = await api.post('/users/signup', { name, email, password });
            setUser(data);
            localStorage.setItem('user', JSON.stringify(data));
            router.push('/');
        } catch (err) {
            setError(err.response && err.response.data.message ? err.response.data.message : err.message);
        }
    };

    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
        router.push('/login');
    };

    return (
        <AuthContext.Provider value={{ user, error, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
