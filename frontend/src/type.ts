export type RegisterInputs = {
    firstname: string,
    lastname: string,
    email: string,
    password: string
}

export type LoginInputs = {
    email: string
    password: string
}

export type currentUser = {
    email: string
    firstname: string
    id: number
    introduction_text: string
    lastname: string
}

export type ResultType =
    | { success: true; data: currentUser }
    | { success: false; data: string }
    | { success: false; data: null };  