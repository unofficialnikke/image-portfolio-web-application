import express from 'express';
import { addNewImage, getImageById, getImageByUserId, getImages, deleteSelectedImage } from '../controllers/image';
import multer from 'multer';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/', getImages)
router.get('/user/:id', getImageByUserId)
router.get('/:id', getImageById)
router.post('/', upload.single('image'), addNewImage)
router.delete('/:id', deleteSelectedImage)

export default router;