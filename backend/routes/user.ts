import express from 'express';

const router = express.Router();

router.get('/test', (req, res) => {
    res.send('Users it is!')
})

export default router;