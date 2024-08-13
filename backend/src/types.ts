import {
    ColumnType,
    Generated,
    Insertable,
    Selectable,
    Updateable,
} from 'kysely'

export interface Database {
    users: UserTable
    social_media: SocialMediaTable
    image: ImageTable
    user_category: UserCategoryTable
    category: CategoryTable
}

export interface UserTable {
    id: Generated<number>
    firstname: string
    lastname: string
    email: string
    password: string
    city: string
    phone: string | null
    introduction_text: string | null
}

export type Users = Selectable<UserTable>
export type NewUser = Insertable<UserTable>
export type UserUpdate = Updateable<UserTable>

export interface SocialMediaTable {
    id: Generated<number>
    user_id: number
    instagram_url: string
    linkedin_url: string
    portfolio_url: string
}

export type SocialMedia = Selectable<SocialMediaTable>
export type NewSocialMedia = Insertable<SocialMediaTable>
export type SocialMediaUpdate = Updateable<SocialMediaTable>

export interface ImageTable {
    id: Generated<number>
    user_id: number
    image_url: string
    upload_date: ColumnType<Date, string>
    is_favorite: boolean
}

export type Image = Selectable<ImageTable>
export type NewImage = Insertable<ImageTable>
export type ImageUpdate = Updateable<ImageTable>

export interface UserCategoryTable {
    id: Generated<number>
    category_id: number
    user_id: number
}

export type UserCategory = Selectable<UserCategoryTable>
export type NewUserCategory = Insertable<UserCategoryTable>
export type UserCategoryUpdate = Updateable<UserCategoryTable>

export interface CategoryTable {
    id: Generated<number>
    name: string
}

export type Category = Selectable<CategoryTable>
export type NewCategory = Insertable<CategoryTable>
export type CategoryUpdate = Updateable<CategoryTable>
