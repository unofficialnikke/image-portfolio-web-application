import { Request, Response } from "express"
import { createSocialMedia, findAllSocialMedias, findBySocialMediaId, findSocialMediaByUserId, deleteSocial, updateSocialMedia } from "../repositories/socialMediaRepository"
import { findUserById } from "../repositories/userRepository"
import { SocialMediaUpdate } from "../types"

export const getSocialMedias = async (req: Request, res: Response) => {
    try {
        const socials = await findAllSocialMedias()
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
    const id = parseInt(req.params.id, 10)
    if (isNaN(id)) {
        return res.status(400).json('Invalid category ID');
    }
    try {
        const socials = await findSocialMediaByUserId(id)
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
    const id = parseInt(req.params.id, 10)
    if (isNaN(id)) {
        return res.status(400).json('Invalid category ID');
    }
    try {
        const socials = await findBySocialMediaId(id)
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
        const user = await findUserById(user_id)
        const existingSocialMedia = await findSocialMediaByUserId(user_id)
        if (!user) {
            return res.status(404).json('User does not exist');
        }
        if (existingSocialMedia) {
            return res.status(409).json('Social Media for selected user already exists!');
        }
        const newSocial = {
            user_id,
            instagram_url,
            linkedin_url,
            portfolio_url
        }
        const insertedSocial = await createSocialMedia(newSocial)
        return res.status(201).json(insertedSocial)
    } catch (err) {
        console.error('Error adding new Social media', err);
        return res.status(500).json('An error occurred');
    }
}

export const updateSelectedSocialMedia = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10)
    if (isNaN(id)) {
        return res.status(400).json('Invalid Social Media ID');
    }
    const updateData: SocialMediaUpdate = req.body
    try {
        const existingSocialMedia = await findBySocialMediaId(id)
        if (!existingSocialMedia) {
            return res.status(404).json('Social Media does not exist');
        }
        const updatedData = await updateSocialMedia(id, updateData)
        return res.status(200).json(updatedData)
    } catch (err) {
        console.error('Error fetching Social Media by ID:', err)
        return res.status(500).json('An error occurred')
    }
}

export const deleteSelectedSocialMedia = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10)
    if (isNaN(id)) {
        return res.status(400).json('Invalid Social Media ID');
    }
    try {
        const deletedSocial = await deleteSocial(id)
        if (!deletedSocial) {
            return res.status(404).json('Social Media not found');
        }
        return res.status(200).json(deletedSocial);
    } catch (err) {
        console.error('Error deleting Social Media:', err);
        return res.status(500).json('An error occurred');
    }
}