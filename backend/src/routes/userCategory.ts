import express from 'express';
import { getUserCategoryByUserId, addNewUserCategory, deleteSelectedUserCategory, getUserCategories } from '../controllers/userCategory';

const router = express.Router();

router.get('/', getUserCategories)
router.get('/user/:id', getUserCategoryByUserId)
router.post('/', addNewUserCategory)
router.delete('/:id', deleteSelectedUserCategory)

export default router;