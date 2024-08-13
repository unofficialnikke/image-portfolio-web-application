import { useEffect, useState } from 'react'
import useCarousel from '../hooks/useCarousel'
import { useParams } from 'react-router-dom'
import { getuserById } from '../requests/User'
import { Image, User } from '../type'
import UserDialog from '../components/UserDialog'
import IntroDialog from '../components/IntroDialog'
import ImageDialog from '../components/ImageDialog'
import { deleteImage, updateImage } from '../requests/Image'

const Profile = () => {
    const [userDialog, setUserDialog] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [introDialog, setIntroDialog] = useState(false)
    const [imageDialog, setImageDialog] = useState(false)
    const [user, setUser] = useState<User | null>(null)
    const imageUrls = user?.images.map(img => img.image_url)
    const { currentIndex, setCurrentIndex, prevSlide, nextSlide } = useCarousel(imageUrls!)
    const { userId } = useParams() as { userId: string }
    const socialMedias = user?.social_medias

    const fetchUserData = async (userId: string) => {
        const fetchedUser = await getuserById(userId)
        if (fetchedUser) {
            setUser(fetchedUser)
        }
    }

    useEffect(() => {
        fetchUserData(userId)
        console.log('fetch')
    }, [userId])

    const deleteSelectedImage = async (id: number) => {
        try {
            await deleteImage(id)
            fetchUserData(userId)
            if (currentIndex + 1 === imageUrls!.length) {
                setCurrentIndex(currentIndex - 1)
            }
        } catch (err) {
            console.error('Error deleting image:', err);
        }
    }

    const updateSelectedImage = async (id: number, isFavorite: boolean) => {
        console.log('update')
        try {
            const updateData: Partial<Image> = {
                user_id: Number(userId),
                is_favorite: !isFavorite,
            }
            const result = await updateImage(id, updateData)
            if (!result.success) {
                setError(result.data)
            } else {
                setError(null)
                console.log('Image updated succesfully!')
                fetchUserData(userId)
            }

        } catch (err) {
            console.error('Error updating image:', err);
        }
    }

    return (
        <div className='singlepage'>
            <div className="content">
                <div className="imageupload">
                    <button onClick={() => setImageDialog(true)}>+ Add images</button>
                </div>
                {error && <p className='error'>{error}</p>}
                <div className='carousel'>
                    <div className='image'>
                        <div className='slider-wrapper' style={{ transform: `translateX(${-100 * currentIndex}%)` }}>
                            {user?.images.map((image, index) => (
                                <div key={image.id} className='slide'>
                                    <a onClick={() => updateSelectedImage(image.id, image.is_favorite)}
                                        className={`favorite-button ${image.is_favorite ? 'favorite_active' : ''}`}>
                                        {image.is_favorite ? 'Unfavorite' : 'Favorite'}
                                    </a>
                                    <a onClick={() => deleteSelectedImage(image.id)} className='delete-button'>Delete</a>
                                    <img src={image.image_url} alt={`Slide ${index}`} />
                                </div>
                            ))}
                        </div>
                    </div>
                    <button className='img-slider-btn' style={{ left: 0 }} onClick={prevSlide}>&lt;</button>
                    <button className='img-slider-btn' style={{ right: 0 }} onClick={nextSlide}>&gt;</button>
                    <div className='slider-buttons'>
                        {user?.images.map((_, index) => (
                            <button
                                key={index}
                                className={index === currentIndex ? 'active' : ''}
                                onClick={() => setCurrentIndex(index)}
                            />
                        ))}
                    </div>
                </div>
                <form>
                    <div className='leftcontent'>
                        <div className="edit-button">
                            <a onClick={() => setUserDialog(true)}>(Edit)</a>
                        </div>
                        <div className='usercontent'>
                            <div className="username">
                                <h3>{user?.firstname} {user?.lastname}</h3>
                                <h4>{user?.city}</h4>
                                {user?.categories.length === 0 ? (
                                    <p>No categories</p>
                                ) : (
                                    <p>{user?.categories.map(category => category.name).join(', ')}</p>
                                )}

                            </div>
                            <hr />
                            {!user?.phone && !user?.email ? (
                                <div className="contact">
                                    <h3>Contact:</h3>
                                    <p>No Contacts</p>
                                </div>
                            ) : (
                                <div className="contact">
                                    <h3>Contact:</h3>
                                    <p>{user?.email}</p>
                                    <p>{user?.phone}</p>
                                </div>
                            )}

                            <hr />
                            <h3>Social media</h3>
                            {socialMedias ? (
                                <div className="socialmedia">
                                    <a>{socialMedias.instagram_url}</a>
                                    <a>{socialMedias.linkedin_url}</a>
                                    <a>{socialMedias.portfolio_url}</a>
                                </div>

                            ) : (
                                <div className="socialmedia">
                                    <p>No Social medias</p>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='rightcontent'>
                        <div className="edit-button">
                            <a onClick={() => setIntroDialog(true)}>(Edit)</a>
                        </div>
                        <h3>Introduction:</h3>
                        {user?.introduction_text ? (
                            <p>{user?.introduction_text}</p>
                        ) : (
                            <p>{user?.firstname} have not introduced themselves yet</p>
                        )}
                    </div>
                </form>
            </div>
            <UserDialog isOpen={userDialog} setUserDialog={setUserDialog} />
            <IntroDialog isOpen={introDialog} setIntroDialog={setIntroDialog} />
            <ImageDialog isOpen={imageDialog} setImageDialog={setImageDialog} fetchUserData={fetchUserData} userId={userId}
            />
        </div>
    )
}

export default Profile