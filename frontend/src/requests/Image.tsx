import { Image } from "../type"

export const getImagesByUserId = async (userId: string) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}images/user/${userId}`)
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const data: Image[] = await response.json()
        return data
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error(`Error getting categories: ${err.message}`)
        }
        return null
    }
}

export const getImages = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}images`)
        const data: Image[] = await response.json()
        return data
    } catch (err) {
        return console.log('Error getting images ', err)
    }
}

export const uploadImage = async (file: File, userId: string) => {
    const formData = new FormData()
    if (file) {
        formData.append('image', file)
    }
    formData.append('user_id', userId)
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}images`, {
            method: 'POST',
            body: formData
        })
        const data: string = await response.json()
        return data
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error(`Error getting categories: ${err.message}`)
        }
        return null
    }
}



