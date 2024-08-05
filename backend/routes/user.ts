import express from 'express';
import { getUsers, getUserById, deleteSelectedUser, updateSelectedUser } from '../controllers/user';

const router = express.Router();

router.get('/', getUsers)
router.get('/:id', getUserById)
router.patch('/:id', updateSelectedUser)
router.delete('/:id', deleteSelectedUser)

export default router;