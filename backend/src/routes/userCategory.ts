import express from 'express';
import { getUserCategoryByUserId, addNewUserCategory, deleteSelectedUserCategory, getUserCategories } from '../controllers/userCategory';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

router.get('/', getUserCategories)
router.get('/user/:id', getUserCategoryByUserId)
router.post('/', authenticateToken, addNewUserCategory)
router.delete('/:id', authenticateToken, deleteSelectedUserCategory)

export default router;