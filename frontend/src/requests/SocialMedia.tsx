import { NewSocialMedia } from '../type'

export const addSocialMedia = async (inputs: NewSocialMedia, id: number) => {
    const requestConfig: RequestInit = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(inputs)
    }
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}social-medias/${id}`, requestConfig)
        const responseData: string = await response.json()
        return {
            success: response.ok,
            data: responseData
        }
    }
    catch (err) {
        console.log(`An error occurred: ${err}`)
        return { success: false, data: 'An error occurred' }
    }
}
