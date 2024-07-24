import { ReactNode, useState, createContext, useEffect } from 'react'
import { loginUser } from '../requests/Auth'
import { LoginInputs, ResultType, currentUser } from '../type'

type AuthContextProps = {
    currentUser: currentUser | null
    setCurrentUser: (user: currentUser | null) => void
    login: (inputs: LoginInputs) => Promise<ResultType>
}

const initialContext: AuthContextProps = {
    currentUser: null,
    setCurrentUser: () => { },
    login: async () => ({ success: false, data: '' }),
}

type AuthProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextProps>(initialContext)

export const AuthContextProvider = ({ children }: AuthProviderProps) => {
    const JSONParse = (item: string | null) => {
        try {
            return item ? JSON.parse(item) : null
        } catch (error) {
            return null
        }
    }
    const storageUser = JSONParse(localStorage.getItem('user'))
    const [currentUser, setCurrentUser] = useState<currentUser | null>(storageUser);

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


