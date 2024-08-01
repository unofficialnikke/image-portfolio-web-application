import { db } from "../db"
import { UserCategoryUpdate, UserCategory, NewUserCategory } from "../types"

export const findAllUserCategories = async () => {
    return await db
        .selectFrom('user_category')
        .selectAll()
        .execute()
}

export const findUserCategoryByUserId = async (userId: number) => {
    return await db
        .selectFrom('user_category')
        .selectAll()
        .where('user_id', '=', userId)
        .execute()
}

export const findUserCategoryById = async (userCategoryId: number) => {
    return await db
        .selectFrom('user_category')
        .selectAll()
        .where('id', '=', userCategoryId)
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

