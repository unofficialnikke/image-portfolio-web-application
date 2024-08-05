import { Request, Response } from "express"
import { createImage, findAllImages, findByImageId, findImageByUserId, deleteImage } from "../repositories/imageRepository"
import { findUserById } from "../repositories/userRepository"
import crypto from 'crypto'
import sharp from "sharp"
import { uploadFile, getObjectSignedUrl } from "../s3"

const randomImageName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex')

export const getImages = async (req: Request, res: Response) => {
    try {
        const images = await findAllImages()
        if (images.length === 0) {
            return res.status(404).json('Images not found')
        }
        res.status(200).json(images)
    } catch (err) {
        console.error('Error fetching images:', err)
        return res.status(500).json('An error occurred')
    }
}

export const getImageByUserId = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10)
    try {
        const image = await findImageByUserId(id)
        if (!image) {
            return res.status(404).json('Image not found')
        }
        for (const i of image) {
            i.image_url = await getObjectSignedUrl(i.image_url)
        }
        res.send(image)
    } catch (err) {
        console.error('Error fetching image by ID:', err)
        return res.status(500).json('An error occurred')
    }
}

export const getImageById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10)
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
        const { user_id, upload_date } = req.body
        const user = await findUserById(user_id);
        if (!user) {
            return res.status(404).json('User does not exist');
        }
        const newImage = {
            user_id,
            image_url: imageName,
            upload_date
        }
        const insertedImage = await createImage(newImage)
        return res.status(200).json(insertedImage)
    } catch (err) {
        console.error('Error adding new image', err);
        return res.status(500).json('An error occurred');
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
        return res.status(200).json(deletedImage);
    } catch (err) {
        console.error('Error deleting image:', err);
        return res.status(500).json('An error occurred');
    }
}