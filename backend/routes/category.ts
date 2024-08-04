import express from 'express';
import { addNewCategory, getCategories, getCategoryById, deleteSelectedCategory } from '../controllers/category';


const router = express.Router();

router.get('/', getCategories)
router.get('/:id', getCategoryById)
router.post('/', addNewCategory)
router.delete('/:id', deleteSelectedCategory)

export default router;