import { Response, Request } from "express"
import { createUser, findByUserEmail, countUsers } from "../repositories/userRepository"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { createSocialMedia } from "../repositories/socialMediaRepository"

export const register = async (req: Request, res: Response) => {
    try {
        const { firstname, lastname, email, city, phone, introduction_text, is_admin } = req.body
        const existingUser = await findByUserEmail(email)
        if (existingUser) {
            return res.status(409).json('User already exists!')
        }
        const userCount = await countUsers()
        if (userCount >= 100) {
            return res.status(403).json('User limit of this app reached. No new registrations are currently allowed.')
        }
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password, salt)
        const newUser = {
            firstname,
            lastname,
            email,
            password: hash,
            city,
            phone: phone || null,
            introduction_text,
            is_admin: false
        }
        const insertedUser = await createUser(newUser)
        const newSocialMedia = {
            user_id: insertedUser.id,
            instagram_url: '',
            linkedin_url: '',
            portfolio_url: ''
        }
        await createSocialMedia(newSocialMedia)
        return res.status(201).json(insertedUser)
    } catch (err) {
        console.error('Error during user registration:', err);
        return res.status(500).json('An error occurred');
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body
        const user = await findByUserEmail(email)
        if (!user) {
            return res.status(404).json('User not found!')
        }

        const isPasswordCorrect = bcrypt.compareSync(password, user.password)
        if (!isPasswordCorrect) {
            return res.status(400).json('Wrong email or password!')
        }
        const tokenExpiration = 7 * 24 * 60 * 60 * 1000
        const token = jwt.sign({ id: user.id, is_admin: user.is_admin }, process.env.JWT_SECRET as string, { expiresIn: tokenExpiration / 1000 })
        const { password: _, ...userData } = user
        res.cookie('accessToken', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            maxAge: tokenExpiration,
        }).status(200).json({ ...userData, expiration: Date.now() + tokenExpiration })
    } catch (err) {
        console.error('Error during login:', err)
        return res.status(500).json('An error occurred')
    }
}

export const logout = (req: Request, res: Response) => {
    res.clearCookie('accessToken', {
        sameSite: 'none',
        secure: true
    }).status(200).json('User has been logged out!')
}