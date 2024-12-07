import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RootPage from './pages/RootPage';
import UserLogin from './components/UserLogin';
import UserSignup from './components/UserSignUp';
import UserHome from './pages/UserHome';
import { PrivateRoute } from './utils/auth';
import './index.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<RootPage />} /> 
                <Route path="/login" element={<UserLogin />} />
                <Route path="/signup" element={<UserSignup />} />
                <Route path="/users/:userId/home" element={<PrivateRoute>
            <UserHome />
        </PrivateRoute>} />
            </Routes>
        </Router>
    );
}

export default App;
