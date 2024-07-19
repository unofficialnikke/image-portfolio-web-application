import express, { Express, Request, Response } from "express"
import { db, connectDatabase } from "./db"
import userroute from './routes/user'
import categoryroute from './routes/category'
import authroute from './routes/auth'
import bodyParser from "body-parser"

const app: Express = express()
const port = 5000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api/user', userroute)
app.use('/api/category', categoryroute)
app.use('/api/auth', authroute)

app.get('/api/test', (req, res) => {
    res.send('Heyy it is working!')
})

app.listen(port, () => {
    connectDatabase()
    console.log(`listening on port ${port}`)
}
)