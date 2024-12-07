import { Navigate } from 'react-router-dom';
import authService from '../services/authService';

// Protected Route HOC
export const PrivateRoute = ({ children }) => {
    if (!authService.isAuthenticated()) {
        return <Navigate to="/login" />;
    }
    return children;
};

// Auth Header for API calls
export const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
};

// Token validation
export const isTokenValid = (token) => {
    if (!token) return false;
    
    try {
        // Decode JWT token
        const payload = JSON.parse(atob(token.split('.')[1]));
        // Check if token is expired
        return payload.exp > Date.now() / 1000;
    } catch (error) {
        return false;
    }
};

// Handle authentication errors
export const handleAuthError = (error) => {
    if (error.response?.status === 401) {
        authService.logout();
        window.location.href = '/login';
    }
    return Promise.reject(error);
};

// Parse URL parameters
export const parseAuthParams = (search) => {
    const params = new URLSearchParams(search);
    return {
        token: params.get('token'),
        userId: params.get('userId'),
        error: params.get('error')
    };
};

// Handle Google Auth Callback
export const handleGoogleAuthCallback = async (search) => {
    const { token, userId, error } = parseAuthParams(search);
    
    if (error) {
        throw new Error(error);
    }

    if (token && userId) {
        return await authService.googleAuthCallback(token, userId);
    }

    return null;
};
