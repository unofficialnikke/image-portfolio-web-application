import { Response, Request, NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.accessToken
    if (!token) {
        return res.status(401).json('Access denied. No token provided')
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string)
        req.user = decoded as JwtPayload
    } catch (err) {
        return res.status(401).json('Invalid or expired token')
    }
    next()
}
