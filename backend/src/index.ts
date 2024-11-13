import express, { Express } from "express"
import cors from 'cors'
import 'dotenv/config'
import userroute from './routes/user'
import categoryroute from './routes/category'
import userCategoryroute from './routes/userCategory'
import authroute from './routes/auth'
import imageroute from './routes/image'
import socialmedia from './routes/socialMedia'
import bodyParser from "body-parser"
import cookieParser from 'cookie-parser'

const app: Express = express()
const port = 5000

const corsOptions = {
    origin: ['https://main.d3lbpwh76dvehb.amplifyapp.com/', 'http://localhost:5173'],
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};

app.use(cors(corsOptions))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api/auth', authroute)
app.use('/api/users', userroute)
app.use('/api/categories', categoryroute)
app.use('/api/user-categories', userCategoryroute)
app.use('/api/images', imageroute)
app.use('/api/social-medias', socialmedia)

app.listen(port, () => {
    console.log(`listening on port ${port}`)
}
)