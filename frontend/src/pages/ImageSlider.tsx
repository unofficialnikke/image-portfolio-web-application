import { useContext, useState } from 'react'
import { deleteImage, updateImage } from '../requests/Image'
import useCarousel from '../hooks/useCarousel'
import { User, Image } from '../type'
import { UserContext } from '../context/userContext'
import { AuthContext } from '../context/authContext'

type SliderProps = {
    fetchUserData: (userId: number) => Promise<void>
    userId: string
    user: User
}

export const ImageSlider = ({ fetchUserData, userId, user }: SliderProps) => {
    const imageUrls = user?.images.map(img => img.image_url)
    const { currentIndex, setCurrentIndex, prevSlide, nextSlide } = useCarousel(imageUrls || [])
    const { setUserFetch } = useContext(UserContext)
    const { currentUser } = useContext(AuthContext)
    const [error, setError] = useState<string | null>(null)

    const deleteSelectedImage = async (id: number) => {
        try {
            const result = await deleteImage(id)
            if (result) {
                console.log(result.data)
                fetchUserData(Number(userId))
                setUserFetch(true)
            }
            if (currentIndex + 1 === imageUrls!.length) {
                setCurrentIndex(currentIndex - 1)
            }
        } catch (err) {
            console.error('Error deleting image: ', err);
        }
    }

    const updateSelectedImage = async (id: number, isFavorite: boolean) => {
        try {
            const updateData: Partial<Image> = {
                user_id: currentUser?.id,
                is_favorite: !isFavorite,
            }
            const result = await updateImage(id, updateData)
            if (!result.success) {
                setError(result.data)
            } else {
                setUserFetch(true)
                setError(null)
                fetchUserData(Number(userId))
            }

        } catch (err) {
            console.error('Error updating image:', err);
        }
    }

    return (
        <>
            {error && <p className='error'>{error}</p>}
            <div className='carousel'>
                <div className='image'>
                    <div className='slider-wrapper' style={{ transform: `translateX(${-100 * currentIndex}%)` }}>
                        {user?.images.map((image, index) => (
                            <div key={image.id} className='slide'>
                                {currentUser?.id === Number(userId) &&
                                    <div>
                                        <a onClick={() => updateSelectedImage(image.id, image.is_favorite)}
                                            className={`favorite-button ${image.is_favorite ? 'favorite_active' : ''}`}>
                                            {image.is_favorite ? 'Unfavorite' : 'Favorite'}
                                        </a>
                                        <a onClick={() => deleteSelectedImage(image.id)} className='delete-button'>Delete</a>
                                    </div>}

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
        </>
    )
}
