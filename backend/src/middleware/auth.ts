import { Response, Request, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { User } from '../types/express'

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('x-auth-token')
    if (!token) {
        return res.status(401).send({
            success: false,
            error: 'Access denied. No token provided'
        })
    }
    try {
        const decoded = jwt.verify(token, 'jwtPrivateKey')
        req.user = decoded as User
    } catch (err) {
        return res.status(401).send({
            success: false,
            error: 'Invalid or expired token'
        })
    }
    next()
}