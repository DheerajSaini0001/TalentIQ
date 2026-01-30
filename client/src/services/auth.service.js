import api from './api';

const register = async (userData) => {
    const response = await api.post('/auth/register', userData);
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

const login = async (userData) => {
    const response = await api.post('/auth/login', userData);
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

// OTP-based authentication methods
const sendOTP = async (email) => {
    const response = await api.post('/auth/send-otp', { email });
    return response.data;
};

const verifyOTP = async (email, otp) => {
    const response = await api.post('/auth/verify-otp', { email, otp });
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

const registerWithOTP = async (userData) => {
    const response = await api.post('/auth/register-otp', userData);
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

const logout = () => {
    localStorage.removeItem('user');
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};

const authService = {
    register,
    login,
    sendOTP,
    verifyOTP,
    registerWithOTP,
    logout,
    getCurrentUser,
};

export default authService;
