import express from 'express';
import {
    createResume,
    getResumes,
    getResumeById,
    updateResume,
    deleteResume,
} from '../controllers/resume.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.use(protect); // All routes protected

router.route('/')
    .post(createResume)
    .get(getResumes);

router.route('/:id')
    .get(getResumeById)
    .put(updateResume)
    .delete(deleteResume);

export default router;
