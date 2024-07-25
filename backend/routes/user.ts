import express from 'express';
import { getUsers, getUserById } from '../controllers/user';

const router = express.Router();

router.get('/all', getUsers)
router.get('/:id', getUserById)

export default router;