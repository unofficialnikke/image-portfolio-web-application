import { ChangeEvent, MouseEventHandler, useEffect, useState } from 'react'
import useCarousel from '../hooks/useCarousel'
import { useParams } from 'react-router-dom'
import { getuserById } from '../requests/User'
import { getUserCategoriesById } from '../requests/Category'
import { getSocialMediaById } from '../requests/SocialMedia'
import { User, Category, SocialMedia, Image } from '../type'
import { uploadImage, getImagesByUserId } from '../requests/Image'

const Profile = () => {
    const [file, setFile] = useState<File>()
    const [user, setUser] = useState<User | null>(null)
    const [userCategory, setUserCategory] = useState<Category[]>([])
    const [socialMedia, setSocialMedia] = useState<SocialMedia | null>(null)
    const [images, setImages] = useState<Image[]>([])
    const imageUrls = images.map(img => img.image_url)
    const { currentIndex, setCurrentIndex, prevSlide, nextSlide } = useCarousel(imageUrls)
    const { userId } = useParams() as { userId: string }

    const fetchImages = async (userId: string) => {
        const fetchedImages = await getImagesByUserId(userId)
        if (fetchedImages) {
            setImages(fetchedImages)
        }
    }

    useEffect(() => {
        const fetchUserData = async () => {
            const fetchedUser = await getuserById(userId)
            const fetchedUserCategory = await getUserCategoriesById(userId)
            const fetchedSocialMedias = await getSocialMediaById(userId)
            if (fetchedUser) {
                setUser(fetchedUser)
            }
            if (fetchedUserCategory) {
                setUserCategory(fetchedUserCategory)
            }
            if (fetchedSocialMedias) {
                setSocialMedia(fetchedSocialMedias)
            }
        }
        fetchUserData()
        fetchImages(userId)
    }, [userId])

    const handleUploadImage: MouseEventHandler<HTMLButtonElement> = async (e) => {
        e.preventDefault()
        if (!file) {
            return console.log('No File selected')
        }
        try {
            const data = await uploadImage(file, userId)
            if (data) {
                fetchImages(userId)
                return console.log('Image uploaded successfully:', data);
            }
        } catch (err) {
            console.log('Error uplaoding image: ', err)
        }
    }

    const selectedFile = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files![0]
        setFile(file)
    }

    return (
        <div className='singlepage'>
            <div className="content">
                <div className="imageupload">
                    <input
                        hidden={true}
                        type='file'
                        id='file'
                        name='myImage'
                        onChange={selectedFile}
                    >
                    </input>
                    <label style={{ textDecoration: 'underline', marginRight: '10px' }} htmlFor='file'>Select image</label>
                    <button onClick={handleUploadImage}>Submit</button>
                </div>
                <div className='carousel'>
                    <div className='image'>
                        <div className='slider-wrapper' style={{ transform: `translateX(${-100 * currentIndex}%)` }}>
                            {imageUrls.map((url, index) => (
                                <div key={index} className='slide'>
                                    <img src={url} alt={`Slide ${index}`} />
                                </div>
                            ))}
                        </div>
                    </div>
                    <button className='img-slider-btn' style={{ left: 0 }} onClick={prevSlide}>&lt;</button>
                    <button className='img-slider-btn' style={{ right: 0 }} onClick={nextSlide}>&gt;</button>
                    <div className='slider-buttons'>
                        {imageUrls.map((_, index) => (
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
                        <div className='usercontent'>
                            <div className="username">
                                <h3>{user?.firstname} {user?.lastname}</h3>
                                <h4>{user?.city}</h4>
                                {userCategory.length === 0 ? (
                                    <p>No categories</p>
                                ) : (
                                    <p>{userCategory.map(category => category.name).join(', ')}</p>
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
                            {socialMedia?.id ? (
                                <div className="socialmedia">
                                    <a>{socialMedia.instagram_url}</a>
                                    <a>{socialMedia.linkedin_url}</a>
                                    <a>{socialMedia.portfolio_url}</a>
                                </div>
                            ) : (
                                <div className="socialmedia">
                                    <p>No Social medias</p>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='rightcontent'>
                        <h3>Introduction:</h3>
                        {user?.introduction_text ? (
                            <p>{user?.introduction_text}</p>
                        ) : (
                            <p>{user?.firstname} have not introduced themselves yet</p>
                        )}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Profile