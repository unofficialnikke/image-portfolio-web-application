import express from 'express';
import { addNewSocialMedia, getSocialMedias, getSocialMediasById, getSocialMediasByUserId, deleteSelectedSocialMedia, updateSelectedSocialMedia } from '../controllers/socialMedia';

const router = express.Router();

router.get('/', getSocialMedias)
router.get('/user/:id', getSocialMediasByUserId)
router.get('/:id', getSocialMediasById)
router.patch('/:id', updateSelectedSocialMedia)
router.post('/', addNewSocialMedia)
router.delete('/:id', deleteSelectedSocialMedia)

export default router;