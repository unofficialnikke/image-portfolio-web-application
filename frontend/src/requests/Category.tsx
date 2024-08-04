import { Category } from "../type";

export const getUserCategoryByUserId = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}user-categories`)
        const data: Category[] = await response.json()
        return data
    } catch (err) {
        console.log(`Error getting categories: ${err}`)
    }
}