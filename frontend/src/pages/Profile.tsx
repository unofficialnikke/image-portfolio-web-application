import { Fragment, useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getuserById, updateUser } from '../requests/User'
import { User } from '../type'
import UserDialog from '../components/UserDialog'
import ImageDialog from '../components/ImageDialog'
import { UserContext } from '../context/userContext'
import { AuthContext } from '../context/authContext'
import { isValidUrl } from '../utils/Validation'
import ErrorPage from './ErrorPage'
import { ImageSlider } from './ImageSlider'

const Profile = () => {
    const [userDialog, setUserDialog] = useState(false)
    const [imageDialog, setImageDialog] = useState(false)
    const [user, setUser] = useState<User | null>(null)
    const { setUserFetch } = useContext(UserContext)
    const { currentUser } = useContext(AuthContext)
    const { userId } = useParams() as { userId: string }
    const socialMedias = user?.social_medias || null
    const navigate = useNavigate();
    const [editIntroduction, setEditIntroduction] = useState(false)
    const [introText, setIntroText] = useState<Partial<User> | null>({
        introduction_text: ''
    })

    const fetchUserData = async (userId: number) => {
        const fetchedUser = await getuserById(Number(userId))
        if (fetchedUser.success) {
            setUser(fetchedUser.data as User)
        }
    }

    useEffect(() => {
        fetchUserData(Number(userId))
        console.log('fetch')
    }, [user?.introduction_text, userId])

    const handleUpdateUser = async (introText: Partial<User> | null, id: number) => {
        if (introText && id) {
            try {
                const result = await updateUser(id, introText)
                if (!result.success) {
                    console.log(result.data)
                } else {
                    setUserFetch(true)
                    setEditIntroduction(false)
                    console.log(result.data)
                    fetchUserData(Number(userId))
                }

            } catch (err) {
                console.error('Error updating image:', err);
            }
        }
    }

    const handleIntroTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setIntroText({ ...introText, introduction_text: e.target.value });
    };

    const openEditIntroduction = () => {
        setEditIntroduction(true)
        setIntroText({
            introduction_text: user?.introduction_text
        })
    }

    return (
        <>
            {user ? (
                <div className='singlepage'>
                    <div className="content">
                        <div className="button-row">
                            <button className='back-button' onClick={() => navigate('/')}>Back</button>
                            {currentUser?.id === Number(userId) &&
                                <button className='imageupload' onClick={() => setImageDialog(true)}>+ Add images</button>
                            }
                        </div>
                        <ImageSlider fetchUserData={fetchUserData} userId={userId} user={user} />
                        <form>
                            <div className='leftcontent'>
                                {currentUser?.id === Number(userId) &&
                                    <div className="edit-button">
                                        <a onClick={() => setUserDialog(true)}>(Edit)</a>
                                    </div>}
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
                                    {socialMedias && (isValidUrl(socialMedias.instagram_url) || isValidUrl(socialMedias.linkedin_url) || isValidUrl(socialMedias.portfolio_url)) ? (
                                        <div className="socialmedia">
                                            {isValidUrl(socialMedias.instagram_url) &&
                                                <a href={socialMedias.instagram_url}>Instagram</a>}
                                            {isValidUrl(socialMedias.linkedin_url) &&
                                                <a href={socialMedias.linkedin_url}>LinkedIn</a>}
                                            {isValidUrl(socialMedias.portfolio_url) &&
                                                <a href={socialMedias.portfolio_url}>Portfolio</a>}
                                        </div>
                                    ) : (
                                        <div className="socialmedia">
                                            <p>No Social medias</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className='rightcontent'>
                                {currentUser?.id === Number(userId) &&
                                    <div className="edit-button">
                                        {editIntroduction ? (
                                            <div className='save'>
                                                <a onClick={() => setEditIntroduction(false)}>(Cancel)</a>
                                                <a onClick={() => handleUpdateUser(introText, Number(userId))}>(Save)</a>
                                            </div>
                                        ) : (
                                            <div>
                                                <a onClick={openEditIntroduction}>(Edit)</a>
                                            </div>
                                        )}
                                    </div>}
                                <h3>Introduction:</h3>
                                {editIntroduction ? (
                                    <textarea value={introText?.introduction_text || ''} onChange={handleIntroTextChange}></textarea>
                                ) : (
                                    (user?.introduction_text ? (
                                        <p>{user?.introduction_text.split('\n').map((item, key) => (
                                            <Fragment key={key}>
                                                {item}
                                                <br />
                                            </Fragment>
                                        ))}</p>
                                    ) : (
                                        <p>{user?.firstname} have not introduced themselves yet</p>
                                    ))
                                )}

                            </div>
                        </form>

                    </div>
                    <UserDialog isOpen={userDialog} setUserDialog={setUserDialog} user={user || null} setUser={setUser}
                        socialMedias={socialMedias || null} fetchUserData={fetchUserData} userId={userId} />
                    <ImageDialog isOpen={imageDialog} setImageDialog={setImageDialog} fetchUserData={fetchUserData} userId={currentUser?.id.toString() || ''}
                    />
                </div>
            ) : (
                <ErrorPage />
            )}
        </>
    )
}

export default Profile