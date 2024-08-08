import { db } from "../config/db";
import { ImageUpdate, Image, NewImage } from "../types";

export const findAllImages = async () => {
    return await db
        .selectFrom('image')
        .selectAll()
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

export const createImage = async (image: NewImage) => {
    return await db
        .insertInto('image')
        .values(image)
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

