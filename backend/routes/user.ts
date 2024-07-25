import express from 'express';
import { addUser } from '../controllers/user';

const router = express.Router();

router.get('/all', addUser)

export default router;