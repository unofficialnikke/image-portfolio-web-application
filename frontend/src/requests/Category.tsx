import { Category } from "../type";

export const getUserCategories = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}user-categories`)
        const data: Category[] = await response.json()
        return data
    } catch (err) {
        console.log(`Error getting categories: ${err}`)
        return null
    }
}

export const getUserCategoriesById = async (id: string) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}user-categories/user/${id}`)
        const data: Category[] = await response.json()
        return data
    } catch (err) {
        console.log(`Error getting categories: ${err}`)
        return null
    }
}


