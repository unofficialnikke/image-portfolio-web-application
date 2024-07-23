import { Response, Request } from "express"
import { db } from "../db"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const register = (req: Request, res: Response) => {
    const q = 'SELECT * FROM users WHERE email = $1'

    db.query(q, [req.body.email], (err, result) => {
        if (err) {
            return res.json(err)
        }
        if (result.rows.length)
            return res.status(409).json('User already exists!')

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
            return res.status(200).json('User was succesfully created!')
        })

    })
}

export const login = (req: Request, res: Response) => {
    const q = 'SELECT * FROM users WHERE email = $1'

    db.query(q, [req.body.email], (err, result) => {
        if (err) {
            return res.json(err)
        }
        if (result.rows.length === 0) {
            return res.status(404).json('User not found!')
        }
        const isPasswordCorrect = bcrypt.compareSync(req.body.password, result.rows[0].password)

        if (!isPasswordCorrect) {
            return res.status(400).json('Wrong email or password!')
        }

        const token = jwt.sign({ id: result.rows[0].id }, 'jwtkey')
        const { password, ...other } = result.rows[0]
        console.log(other)
        res.cookie('access_token', token, {
            httpOnly: true
        }).status(200).json(other)
    })
}

export const logout = (req: Request, res: Response) => {

}