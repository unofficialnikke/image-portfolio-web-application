import express from 'express';
import { addNewCategory, getCategories, getCategoryById, getCategoryByUserId, deleteSelectedCategory } from '../controllers/category';


const router = express.Router();

router.get('/', getCategories)
router.get('/user/:id', getCategoryByUserId)
router.get('/:id', getCategoryById)
router.get('/:id', getCategoryById)
router.post('/', addNewCategory)
router.delete('/:id', deleteSelectedCategory)

export default router;