import express from 'express';
import { 
    getSettings, 
    upsertSetting, 
    getAdminTemplates, 
    upsertTemplate, 
    getAdminStats 
} from '../controllers/admin.controller.js';
import { protect, adminOnly } from '../middlewares/auth.middleware.js';

const router = express.Router();

// All admin routes must be protected and restricted to admins
router.use(protect, adminOnly);

// Stats
router.get('/stats', getAdminStats);

// Settings (API Keys)
router.get('/settings', getSettings);
router.post('/settings', upsertSetting);

// Templates
router.get('/templates', getAdminTemplates);
router.post('/templates', upsertTemplate);

export default router;
