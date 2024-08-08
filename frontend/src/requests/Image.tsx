
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

