import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import '../styles/GoogleLoginButton.css';

const GoogleLoginButton = () => {
    const navigate = useNavigate();

    const handleGoogleLogin = () => {
        // Redirect to backend Google auth route
        window.location.href = `${process.env.REACT_APP_API_URL}/api/auth/google`;
    };

    return (
        <button 
            className="google-login-button" 
            onClick={handleGoogleLogin}
        >
            <FcGoogle className="google-icon" />
            <span>Continue with Google</span>
        </button>
    );
};

export default GoogleLoginButton;
