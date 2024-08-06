import { User } from "../type"

export const getAllUsers = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}users`)
        const data = await response.json()
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        return data
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error(`Error getting users: ${err.message}`)
        }
        return null
    }
}

export const getuserById = async (id: string) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}users/${id}`)
        const data: User = await response.json()
        return data
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error(`Error getting users: ${err.message}`)
        }
        return null
    }
}