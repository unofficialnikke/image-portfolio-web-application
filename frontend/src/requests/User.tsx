export const getAllUsers = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}user/all`)
        const data = await response.json()
        console.log(data)
        return data
    } catch (err) {
        console.log(`Error getting users: ${err}`)
    }
}