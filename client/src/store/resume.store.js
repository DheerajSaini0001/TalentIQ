import { create } from 'zustand';
import resumeService from '../services/resume.service';

const useResumeStore = create((set) => ({
    resumes: [],
    currentResume: null,
    isLoading: false,
    isError: false,
    message: '',

    createResume: async (title) => {
        set({ isLoading: true, isError: false });
        try {
            const data = await resumeService.createResume(title);
            set((state) => ({
                resumes: [data, ...state.resumes],
                isLoading: false,
                currentResume: data
            }));
            return data;
        } catch (error) {
            const message = error.response?.data?.message || error.message;
            set({ isError: true, message, isLoading: false });
        }
    },

    getResumes: async () => {
        set({ isLoading: true, isError: false });
        try {
            const data = await resumeService.getResumes();
            set({ resumes: data, isLoading: false });
        } catch (error) {
            const message = error.response?.data?.message || error.message;
            set({ isError: true, message, isLoading: false });
        }
    },

    getResume: async (id) => {
        set({ isLoading: true, isError: false });
        try {
            const data = await resumeService.getResume(id);
            set({ currentResume: data, isLoading: false });
        } catch (error) {
            const message = error.response?.data?.message || error.message;
            set({ isError: true, message, isLoading: false });
        }
    },

    updateResume: async (id, resumeData) => {
        // Optimistic update could go here, but strictly following API for now
        set({ isLoading: true, isError: false });
        try {
            const data = await resumeService.updateResume(id, resumeData);
            set({ currentResume: data, isLoading: false });
        } catch (error) {
            const message = error.response?.data?.message || error.message;
            set({ isError: true, message, isLoading: false });
        }
    },

    // Helper to clear errors
    reset: () => set({ isError: false, message: '', isLoading: false })
}));

export default useResumeStore;
