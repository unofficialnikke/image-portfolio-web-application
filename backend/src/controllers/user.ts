import { Request, Response } from "express"
import { deleteUser, findAllUSers, findUserById, updateUser } from "../repositories/userRepository"
import { UserUpdate } from "../types"

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
    const id = parseInt(req.params.id, 10)
    if (isNaN(id)) {
        return res.status(400).json('Invalid category ID');
    }
    try {
        const user = await findUserById(id)
        if (!user) {
            return res.status(404).json('User not found')
        }
        res.status(200).json(user)
    } catch (err) {
        console.error('Error fetching user by ID:', err)
        return res.status(500).json('An error occurred')
    }
}

export const updateSelectedUser = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10)
    if (isNaN(id)) {
        return res.status(400).json('Invalid user ID');
    }
    const updateData: UserUpdate = req.body
    try {
        const user = await findUserById(id)
        if (!user) {
            return res.status(404).json('User not found')
        }
        const updatedData = await updateUser(id, updateData)
        return res.status(200).json(updatedData)
    } catch (err) {
        console.error('Error fetching user by ID:', err)
        return res.status(500).json('An error occurred')
    }
}

export const deleteSelectedUser = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10)
    if (isNaN(id)) {
        return res.status(400).json('Invalid user ID');
    }
    try {
        const deletedUser = await deleteUser(id)
        if (!deletedUser) {
            return res.status(404).json('User not found');
        }
        return res.status(200).json(deletedUser);
    } catch (err) {
        console.error('Error deleting user:', err);
        return res.status(500).json('An error occurred');
    }
}