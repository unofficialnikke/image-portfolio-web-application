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

export const getuserById = async (id: number) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}users/${id}`)
        const data: User = await response.json()
        return {
            success: response.ok,
            data: data
        }
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error(`Error getting users: ${err.message}`)
        }
        return {
            success: false,
            data: 'An error occurred'
        }
    }
}

export const updateUser = async (id: number, updateData: Partial<User>) => {
    const requestConfig: RequestInit = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
    }
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}users/${id}`, requestConfig)
        const responseData: string = await response.json()
        return {
            success: response.ok,
            data: responseData
        }
    } catch (err) {
        console.log(`An error occurred: ${err}`)
        return { success: false, data: 'An error occurred' }
    }
}