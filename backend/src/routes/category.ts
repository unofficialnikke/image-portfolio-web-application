import express from 'express';
import { addNewCategory, getCategories, getCategoryById, deleteSelectedCategory } from '../controllers/category';
import { authenticateToken } from '../middleware/auth';
import { admin } from '../middleware/roles';

const router = express.Router();

router.get('/', getCategories)
router.get('/:id', getCategoryById)
router.post('/', authenticateToken, admin, addNewCategory)
router.delete('/:id', authenticateToken, admin, deleteSelectedCategory)

export default router;