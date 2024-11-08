import { Response, Request, NextFunction } from 'express'

export const admin = (req: Request, res: Response, next: NextFunction) => {
    if (!req.user?.is_admin) {
        return res.status(403).send({
            success: false,
            error: 'Access denied.'
        })
    }
    next()
}