import { Client, Pool } from 'pg'
import 'dotenv/config'

export const db = new Client({
    user: process.env.API_USER,
    password: process.env.API_PASSWORD,
    host: process.env.API_HOST,
    port: Number(process.env.API_PORT),
    database: process.env.API_DATABASE,
});

export const connectDatabase = async () => {
    try {
        await db.connect()
        console.log('Connected to PostgreSQL database');
    } catch (err) {
        console.error('Error connecting to PostgreSQL database', err);

    }
}