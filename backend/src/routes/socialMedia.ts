import express from 'express';
import { addNewSocialMedia, getSocialMedias, getSocialMediasById, getSocialMediasByUserId, deleteSelectedSocialMedia, updateSelectedSocialMedia } from '../controllers/socialMedia';
import { admin, user } from '../middleware/roles';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

router.get('/', getSocialMedias)
router.get('/user/:id', getSocialMediasByUserId)
router.get('/:id', getSocialMediasById)
router.patch('/:id', authenticateToken, user, updateSelectedSocialMedia)
router.post('/', authenticateToken, admin, addNewSocialMedia)
router.delete('/:id', authenticateToken, admin, deleteSelectedSocialMedia)

export default router;