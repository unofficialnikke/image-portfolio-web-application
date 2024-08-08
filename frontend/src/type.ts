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

export type Category = {
    id: number
    user_id: number
    name: string
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

export type User = {
    id: number
    firstname: string
    lastname: string
    email: string
    phone: string | null
    city: string
    introduction_text: string | null
    images: Image[]
    social_medias: SocialMedia
    categories: Category[]
}
