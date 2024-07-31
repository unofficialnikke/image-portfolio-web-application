import { db } from "../db"
import { SocialMediaUpdate, SocialMedia, NewSocialMedia } from "../types"

export const findAllSocials = async () => {
    return await db
        .selectFrom('social_media')
        .selectAll()
        .execute()
}

export const findSocialByUserId = async (userId: number) => {
    return await db
        .selectFrom('social_media')
        .selectAll()
        .where('user_id', '=', userId)
        .execute()
}

export const findBySocialId = async (socialId: number) => {
    return await db
        .selectFrom('social_media')
        .selectAll()
        .where('id', '=', socialId)
        .executeTakeFirst()
}

export const createSocial = async (socialMedia: NewSocialMedia) => {
    return await db
        .insertInto('social_media')
        .values(socialMedia)
        .returningAll()
        .executeTakeFirstOrThrow()
}
