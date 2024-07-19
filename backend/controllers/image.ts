import { Request, Response } from "express"

export const addImage = (req: Request, res: Response) => {
    res.json('from image')
}