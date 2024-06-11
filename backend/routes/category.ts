import express from 'express';

const router = express.Router();

router.get('/test', (req, res) => {
    res.send('Categories it is!')
})

export default router;