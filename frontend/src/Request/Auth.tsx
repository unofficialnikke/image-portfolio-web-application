import { RegisterInputs } from '../type'

export const addNewUser = async (inputs: RegisterInputs) => {
    const requestConfig: RequestInit = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(inputs)
    }
    try {
        const response = await fetch('http://localhost:5000/api/auth/register', requestConfig)
        const responseData = await response.json()
        if (!response.ok) {
            return { success: false, data: responseData }
        } else {
            return { success: true, data: responseData }
        }
    }
    catch (err) {
        console.log(err)
    }
}