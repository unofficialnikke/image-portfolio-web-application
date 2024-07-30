import { Database } from './types';
import { Pool } from 'pg'
import { Kysely, PostgresDialect } from 'kysely'
import 'dotenv/config'

const pool = new Pool({
    user: process.env.API_USER,
    password: process.env.API_PASSWORD,
    host: process.env.API_HOST,
    port: Number(process.env.API_PORT),
    database: process.env.API_DATABASE,
})

export const dialect = new PostgresDialect({
    pool,
})

export const db = new Kysely<Database>({
    dialect,
})

const testConnection = async () => {
    try {
        const result = await pool.query('SELECT version();')
        console.log(`Connected to PostgreSQL database: ${result.rows[0].version}`)
    } catch (err) {
        console.error('Error connecting to PostgreSQL database', err)
        process.exit(1)
    }
}

testConnection()