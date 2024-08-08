import { db } from "../config/db"
import { CategoryUpdate, Category, NewCategory } from "../types"

export const findAllCategories = async () => {
    return await db
        .selectFrom('category')
        .selectAll()
        .execute()
}

export const findByCategoryName = async (name: string) => {
    return await db
        .selectFrom('category')
        .selectAll()
        .where('name', '=', name)
        .executeTakeFirst()
}

export const findCategoryById = async (categoryId: number) => {
    return await db
        .selectFrom('category')
        .selectAll()
        .where('id', '=', categoryId)
        .executeTakeFirst()
}

export const createCategory = async (category: NewCategory) => {
    return await db
        .insertInto('category')
        .values(category)
        .returningAll()
        .executeTakeFirstOrThrow()
}

export const deleteCategory = async (id: number) => {
    return await db
        .deleteFrom('category')
        .where('id', '=', id)
        .returningAll()
        .executeTakeFirst()
}

