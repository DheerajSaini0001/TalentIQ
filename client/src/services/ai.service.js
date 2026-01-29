
import api from './api';

const generateContent = async (prompt, type) => {
    const response = await api.post('/ai/generate', { prompt, type });
    return response.data;
};

export default {
    generateContent
};
