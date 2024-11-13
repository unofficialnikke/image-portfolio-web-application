import { Response, Request, NextFunction } from 'express'

export const admin = (req: Request, res: Response, next: NextFunction) => {
    if (!req.user?.is_admin) {
        return res.status(403).json(
            'Access denied.'
        )
    }
    next()
}

export const user = (req: Request, res: Response, next: NextFunction) => {
    const userId = parseInt(req.params.id, 10)
    if (req.user?.id !== userId && !req.user?.is_admin) {
        return res.status(403).json(
            'Access denied.'
        )
    }
    next()
}
