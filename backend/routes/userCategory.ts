import express from 'express';
import { getUserCategories, getUserCategoriyByUserId, getUserCategoriyById, addNewUserCategory, deleteSelectedUserCategory } from '../controllers/userCategory';

const router = express.Router();

router.get('/', getUserCategories)
router.get('/user/:id', getUserCategoriyByUserId)
router.get('/:id', getUserCategoriyById)
router.post('/', addNewUserCategory)
router.delete('/:id', deleteSelectedUserCategory)

export default router;