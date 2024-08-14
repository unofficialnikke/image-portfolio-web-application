import { Request, Response } from "express"
import {
    createCategory, findAllCategories, findByCategoryName,
    findCategoryById, deleteCategory
} from "../repositories/categoryRepository"

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
    const id = parseInt(req.params.id, 10)
    if (isNaN(id)) {
        return res.status(400).json('Invalid category ID');
    }
    try {
        const category = await findCategoryById(id)
        if (!category) {
            return res.status(404).json('Category not found')
        }
        res.status(200).json(category)
    } catch (err) {
        console.error('Error fetching category by ID:', err)
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
        return res.status(201).json(insertedCategory)
    } catch (err) {
        console.error('Error adding new category', err);
        return res.status(500).json('An error occurred');
    }
}

export const deleteSelectedCategory = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10)
    if (isNaN(id)) {
        return res.status(400).json('Invalid category ID');
    }
    try {
        const deletedCategory = await deleteCategory(id)
        if (!deletedCategory) {
            return res.status(404).json('Category not found');
        }
        return res.status(200).json(deletedCategory);
    } catch (err) {
        console.error('Error deleting category:', err);
        return res.status(500).json('An error occurred');
    }
}