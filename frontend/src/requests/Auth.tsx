import { currentUser, LoginInputs, RegisterInputs, ResultType } from '../type'

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
        if (!response.ok) {
            return { success: false, data: responseData }
        } else {
            return { success: true, data: responseData }
        }
    }
    catch (err) {
        console.log(`An error occurred: ${err}`)
        return { success: false, data: 'An error occurred' }
    }
}

export const loginUser = async (inputs: LoginInputs): Promise<ResultType> => {
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
        const responseData: currentUser | string = await response.json()
        if (!response.ok) {
            return { success: false, data: responseData as string }
        } else {
            return { success: true, data: responseData as currentUser }
        }
    }
    catch (err) {
        console.log(`An error occurred: ${err}`)
        return { success: false, data: 'An error occurred' }
    }
}
