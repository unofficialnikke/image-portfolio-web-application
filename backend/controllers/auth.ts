import { Response, Request } from "express"
import { db } from "../db"
import bcrypt from 'bcryptjs'

export const register = (req: Request, res: Response) => {
    const q = 'SELECT * FROM users WHERE email = $1'

    db.query(q, [req.body.email], (err, result) => {
        if (err) {
            return res.json(err)
        }
        if (result.rows.length)
            return res.status(409).json('User already exists')


        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password, salt)

        const q = 'INSERT INTO users(firstname, lastname, email, password) VALUES($1, $2, $3, $4)'
        const values = [
            req.body.firstname,
            req.body.lastname,
            req.body.email,
            hash,
        ]

        db.query(q, values, (err, result) => {
            if (err) {
                return res.json(err)
            }
            return res.status(200).json('User was succesfully created.')
        })

    })
}

export const login = (req: Request, res: Response) => {

}

export const logout = (req: Request, res: Response) => {

}