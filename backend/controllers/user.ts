import { Request, Response } from "express"
import { findAllUSers, findUserById } from "../repositories/userRepository"

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await findAllUSers()
        if (users.length === 0) {
            return res.status(404).json('Users not found')
        }
        res.status(200).json(users)
    } catch (err) {
        console.error('Error fetching users:', err)
        return res.status(500).json('An error occurred')
    }

}

export const getUserById = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id, 10)
    try {
        const user = await findUserById(userId)
        if (!user) {
            return res.status(404).json('User not found')
        }
        res.status(200).json(user)
    } catch (err) {
        console.error('Error fetching user by ID:', err)
        return res.status(500).json('An error occurred')
    }
}