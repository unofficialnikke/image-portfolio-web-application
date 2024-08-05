import { useEffect, useState } from 'react'
import useCarousel from '../hooks/useCarousel'
import Image1 from '../img/1.jpg'
import Image2 from '../img/2.jpg'
import Image3 from '../img/3.jpg'
import Image4 from '../img/4.jpg'
import Image5 from '../img/5.jpg'
import Image6 from '../img/6.jpg'
import { useParams } from 'react-router-dom'
import { getuserById } from '../requests/User'
import { getUserCategoriesById } from '../requests/Category'
import { getSocialMediaById } from '../requests/SocialMedia'
import { User, Category, SocialMedia } from '../type'

const Profile = () => {
    const images = [Image1, Image2, Image3, Image4, Image5, Image6]
    const { currentIndex, prevSlide, nextSlide, getImageIndex } = useCarousel(images)
    const [user, setUser] = useState<User | null>(null)
    const [userCategory, setUserCategory] = useState<Category[]>([])
    const [socialMedia, setSocialMedia] = useState<SocialMedia | null>(null)
    const { userId } = useParams() as { userId: string }

    useEffect(() => {
        const fetchUsers = async () => {
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
        fetchUsers()
    }, [userId])

    return (
        <div className='singlepage'>
            <div className="content">
                <button className='b'>Edit profile</button>
                <div className='carousel'>
                    <button onClick={prevSlide}>&lt;</button>
                    <div className="image-container">
                        <img
                            src={images[getImageIndex(currentIndex)]}
                        />
                        <img
                            src={images[getImageIndex(currentIndex + 1)]}
                        />
                        <img
                            src={images[getImageIndex(currentIndex + 2)]}
                        />
                    </div>
                    <button onClick={nextSlide}>&gt;</button>
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
                            <div className="contact">
                                <h3>Contact:</h3>
                                <p>{user?.email}</p>
                                <p>{user?.phone}</p>
                            </div>
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