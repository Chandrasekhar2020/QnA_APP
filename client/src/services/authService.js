const API_URL = process.env.REACT_APP_API_URL;

class AuthService {
    async login(email, password) {
        try {
            const response = await fetch(`${API_URL}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Login failed');
            }

            this.setUserData(data);
            return data;
        } catch (error) {
            throw error;
        }
    }

    async googleAuthCallback(token, userId) {
        if (token && userId) {
            this.setUserData({ token, userId });
            return { token, userId };
        }
        return null;
    }

    setUserData(data) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.userId);
        if (data.role) {
            localStorage.setItem('userRole', data.role);
        }
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('userRole');
    }

    getCurrentUser() {
        return {
            token: localStorage.getItem('token'),
            userId: localStorage.getItem('userId'),
            role: localStorage.getItem('userRole')
        };
    }

    isAuthenticated() {
        const token = localStorage.getItem('token');
        return !!token;
    }

    getAuthHeader() {
        const token = localStorage.getItem('token');
        return token ? { 'Authorization': `Bearer ${token}` } : {};
    }
}

export default new AuthService();
