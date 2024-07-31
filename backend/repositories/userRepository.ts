import { db } from "../db"
import { UserUpdate, Users, NewUser } from "../types"

export const findAllUSers = async () => {
    return await db
        .selectFrom('users')
        .selectAll()
        .execute()
}

export const findByUserEmail = async (email: string) => {
    return await db
        .selectFrom('users')
        .selectAll()
        .where('email', '=', email)
        .executeTakeFirst()
}

export const findUserById = async (userId: number) => {
    return await db
        .selectFrom('users')
        .selectAll()
        .where('id', '=', userId)
        .executeTakeFirst()
}

export const createUser = async (user: NewUser) => {
    return await db
        .insertInto('users')
        .values(user)
        .returningAll()
        .executeTakeFirstOrThrow()
}




