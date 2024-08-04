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

export type Category = {
    id: number
    name: string
    category_id: number
    user_id: number
}

export type UserCategory = {
    id: number
    user_id: number
    category_id: number
}

export type Image = {
    id: number
    user_id: number
    image_url: string
    upload_date: Date
}

export type SocialMedia = {
    id: number
    user_id: number
    instagram_url: string
    linkedin_url: string
    portfolio_url: string
}
