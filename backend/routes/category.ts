import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Categories it is!')
})

export default router;