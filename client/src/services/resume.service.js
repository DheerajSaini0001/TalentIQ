import api from './api';

const createResume = async (resumeData) => {
    const response = await api.post('/resume', resumeData);
    return response.data;
};

const getResumes = async () => {
    const response = await api.get('/resume');
    return response.data;
};

const getResume = async (id) => {
    const response = await api.get(`/resume/${id}`);
    return response.data;
};

const updateResume = async (id, data) => {
    const response = await api.put(`/resume/${id}`, data);
    return response.data;
};

const deleteResume = async (id) => {
    const response = await api.delete(`/resume/${id}`);
    return response.data;
};

const resumeService = {
    createResume,
    getResumes,
    getResume,
    updateResume,
    deleteResume,
};

export default resumeService;
