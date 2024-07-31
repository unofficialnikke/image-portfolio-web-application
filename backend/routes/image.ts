import express from 'express';
import { addNewImage, getImageById, getImageByUserId, getImages } from '../controllers/image';

const router = express.Router();

router.get('/all', getImages)
router.get('/user/:id', getImageByUserId)
router.get('/:id', getImageById)
router.post('/', addNewImage)


export default router;