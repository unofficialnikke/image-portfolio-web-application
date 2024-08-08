import { db } from "../config/db"
import { SocialMediaUpdate, SocialMedia, NewSocialMedia } from "../types"

export const findAllSocialMedias = async () => {
    return await db
        .selectFrom('social_media')
        .selectAll()
        .execute()
}

export const findSocialMediaByUserId = async (userId: number) => {
    return await db
        .selectFrom('social_media')
        .selectAll()
        .where('user_id', '=', userId)
        .executeTakeFirst()
}

export const findBySocialMediaId = async (socialId: number) => {
    return await db
        .selectFrom('social_media')
        .selectAll()
        .where('id', '=', socialId)
        .executeTakeFirst()
}

export const createSocialMedia = async (socialMedia: NewSocialMedia) => {
    return await db
        .insertInto('social_media')
        .values(socialMedia)
        .returningAll()
        .executeTakeFirstOrThrow()
}

export const updateSocialMedia = async (id: number, updateWith: SocialMediaUpdate) => {
    return db
        .updateTable('social_media')
        .set(updateWith)
        .where('id', '=', id)
        .returningAll()
        .executeTakeFirstOrThrow()
}

export const deleteSocial = async (id: number) => {
    return await db
        .deleteFrom('social_media')
        .where('id', '=', id)
        .returningAll()
        .executeTakeFirst()
}
