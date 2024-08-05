import { User } from "../type"

export const getAllUsers = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}users`)
        const data = await response.json()
        return data
    } catch (err) {
        console.log(`Error getting users: ${err}`)
        return null
    }
}

export const getuserById = async (id: string) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}users/${id}`)
        const data: User = await response.json()
        return data
    } catch (err) {
        console.log(`Error getting users: ${err}`)
        return null

    }
}