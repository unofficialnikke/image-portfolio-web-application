import { SocialMedia } from "../type"

export const getSocialMediaById = async (id: string) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}social-medias/user/${id}`)
        if (!response.ok) {
            throw new Error(`Response status: ${response.statusText}`);
        }
        const data: SocialMedia = await response.json()
        return data
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error(`Error getting social media: ${err.message}`)
        }
        return null
    }
}