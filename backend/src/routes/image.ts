import express from 'express';
import { addNewImage, getImageById, getImageByUserId, getImages, deleteSelectedImage, updateSelectedImage } from '../controllers/image';
import multer from 'multer';
import { authenticateToken } from '../middleware/auth';
import { user } from '../middleware/roles';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/', getImages)
router.get('/user/:id', getImageByUserId)
router.get('/:id', getImageById)
router.post('/', upload.single('image'), authenticateToken, addNewImage)
router.patch('/:id', authenticateToken, updateSelectedImage)
router.delete('/:id', authenticateToken, deleteSelectedImage)

export default router;