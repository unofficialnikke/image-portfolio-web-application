export const ImgeUploadValidation = (file: File) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png']
    const allowedSizeMb = 15 * 1024 * 1024

    if (!allowedTypes.includes(file.type) || file.size > allowedSizeMb) {
        return false
    } else {
        return true
    }
}

