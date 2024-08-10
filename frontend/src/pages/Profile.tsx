import { useEffect, useState } from 'react'
import useCarousel from '../hooks/useCarousel'
import { useParams } from 'react-router-dom'
import { getuserById } from '../requests/User'
import { User } from '../type'
import UserDialog from '../components/UserDialog'
import IntroDialog from '../components/IntroDialog'
import ImageDialog from '../components/ImageDialog'

const Profile = () => {
    const [userDialog, setUserDialog] = useState(false)
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

    const handleCloseUser = () => {
        setUserDialog(false)
    }

    const handleCloseIntro = () => {
        setIntroDialog(false)
    }

    useEffect(() => {
        fetchUserData(userId)
        console.log('fetch')
    }, [userId])

    return (
        <div className='singlepage'>
            <div className="content">
                <div className="imageupload">
                    <button onClick={() => setImageDialog(true)}>+ Add images</button>
                </div>
                <div className='carousel'>
                    <div className='image'>
                        <div className='slider-wrapper' style={{ transform: `translateX(${-100 * currentIndex}%)` }}>
                            {user?.images.map((image, index) => (
                                <div key={image.id} className='slide'>
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
            <UserDialog isOpen={userDialog} onClose={handleCloseUser} />
            <IntroDialog isOpen={introDialog} onClose={handleCloseIntro} />
            <ImageDialog isOpen={imageDialog} setImageDialog={setImageDialog} fetchUserData={fetchUserData} userId={userId}
            />
        </div>
    )
}

export default Profile