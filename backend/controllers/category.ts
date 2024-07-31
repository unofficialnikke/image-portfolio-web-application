import { Request, Response } from "express"
import { createCategory, findAllCategories, findByCategoryName, findCategoryByUserId, findCategoryById } from "../repositories/categoryRepository"
import { findUserById } from "../repositories/userRepository"

export const getCategories = async (req: Request, res: Response) => {
    try {
        const categories = await findAllCategories()
        if (categories.length === 0) {
            return res.status(404).json('Categories not found')
        }
        res.status(200).json(categories)
    } catch (err) {
        console.error('Error fetching categories:', err)
        return res.status(500).json('An error occurred')
    }
}

export const getCategoryById = async (req: Request, res: Response) => {
    const categoryId = parseInt(req.params.id, 10)
    try {
        const category = await findCategoryById(categoryId)
        if (!category) {
            return res.status(404).json('Category not found')
        }
        res.status(200).json(category)
    } catch (err) {
        console.error('Error fetching category by ID:', err)
        return res.status(500).json('An error occurred')
    }
}

export const getCategoryByUserId = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id, 10)
    try {
        const user = await findUserById(userId)
        const categories = await findCategoryByUserId(userId)
        if (!user) {
            return res.status(404).json('User does not exist')
        }
        res.status(200).json(categories)
    } catch (err) {
        console.error('Error fetching User categories by User ID:', err)
        return res.status(500).json('An error occurred')
    }
}

export const addNewCategory = async (req: Request, res: Response) => {
    try {
        const { name } = req.body
        const existingCategory = await findByCategoryName(name)
        if (existingCategory) {
            return res.status(409).json('Category already exists!')
        }
        const newCategory = {
            name
        }
        const insertedCategory = await createCategory(newCategory)
        return res.status(200).json(insertedCategory)
    } catch (err) {
        console.error('Error adding new category', err);
        return res.status(500).json('An error occurred');
    }
}