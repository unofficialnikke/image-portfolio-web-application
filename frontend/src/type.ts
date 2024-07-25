export type RegisterInputs = {
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    phone: string | null,
    city: string
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