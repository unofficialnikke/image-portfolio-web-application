import { db } from "../config/db"
import { UserCategoryUpdate, UserCategory, NewUserCategory } from "../types"

export const findAllUserCategories = async () => {
    return await db
        .selectFrom('category')
        .innerJoin('user_category', 'category.id', 'user_category.category_id')
        .select([
            'user_category.id as id',
            'user_category.user_id as user_id',
            'category.name as name'
        ])
        .execute()
}

export const findUserCategoryByUserId = async (userId: number) => {
    return await db
        .selectFrom('user_category')
        .where('user_id', '=', userId)
        .innerJoin('category', 'category.id', 'user_category.category_id')
        .select([
            'user_category.id as id',
            'user_category.user_id as user_id',
            'category.name as name'
        ])
        .execute()
}

export const findUserCategoryByIds = async (userId: number, categoryId: number) => {
    return await db
        .selectFrom('user_category')
        .selectAll()
        .where('user_id', '=', userId)
        .where('category_id', '=', categoryId)
        .executeTakeFirst()
}

export const createUserCategory = async (userCategory: NewUserCategory) => {
    return await db
        .insertInto('user_category')
        .values(userCategory)
        .returningAll()
        .executeTakeFirstOrThrow()
}

export const deleteUserCategory = async (id: number) => {
    return await db
        .deleteFrom('user_category')
        .where('id', '=', id)
        .returningAll()
        .executeTakeFirst()
}

