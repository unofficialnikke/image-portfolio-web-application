import { LoginInputs, RegisterInputs } from '../type'

export const addNewUser = async (inputs: RegisterInputs): Promise<{ success: boolean; data: string }> => {
    const requestConfig: RequestInit = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(inputs)
    }
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}auth/register`, requestConfig)
        const responseData: string = await response.json()
        if (!response.ok) {
            return { success: false, data: responseData }
        } else {
            return { success: true, data: responseData }
        }
    }
    catch (err) {
        console.log(err)
        return { success: false, data: 'An error occurred' }
    }
}

export const loginUser = async (inputs: LoginInputs): Promise<{ success: boolean; data: string }> => {
    const requestConfig: RequestInit = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(inputs),
        credentials: 'include'
    }
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}auth/login`, requestConfig)
        const responseData: string = await response.json()
        if (!response.ok) {
            return { success: false, data: responseData }
        } else {
            return { success: true, data: responseData }
        }
    }
    catch (err) {
        console.log(err)
        return { success: false, data: 'An error occurred' }
    }
}