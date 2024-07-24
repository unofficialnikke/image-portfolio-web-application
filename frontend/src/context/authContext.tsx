import { ReactNode, useState, createContext, useEffect } from 'react'
import { loginUser } from '../requests/Auth'
import { LoginInputs } from '../type'

type AuthContextProps = {
    currentUser: string | null
    setCurrentUser: (user: string | null) => void
    login: (inputs: LoginInputs) => Promise<{ success: boolean; data: string }>;
}

const initialContext: AuthContextProps = {
    currentUser: '',
    setCurrentUser: () => { },
    login: async () => ({ success: false, data: '' })
}

type AuthProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextProps>(initialContext)

export const AuthContextProvider = ({ children }: AuthProviderProps) => {
    const [currentUser, setCurrentUser] = useState<string | null>(JSON.parse(localStorage.getItem('user')!) || null)

    const login = async (inputs: LoginInputs) => {
        const result = await loginUser(inputs)
        if (result.success) {
            setCurrentUser(result.data)
        }
        return result
    }

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(currentUser))
    }, [currentUser])

    return (
        <AuthContext.Provider value={{ currentUser, setCurrentUser, login }}>
            {children}
        </AuthContext.Provider>
    )
}



