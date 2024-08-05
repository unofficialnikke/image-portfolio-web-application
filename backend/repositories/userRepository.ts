import { db } from "../db"
import { UserUpdate, Users, NewUser } from "../types"

export const findAllUSers = async () => {
    return await db
        .selectFrom('users')
        .select([
            'id',
            'firstname',
            'lastname',
            'email',
            'city',
            'phone',
            'introduction_text'
        ])
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
        .select([
            'id',
            'firstname',
            'lastname',
            'email',
            'city',
            'phone',
            'introduction_text'
        ])
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

export const updateUser = async (id: number, updateWith: UserUpdate) => {
    return db
        .updateTable('users')
        .set(updateWith)
        .where('id', '=', id)
        .returning([
            'id',
            'firstname',
            'lastname',
            'email',
            'city',
            'phone',
            'introduction_text'
        ])
        .executeTakeFirstOrThrow()
}

export const deleteUser = async (id: number) => {
    return await db
        .deleteFrom('users')
        .where('id', '=', id)
        .returningAll()
        .executeTakeFirst()
}





