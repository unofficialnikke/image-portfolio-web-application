import { ReactNode, useState, createContext, useEffect } from 'react'
import { loginUser, logoutUser } from '../requests/Auth'
import { LoginInputs, currentUser } from '../type'

type AuthContextProps = {
    currentUser: currentUser | null
    setCurrentUser: (user: currentUser | null) => void
    login: (inputs: LoginInputs) => Promise<{ success: boolean; data: currentUser | string }>
    logout: () => Promise<{ success: boolean; data: currentUser | string }>
}

const initialContext: AuthContextProps = {
    currentUser: null,
    setCurrentUser: () => { },
    login: async () => ({ success: false, data: '' }),
    logout: async () => ({ success: false, data: '' })
}

type AuthProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextProps>(initialContext)

export const AuthContextProvider = ({ children }: AuthProviderProps) => {
    const JSONParse = (user: string | null) => {
        try {
            return user ? JSON.parse(user) : null
        } catch (error) {
            return null
        }
    }
    const storageUser = JSONParse(localStorage.getItem('user'))
    const [currentUser, setCurrentUser] = useState<currentUser | null>(storageUser);

    const login = async (inputs: LoginInputs) => {
        const result = await loginUser(inputs)
        if (result.success) {
            setCurrentUser(result.data as currentUser)
        }
        return result
    }

    const logout = async () => {
        const result = await logoutUser()
        if (result.success) {
            console.log(result.data)
            setCurrentUser(null)
        }
        return result
    }

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(currentUser))
    }, [currentUser])

    return (
        <AuthContext.Provider value={{ currentUser, setCurrentUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}


