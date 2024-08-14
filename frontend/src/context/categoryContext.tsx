import { createContext, ReactNode, useEffect, useState } from "react"
import { Category } from "../type"
import { getCategories } from "../requests/Category"

type CategoryContextProps = {
    categories: Category[]
}

const initialContext: CategoryContextProps = {
    categories: []
}

type CategoryProviderProps = {
    children: ReactNode
}

export const CategoryContext = createContext<CategoryContextProps>(initialContext)

export const CategoryContextProvider = ({ children }: CategoryProviderProps) => {
    const [categories, setCategories] = useState<Category[]>([])

    useEffect(() => {
        const fetchCategories = async () => {
            const fetchedCategories = await getCategories()
            setCategories(fetchedCategories)
        }
        fetchCategories()
    }, [])

    return (
        <CategoryContext.Provider value={{ categories }}>
            {children}
        </CategoryContext.Provider>
    )
}