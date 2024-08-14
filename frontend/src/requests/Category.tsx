import { AddUserCategory } from "../type";

export const getCategories = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}categories`)
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

export const deleteUserCategory = async (id: number) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}user-categories/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const data: string = await response.json()
        return {
            success: response.ok,
            data: data
        }
    } catch (err) {
        console.error('Error deleting category: ', err)
        return { success: false, data: 'An error occurred' }
    }
}

export const addNewUserCategory = async (inputs: AddUserCategory) => {
    const requestConfig: RequestInit = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(inputs)
    }
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}user-categories`, requestConfig)
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