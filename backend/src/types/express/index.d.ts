import express from "express";

interface User {
    id: number
    firstname: string
    lastname: string
    email: string
    password: string
    city: string
    phone: string | null
    introduction_text: string | null
    is_admin: boolean
}

declare global {
    namespace Express {
        interface Request {
            user?: Record<string, any>
        }
    }
}