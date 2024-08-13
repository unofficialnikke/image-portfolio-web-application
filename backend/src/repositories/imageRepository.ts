import { db } from "../config/db";
import { ImageUpdate, Image, NewImage } from "../types";

export const findAllImages = async () => {
    return await db
        .selectFrom('image')
        .selectAll()
        .orderBy('image.id')
        .execute()
}

export const findImageByUserId = async (userId: number) => {
    return await db
        .selectFrom('image')
        .selectAll()
        .where('user_id', '=', userId)
        .execute()
}

export const findByImageId = async (id: number) => {
    return await db
        .selectFrom('image')
        .selectAll()
        .where('id', '=', id)
        .executeTakeFirst()
}

export const countUserImages = async (userId: number) => {
    const result = await db
        .selectFrom('image')
        .select((eb) => eb.fn.count('id').as('imageCount'))
        .where('user_id', '=', userId)
        .executeTakeFirst()
    return Number(result?.imageCount) || 0
}

export const countFavoriteImages = async (userId: number) => {
    const result = await db
        .selectFrom('image')
        .select((eb) => eb.fn.count('id').as('imageCount'))
        .where('user_id', '=', userId)
        .where('is_favorite', '=', true)
        .executeTakeFirst()
    return Number(result?.imageCount) || 0
}

export const createImage = async (image: NewImage) => {
    return await db
        .insertInto('image')
        .values(image)
        .returningAll()
        .executeTakeFirstOrThrow()
}

export const updateImage = async (id: number, updateWith: ImageUpdate) => {
    return db
        .updateTable('image')
        .set(updateWith)
        .where('id', '=', id)
        .returningAll()
        .executeTakeFirstOrThrow()
}

export const deleteImage = async (id: number) => {
    return await db
        .deleteFrom('image')
        .where('id', '=', id)
        .returningAll()
        .executeTakeFirst()
}

