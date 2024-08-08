import { db } from "../config/db"
import { getObjectSignedUrl } from "../config/s3"
import { UserUpdate, Users, NewUser } from "../types"
import { jsonArrayFrom, jsonObjectFrom } from 'kysely/helpers/postgres'

export const findAllUSers = async () => {
    const users = await db
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
        .select((eb) => [
            jsonArrayFrom(
                eb.selectFrom('image')
                    .selectAll()
                    .whereRef('users.id', '=', 'image.user_id')
                    .orderBy('image.id')
            ).as('images')
        ])
        .select((eb) => [
            jsonObjectFrom(
                eb.selectFrom('social_media')
                    .selectAll()
                    .whereRef('users.id', '=', 'social_media.user_id')
                    .orderBy('social_media.id')
            ).as('social_medias')
        ])
        .select((eb) => [
            jsonArrayFrom(
                eb.selectFrom('user_category')
                    .whereRef('users.id', '=', 'user_category.user_id')
                    .innerJoin('category', 'category.id', 'user_category.category_id')
                    .select([
                        'user_category.id as id',
                        'user_category.user_id as user_id',
                        'category.name as name'
                    ])
                    .orderBy('category.name')
            ).as('categories')
        ])
        .orderBy('users.id')
        .execute()

    for (const user of users) {
        if (user?.images) {
            for (const image of user.images) {
                image.image_url = await getObjectSignedUrl(image.image_url)
            }
        }
    }
    return users
}

export const findByUserEmail = async (email: string) => {
    return await db
        .selectFrom('users')
        .selectAll()
        .where('email', '=', email)
        .executeTakeFirst()
}

export const findUserById = async (userId: number) => {
    const user = await db
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
        .select((eb) => [
            jsonArrayFrom(
                eb.selectFrom('image')
                    .selectAll()
                    .whereRef('users.id', '=', 'image.user_id')
                    .orderBy('image.id')
            ).as('images')
        ])
        .select((eb) => [
            jsonObjectFrom(
                eb.selectFrom('social_media')
                    .selectAll()
                    .whereRef('users.id', '=', 'social_media.user_id')
                    .orderBy('social_media.id')
            ).as('social_medias')
        ])
        .select((eb) => [
            jsonArrayFrom(
                eb.selectFrom('user_category')
                    .whereRef('users.id', '=', 'user_category.user_id')
                    .innerJoin('category', 'category.id', 'user_category.category_id')
                    .select([
                        'user_category.id as id',
                        'user_category.user_id as user_id',
                        'category.name as name'
                    ])
                    .orderBy('category.name')
            ).as('categories')
        ])
        .where('id', '=', userId)
        .executeTakeFirst()

    if (user?.images) {
        for (const image of user.images) {
            image.image_url = await getObjectSignedUrl(image.image_url)
        }
    }
    return user
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





