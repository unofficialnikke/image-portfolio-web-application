import express from 'express';
import { addNewSocialMedia, getSocialMedias, getSocialMediasById, getSocialMediasByUserId } from '../controllers/socialMedia';

const router = express.Router();

router.get('/all', getSocialMedias)
router.get('/user/:id', getSocialMediasByUserId)
router.get('/:id', getSocialMediasById)
router.post('/', addNewSocialMedia)

export default router;