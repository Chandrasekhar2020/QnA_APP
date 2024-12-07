import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { FaEnvelope, FaLock, FaExclamationCircle } from 'react-icons/fa';
import GoogleLoginButton from './GoogleLoginButton';
import authService from '../services/authService';
import { handleGoogleAuthCallback } from '../utils/auth';
import '../styles/Auth.css';

const UserLogin = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Handle OAuth callback
        const handleCallback = async () => {
            try {
                const result = await handleGoogleAuthCallback(location.search);
                if (result) {
                    navigate(`/users/${result.userId}/home`);
                }
            } catch (error) {
                setError(error.message);
            }
        };

        if (location.search) {
            handleCallback();
        }
    }, [location, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const data = await authService.login(formData.email, formData.password);
            navigate(`/users/${data.userId}/home`);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <h2>Welcome Back!</h2>
                    <p>Sign in to your account</p>
                </div>

                {error && (
                    <div className="error-message">
                        <FaExclamationCircle />
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <div className="input-icon">
                            <FaEnvelope />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="input-icon">
                            <FaLock />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>

                   

                    <button 
                        type="submit" 
                        className={`auth-button ${isLoading ? 'loading' : ''}`}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Signing in...' : 'Sign In'}
                    </button>

                    <div className="divider">
                        <span>OR</span>
                    </div>

                    <GoogleLoginButton />
                </form>

                <div className="auth-footer">
                    <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
                </div>
            </div>
        </div>
    );
};

export default UserLogin;
