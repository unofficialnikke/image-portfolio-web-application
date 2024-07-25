import { ReactNode, createContext, useEffect, useState } from "react"
import { User } from "../type"
import { getAllUsers } from "../requests/User"

type UserContextProps = {
    users: User[]
}

const initialContext: UserContextProps = {
    users: [],
}

type UserProviderProps = {
    children: ReactNode
}

export const UserContext = createContext<UserContextProps>(initialContext)

export const UserContextProvider = ({ children }: UserProviderProps) => {
    const [users, setUsers] = useState<User[]>([])

    useEffect(() => {
        const fetchUsers = async () => {
            const fetchedUsers = await getAllUsers()
            setUsers(fetchedUsers)
        }
        fetchUsers()
    }, [])

    return (
        <UserContext.Provider value={{ users }}>
            {children}
        </UserContext.Provider>
    )
}