import express from 'express';
import { getUserCategories, getUserCategoriyByUserId, getUserCategoriyById, addNewUserCategory } from '../controllers/userCategory';

const router = express.Router();

router.get('/all', getUserCategories)
router.get('/user/:id', getUserCategoriyByUserId)
router.get('/:id', getUserCategoriyById)
router.post('/', addNewUserCategory)

export default router;