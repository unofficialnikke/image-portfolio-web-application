import { Request, Response } from "express"
import { db } from "../db"

export const getUsers = async (req: Request, res: Response) => {
    try {
        const result = await db.query('SELECT * FROM users;')
        if (result.rows.length === 0) {
            return res.status(404).json('Users not found')
        }
        res.status(200).json(result.rows)
    } catch (err) {
        return res.json(err)
    }

}

export const getUserById = async (req: Request, res: Response) => {
    const userId = req.params.id
    try {
        const result = await db.query('SELECT * FROM users WHERE id = $1;', [userId])
        if (result.rows.length === 0) {
            return res.status(404).json('User not found')
        }
        res.status(200).json(result.rows[0])
    } catch (err) {
        return res.json(err)
    }
}