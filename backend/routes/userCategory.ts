import express from 'express';
import { getUserCategoryByUserId, getUserCategoryById, addNewUserCategory, deleteSelectedUserCategory, getCategoryNamesByUserId } from '../controllers/userCategory';

const router = express.Router();

router.get('/', getCategoryNamesByUserId)
router.get('/user/:id', getUserCategoryByUserId)
router.get('/:id', getUserCategoryById)
router.post('/', addNewUserCategory)
router.delete('/:id', deleteSelectedUserCategory)

export default router;