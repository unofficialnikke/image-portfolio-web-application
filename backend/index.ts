import express, { Express, Request, Response } from "express"
import cors from 'cors'
import 'dotenv/config'
import { db, connectDatabase } from "./db"
import userroute from './routes/user'
import categoryroute from './routes/category'
import authroute from './routes/auth'
import bodyParser from "body-parser"
import cookieParser from 'cookie-parser'

const app: Express = express()
const port = 5000

const corsOptions = {
    origin: process.env.API_URL,
    credentials: true,
};

app.use(cors(corsOptions))
app.use(cookieParser())
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