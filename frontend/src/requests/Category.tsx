import { Category } from "../type";

export const getUserCategories = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}user-categories`)
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const data: Category[] = await response.json()
        return data
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error(`Error getting categories: ${err.message}`)
        }
        return null
    }
}

export const getUserCategoriesById = async (id: string) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}user-categories/user/${id}`)
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const data: Category[] = await response.json()
        return data
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error(`Error getting categories: ${err.message}`)
        }
        return null
    }
}


