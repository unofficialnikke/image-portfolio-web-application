import express from 'express';
import { getUsers, getUserById, deleteSelectedUser, updateSelectedUser } from '../controllers/user';
import { authenticateToken } from '../middleware/auth';
import { admin } from '../middleware/roles';

const router = express.Router();

router.get('/', getUsers)
router.get('/:id', getUserById)
router.patch('/:id', updateSelectedUser)
router.delete('/:id', authenticateToken, admin, deleteSelectedUser)

export default router;