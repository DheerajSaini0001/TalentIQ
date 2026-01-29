import express from 'express';
import multer from 'multer';
import { uploadImage } from '../controllers/upload.controller.js';
// We might want to protect this route, assuming user must be logged in to upload
// But since the user removed auth for create resume, we'll keep it open or check requirement.
// The user removed ProtectedRoute wrapper, but app usually depends on req.user for context.
// However, file upload itself doesn't strictly depend on user ID unless we enforce quotas.
// I'll leave it public or minimal middleware for now as per "make all route public" spirit, 
// but standard practice is to use auth middleware if available. 
// Given the context is Resume Builder, let's keep it simple.

const router = express.Router();

// Configure Multer to use memory storage
const storage = multer.memoryStorage();
const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only images are allowed'), false);
        }
    }
});

router.post('/', upload.single('image'), uploadImage);

export default router;
