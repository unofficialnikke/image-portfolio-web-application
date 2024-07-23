import { RegisterInputs } from "../type"

export const validRegistration = (
    inputs: RegisterInputs,
    passwordCheck: string,
    setError: (error: string) => void): boolean => {
    if (!inputs.email || !inputs.firstname || !inputs.lastname || !inputs.password || !passwordCheck) {
        setError('All field need to be filled')
        return false
    }
    if (passwordCheck !== inputs.password) {
        setError('Passwords do not match!')
        return false
    }
    if (inputs.password.length < 7) {
        setError('Password needs to be atleast 7 characters long.')
        return false
    } else {
        return true
    }
}



