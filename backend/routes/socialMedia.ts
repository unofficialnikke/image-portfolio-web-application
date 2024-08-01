import express from 'express';
import { addNewSocialMedia, getSocialMedias, getSocialMediasById, getSocialMediasByUserId, deleteSelectedSocialMedia } from '../controllers/socialMedia';

const router = express.Router();

router.get('/', getSocialMedias)
router.get('/user/:id', getSocialMediasByUserId)
router.get('/:id', getSocialMediasById)
router.post('/', addNewSocialMedia)
router.delete('/:id', deleteSelectedSocialMedia)

export default router;