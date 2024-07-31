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

export const createUserCategory = async (userCategory: NewUserCategory) => {
    return await db
        .insertInto('user_category')
        .values(userCategory)
        .returningAll()
        .executeTakeFirstOrThrow()
}