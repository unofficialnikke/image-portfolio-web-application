import { currentUser, LoginInputs, RegisterInputs } from '../type'

export const addNewUser = async (inputs: RegisterInputs) => {
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
        return {
            success: response.ok,
            data: responseData
        }
    }
    catch (err) {
        console.log(`An error occurred: ${err}`)
        return { success: false, data: 'An error occurred' }
    }
}

export const loginUser = async (inputs: LoginInputs) => {
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
        const responseData: string | currentUser = await response.json()
        return {
            success: response.ok,
            data: responseData
        }
    }
    catch (err) {
        console.log(`An error occurred: ${err}`)
        return { success: false, data: 'An error occurred' }
    }
}
