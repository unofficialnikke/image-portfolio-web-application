import { User } from "../type"

export const getAllUsers = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}user/all`)
        const data = await response.json()
        return data
    } catch (err) {
        console.log(`Error getting users: ${err}`)
    }
}

export const getuserById = async (id: string) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}user/${id}`)
        const data: User | null = await response.json()
        return data
    } catch (err) {
        console.log(`Error getting users: ${err}`)
        return null
    }
}