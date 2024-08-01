import { Request, Response } from "express"
import { findAllUserCategories, findUserCategoryByUserId, findUserCategoryById, createUserCategory, findUserCategoryByIds, deleteUserCategory } from "../repositories/userCategoryRepository"
import { findUserById } from "../repositories/userRepository"
import { findCategoryById } from "../repositories/categoryRepository"

export const getUserCategories = async (req: Request, res: Response) => {
    try {
        const userCategories = await findAllUserCategories()
        if (userCategories.length === 0) {
            return res.status(404).json('User categories not found')
        }
        res.status(200).json(userCategories)
    } catch (err) {
        console.error('Error fetching User categories:', err)
        return res.status(500).json('An error occurred')
    }
}
export const getUserCategoriyByUserId = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id, 10)
    try {
        const userCategories = await findUserCategoryByUserId(userId)
        if (!userCategories) {
            return res.status(404).json('User categories not found')
        }
        res.status(200).json(userCategories)
    } catch (err) {
        console.error('Error fetching User categories:', err)
        return res.status(500).json('An error occurred')
    }
}

export const getUserCategoriyById = async (req: Request, res: Response) => {
    const userCategoryId = parseInt(req.params.id, 10)
    try {
        const userCategories = await findUserCategoryById(userCategoryId)
        if (!userCategories) {
            return res.status(404).json('User categories not found')
        }
        res.status(200).json(userCategories)
    } catch (err) {
        console.error('Error fetching User categories by ID:', err)
        return res.status(500).json('An error occurred')
    }
}

export const addNewUserCategory = async (req: Request, res: Response) => {
    try {
        const { category_id, user_id } = req.body
        const user = await findUserById(user_id)
        const category = await findCategoryById(category_id)
        const checkExistence = await findUserCategoryByIds(user_id, category_id)
        if (!user) {
            return res.status(404).json('User does not exist')
        }
        if (!category) {
            return res.status(404).json('Category does not exist')
        }
        if (checkExistence) {
            return res.status(409).json('The selected category already exists!')
        }
        const newUserCategory = {
            category_id,
            user_id
        }
        const insertedUserCategory = await createUserCategory(newUserCategory)
        return res.status(200).json(insertedUserCategory)
    } catch (err) {
        console.error('Error adding new User categories', err);
        return res.status(500).json('An error occurred');
    }
}

export const deleteSelectedUserCategory = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10)
    if (isNaN(id)) {
        return res.status(400).json('Invalid user category ID');
    }
    try {
        const deletedUserCategory = await deleteUserCategory(id)
        if (!deletedUserCategory) {
            return res.status(404).json('User category not found');
        }
        return res.status(200).json(deletedUserCategory);
    } catch (err) {
        console.error('Error deleting user category:', err);
        return res.status(500).json('An error occurred');
    }
}