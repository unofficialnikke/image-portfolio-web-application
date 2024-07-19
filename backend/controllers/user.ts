import { Request, Response } from "express"
import { db } from "../db"

export const addUser = (req: Request, res: Response) => {
    db.query('SELECT * FROM users;', (err, result) => {
        return res.status(200).json(result.rows)
    })
}