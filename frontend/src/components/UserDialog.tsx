import React, { useContext, useEffect, useState } from 'react'
import { Category, DeletedCategory, NewSocialMedia, SocialMedia, User } from '../type';
import { CategoryContext } from '../context/categoryContext';
import { addNewUserCategory, deleteUserCategory, getCategoryById } from '../requests/Category';
import { UserContext } from '../context/userContext';
import { addSocialMedia } from '../requests/SocialMedia';

type FilterProps = {
    setUserDialog: React.Dispatch<React.SetStateAction<boolean>>
    isOpen: boolean
    user: User | null
    setUser: React.Dispatch<React.SetStateAction<User | null>>
    socialMedias: SocialMedia | null
    fetchUserData: (userId: number) => Promise<void>
    userId: string
};

const UserDialog = ({ isOpen, setUserDialog, user, socialMedias, fetchUserData, userId }: FilterProps) => {
    const [socialMediaInputs, setSocialMediaInputs] = useState<NewSocialMedia>({
        user_id: 0,
        instagram_url: '',
        linkedin_url: '',
        portfolio_url: ''
    })

    const { categories } = useContext(CategoryContext)
    const [deleteCategoryId, setDeleteCategoryId] = useState('')
    const [newCategoryId, setNewCategoryId] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [message, setMessage] = useState<string | null>(null)
    const { setUserFetch } = useContext(UserContext)


    useEffect(() => {
        if (socialMedias && isOpen) {
            setSocialMediaInputs({
                user_id: socialMedias.user_id,
                instagram_url: socialMedias.instagram_url,
                linkedin_url: socialMedias.linkedin_url,
                portfolio_url: socialMedias.portfolio_url
            })
        }
    }, [socialMedias, isOpen])

    const handleSocialMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSocialMediaInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
        console.log(socialMediaInputs)
    }

    const handleAddSocialMedia = async (e: React.FormEvent, inputs: NewSocialMedia, id: number | null) => {
        e.preventDefault()
        if (id) {
            try {
                const result = await addSocialMedia(inputs, id)
                if (!result.success) {
                    console.log(result.data)
                } else {
                    console.log(result.data)
                    fetchUserData(Number(userId))
                    onClose()
                }
            } catch (err) {
                console.log('Error adding social medias: ', err)
            }
        }
    }

    const deleteCategory = async (id: number) => {
        if (!id) {
            setMessage(null)
            setError('Please select a category first!')
        } else {
            try {
                const result = await deleteUserCategory(id)
                if (!result.success) {
                    setMessage(null)
                    setError(result.data.toString())
                } else {
                    if (typeof result.data !== 'string') {
                        const { category_id } = result.data as DeletedCategory
                        const deletedCategory: Category = await (getCategoryById(category_id))
                        setMessage(`Deleted category: ${deletedCategory.name}`)
                        setError(null)
                        setDeleteCategoryId('')
                        fetchUserData(Number(userId))
                    }
                }
            } catch (err) {
                console.error('Error deleting category: ', err);
            }
        }
    }

    const addCategory = async (id: number, userId: number) => {
        if (!id) {
            setMessage(null)
            setError('Please select a category first!')
        } else {
            const inputs = ({
                user_id: userId,
                category_id: id
            })
            try {
                const result = await addNewUserCategory(inputs)
                console.log(newCategoryId)
                if (!result.success) {
                    setMessage(null)
                    setError(result.data)
                    console.log(result.data)
                } else {
                    const addedCategory: Category = await getCategoryById(id)
                    setMessage(`Added new category: ${addedCategory.name}`)
                    console.log(result.data)
                    setError(null)
                    setNewCategoryId('')
                    fetchUserData(userId)
                }
            } catch (err) {
                console.error('Error adding new category: ', err);
            }
        }
    }

    const onClose = () => {
        setUserDialog(false)
        setUserFetch(true)
        setError(null)
    }

    return (
        <>
            {isOpen && (
                <div className='modal'>
                    <div className='backshadow'>
                        <div className='custom-modal'>
                            <div className='user-dialog'>
                                <form>
                                    <h2>User information</h2>
                                    <h2>Delete and  categories</h2>
                                    {message && <p className='message'>{message}</p>}
                                    {error && <p>{error}</p>}
                                    <div className='category-container'>
                                        <div className='column'>
                                            <h3>Your categories</h3>
                                            <div className='custom-select'>
                                                <select value={deleteCategoryId} onChange={(e) => setDeleteCategoryId(e.target.value)} aria-placeholder='Select category'>
                                                    <option>Select category</option>
                                                    {user?.categories.map((category) => (
                                                        <option value={category.id} key={category.id}>{category.name}</option>
                                                    ))}
                                                </select>
                                                <a onClick={() => deleteCategory(Number(deleteCategoryId))}>Delete category</a>
                                            </div>
                                        </div>
                                        <div className='column'>
                                            <h3>Available categories</h3>
                                            <div className='custom-select'>
                                                <select value={newCategoryId} onChange={(e) => setNewCategoryId(e.target.value)} aria-placeholder='Select category'>
                                                    <option>Select category</option>
                                                    {categories?.map((category) => (
                                                        <option value={category.id} key={category.id}>{category.name}</option>
                                                    ))}
                                                </select>
                                                <button type='button' onClick={() => addCategory(Number(newCategoryId), Number(userId))}>+ Add category</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                                <form onSubmit={(e) => handleAddSocialMedia(e, socialMediaInputs, socialMedias?.id || null)}>
                                    <h3>Instagram URL:</h3>
                                    <input value={socialMediaInputs.instagram_url} name='instagram_url' onChange={handleSocialMediaChange}></input>
                                    <h3>LinkedIn URL:</h3>
                                    <input value={socialMediaInputs.linkedin_url} name='linkedin_url' onChange={handleSocialMediaChange}></input>
                                    <h3>Portfolio site URL:</h3>
                                    <input value={socialMediaInputs.portfolio_url} name='portfolio_url' onChange={handleSocialMediaChange}></input>
                                    <button className='save-button' type='submit'>Save</button>
                                </form>
                                <div className='close-button'>
                                    <button onClick={onClose}>Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
export default UserDialog

