import express, { Express, Request, Response } from "express"
import userroute from './routes/user'
import categoryroute from './routes/category'

const app: Express = express()
const port = 5000

app.use('/api/user', userroute)
app.use('/api/category', categoryroute)

app.get('/api/test', (req, res) => {
    res.send('Heyy it is working!')
})

app.listen(port, () =>
    console.log(`listening on port ${port}`)
)