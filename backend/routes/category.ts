import express from 'express';
import { addNewCategory, getCategories, getCategoryById, getCategoryByUserId } from '../controllers/category';


const router = express.Router();

router.get('/all', getCategories)
router.get('/user/:id', getCategoryByUserId)
router.get('/:id', getCategoryById)
router.post('/', addNewCategory)

export default router;