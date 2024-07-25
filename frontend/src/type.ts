export type RegisterInputs = {
    firstname: string
    lastname: string
    email: string
    password: string
    phone: string | null
    city: string
}

export type LoginInputs = {
    email: string
    password: string
}

export type User = {
    id: number
    firstname: string
    lastname: string
    email: string
    phone: string | null
    city: string
    introduction_text: string | null
}