import { Request, Response } from "express"
import { createSocial, findAllSocials, findBySocialId, findSocialByUserId } from "../repositories/socialMediaRepository"
import { findUserById } from "../repositories/userRepository"

export const getSocialMedias = async (req: Request, res: Response) => {
    try {
        const socials = await findAllSocials()
        if (socials.length === 0) {
            return res.status(404).json('Social Medias not found')
        }
        res.status(200).json(socials)
    } catch (err) {
        console.error('Error fetching social medias:', err)
        return res.status(500).json('An error occurred')
    }
}

export const getSocialMediasByUserId = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id, 10)
    try {
        const socials = await findSocialByUserId(userId)
        if (!socials) {
            return res.status(404).json('Social Medias not found')
        }
        res.status(200).json(socials)
    } catch (err) {
        console.error('Error fetching social medias:', err)
        return res.status(500).json('An error occurred')
    }
}

export const getSocialMediasById = async (req: Request, res: Response) => {
    const socialId = parseInt(req.params.id, 10)
    try {
        const socials = await findBySocialId(socialId)
        if (!socials) {
            return res.status(404).json('Social medias not found')
        }
        res.status(200).json(socials)
    } catch (err) {
        console.error('Error fetching Social media by ID:', err)
        return res.status(500).json('An error occurred')
    }
}

export const addNewSocialMedia = async (req: Request, res: Response) => {
    try {
        const { user_id, instagram_url, linkedin_url, portfolio_url } = req.body
        const user = await findUserById(user_id);
        if (!user) {
            return res.status(404).json('User does not exist');
        }
        const newSocial = {
            user_id,
            instagram_url,
            linkedin_url,
            portfolio_url
        }
        const insertedSocial = await createSocial(newSocial)
        return res.status(200).json(insertedSocial)
    } catch (err) {
        console.error('Error adding new Social media', err);
        return res.status(500).json('An error occurred');
    }
}