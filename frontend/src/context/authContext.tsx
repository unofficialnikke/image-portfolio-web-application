import { ReactNode, useState, createContext, useEffect } from 'react'
import { loginUser, logoutUser } from '../requests/Auth'
import { LoginInputs, LoginResponse, User } from '../type'
import { jwtDecode } from "jwt-decode"

type AuthContextProps = {
    currentUser: User | null
    setCurrentUser: (user: User | null) => void
    login: (inputs: LoginInputs) => Promise<{ success: boolean; data: LoginResponse | string }>
    logout: () => Promise<{ success: boolean; data: User | string }>
}

const initialContext: AuthContextProps = {
    currentUser: null,
    setCurrentUser: () => { },
    login: async () => ({ success: false, data: '' }),
    logout: async () => ({ success: false, data: '' })
}

type AuthProviderProps = {
    children: ReactNode
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
    const storedToken = localStorage.getItem('access_token')
    const [currentToken, setCurrentToken] = useState<string | null>(storedToken)
    const [currentUser, setCurrentUser] = useState<User | null>(storageUser)

    const login = async (inputs: LoginInputs) => {
        const result = await loginUser(inputs)
        if (result.success) {
            const data = result.data as LoginResponse
            const decoded = jwtDecode(data.token)
            setCurrentUser(decoded as User)
            setCurrentToken(data.token as string)
        }
        return result
    }

    const logout = async () => {
        const result = await logoutUser()
        if (result.success) {
            localStorage.clear()
            setCurrentUser(null)
        }
        return result
    }

    useEffect(() => {
        if (currentUser && currentToken) {
            localStorage.setItem('user', JSON.stringify(currentUser))
            localStorage.setItem('access_token', currentToken)
            if (currentUser?.expiration <= Date.now()) {
                logout()
            }
        }
    }, [currentUser, currentToken])

    return (
        <AuthContext.Provider value={{ currentUser, setCurrentUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}


