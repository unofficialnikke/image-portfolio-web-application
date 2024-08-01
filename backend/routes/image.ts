import express from 'express';
import { addNewImage, getImageById, getImageByUserId, getImages, deleteSelectedImage } from '../controllers/image';

const router = express.Router();

router.get('/', getImages)
router.get('/user/:id', getImageByUserId)
router.get('/:id', getImageById)
router.post('/', addNewImage)
router.delete('/:id', deleteSelectedImage)

export default router;