import { SocialMedia } from "../type"

export const getSocialMediaById = async (id: string) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}social-medias/user/${id}`)
        const data: SocialMedia | null = await response.json()
        return data
    } catch (err) {
        console.log(`Error getting social: ${err}`)
        return null
    }
}