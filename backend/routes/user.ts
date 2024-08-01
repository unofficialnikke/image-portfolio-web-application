import express from 'express';
import { getUsers, getUserById, deleteSelectedUser } from '../controllers/user';

const router = express.Router();

router.get('/', getUsers)
router.get('/:id', getUserById)
router.delete('/:id', deleteSelectedUser)

export default router;