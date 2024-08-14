import { LoginInputs, RegisterInputs } from "../type"

export const validRegistration = (
    inputs: RegisterInputs,
    passwordCheck: string,
    setError: (error: string) => void): boolean => {
    if (!inputs.email || !inputs.firstname || !inputs.lastname ||
        !inputs.city || !inputs.password || !passwordCheck) {
        setError('All fields need to be filled.')
        return false
    }
    if (passwordCheck !== inputs.password) {
        setError('Passwords do not match.')
        return false
    }
    if (inputs.password.length < 7) {
        setError('Password needs to be atleast 7 characters long.')
        return false
    } else {
        return true
    }
}

export const validLogin = (
    inputs: LoginInputs,
    setError: (error: string) => void): boolean => {
    if (!inputs.email || !inputs.password) {
        setError('All fields need to be filled')
        return false
    } else {
        return true
    }
}

export const isValidUrl = (url: string): boolean => {
    try {
        new URL(url)
        return true
    } catch (_) {
        return false
    }
}



