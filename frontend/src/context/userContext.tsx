import { Dispatch, ReactNode, createContext, useEffect, useState } from "react"
import { User } from "../type"
import { getAllUsers } from "../requests/User"

type UserContextProps = {
    users: User[]
    userFetch: boolean
    setUserFetch: Dispatch<React.SetStateAction<boolean>>
}

const initialContext: UserContextProps = {
    users: [],
    userFetch: true,
    setUserFetch: () => { }
}

type UserProviderProps = {
    children: ReactNode
}

export const UserContext = createContext<UserContextProps>(initialContext)

export const UserContextProvider = ({ children }: UserProviderProps) => {
    const [users, setUsers] = useState<User[]>([])
    const [userFetch, setUserFetch] = useState(true)

    useEffect(() => {
        const fetchUsers = async () => {
            if (userFetch) {
                const fetchedUsers = await getAllUsers()
                setUsers(fetchedUsers)
                setUserFetch(false)
            }
        }
        console.log('users fetched')
        fetchUsers()
    }, [userFetch, setUserFetch])

    return (
        <UserContext.Provider value={{ users, userFetch, setUserFetch }}>
            {children}
        </UserContext.Provider>
    )
}