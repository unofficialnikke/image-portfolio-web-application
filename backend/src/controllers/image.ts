import { Request, Response } from "express"
import { createImage, findAllImages, findByImageId, findImageByUserId, deleteImage, countUserImages, updateImage, countFavoriteImages } from "../repositories/imageRepository"
import { findUserById } from "../repositories/userRepository"
import crypto from 'crypto'
import sharp from "sharp"
import { uploadFile, getObjectSignedUrl, deleteFile } from "../config/s3"
import { ImageUpdate } from "../types"

const randomImageName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex')

export const getImages = async (req: Request, res: Response) => {
    try {
        const images = await findAllImages()
        if (images.length === 0) {
            return res.status(404).json('Images not found')
        }
        for (const i of images) {
            i.image_url = await getObjectSignedUrl(i.image_url)
        }
        res.status(200).json(images)
    } catch (err) {
        console.error('Error fetching images:', err)
        return res.status(500).json('An error occurred')
    }
}

export const getImageByUserId = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10)
    if (isNaN(id)) {
        return res.status(400).json('Invalid category ID');
    }
    try {
        const images = await findImageByUserId(id)
        if (!images) {
            return res.status(404).json('Image not found')
        }
        for (const i of images) {
            i.image_url = await getObjectSignedUrl(i.image_url)
        }
        res.send(images)
    } catch (err) {
        console.error('Error fetching image by ID:', err)
        return res.status(500).json('An error occurred')
    }
}

export const getImageById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10)
    if (isNaN(id)) {
        return res.status(400).json('Invalid category ID');
    }
    try {
        const image = await findByImageId(id)
        if (!image) {
            return res.status(404).json('Image not found')
        }
        res.status(200).json(image)
    } catch (err) {
        console.error('Error fetching image by ID:', err)
        return res.status(500).json('An error occurred')
    }
}

export const addNewImage = async (req: Request, res: Response) => {
    const file = req.file
    const imageName = randomImageName()
    const fileBuffer = await sharp(req.file?.buffer)
        .resize({})
        .toBuffer()
    await uploadFile(fileBuffer, imageName, file!.mimetype)
    try {
        const { user_id, upload_date, is_favorite } = req.body
        const user = await findUserById(user_id)
        const imageCount = await countUserImages(user_id)
        if (!user) {
            return res.status(404).json('User does not exist')
        }
        if (imageCount >= 10) {
            return res.status(403).json('You cannot upload more than 10 images!')
        }
        const newImage = {
            user_id,
            image_url: imageName,
            upload_date,
            is_favorite
        }
        const insertedImage = await createImage(newImage)
        return res.status(201).json(insertedImage)
    } catch (err) {
        console.error('Error adding new image', err);
        return res.status(500).json('An error occurred');
    }
}

export const updateSelectedImage = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10)
    if (isNaN(id)) {
        return res.status(400).json('Invalid image ID');
    }
    const updateData: ImageUpdate = req.body
    try {
        const image = await findByImageId(id)
        if (updateData.user_id && updateData.is_favorite) {
            const favoriteCount = await countFavoriteImages(updateData.user_id)
            if (favoriteCount >= 3) {
                return res.status(403).json('Cannot add more than three favorite images!')
            }
        }
        if (!image) {
            return res.status(404).json('Image not found')
        }
        const updatedData = await updateImage(id, updateData)
        return res.status(200).json(updatedData)
    } catch (err) {
        console.error('Error fetching image by ID:', err)
        return res.status(500).json('An error occurred')
    }
}

export const deleteSelectedImage = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10)
    if (isNaN(id)) {
        return res.status(400).json('Invalid image ID');
    }
    try {
        const deletedImage = await deleteImage(id)
        if (!deletedImage) {
            return res.status(404).json('Image not found');
        }
        await deleteFile(deletedImage.image_url)
        return res.status(200).json('Image deleted succesfully!');
    } catch (err) {
        console.error('Error deleting image:', err);
        return res.status(500).json('An error occurred');
    }
}