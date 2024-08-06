import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../context/userContext'
import { getUserCategories } from '../requests/Category'
import { Category, Image } from '../type'
import { getImages } from '../requests/Image'

const Home = () => {
    const { users } = useContext(UserContext);
    const [categories, setCategories] = useState<Category[]>([])
    const [image, setImage] = useState<Image[]>([])

    useEffect(() => {
        const fetchCategory = async () => {
            const fetchedCategories = await getUserCategories()
            const fetchedImages = await getImages()
            if (fetchedCategories) {
                setCategories(fetchedCategories)
            }
            if (fetchedImages) {
                setImage(fetchedImages)
                console.log(image)
            }
        }
        fetchCategory()
    }, [])

    return (
        <div className='home'>
            {
                users ? (
                    <div className="profiles">
                        <button>Filter</button>
                        {users.map((user) => {
                            const userCategories = categories.filter(category => category.user_id === user.id)
                            const userImages = image.filter(i => i.user_id === user.id).slice(0, 3)
                            return (
                                <div key={user.id}>
                                    <div className="header">
                                        <Link className='link' to={`/profile/${user.id}`}><h2>{user.firstname} {user.lastname}</h2></Link>
                                        <h4>{user.city}</h4>
                                    </div>
                                    <div className='category'>
                                        {userCategories.length === 0 ? (
                                            <p>No categories</p>
                                        ) : (
                                            <p>{userCategories.map(category => category.name).join(', ')}</p>
                                        )}
                                    </div>
                                    <hr />
                                    <div className='image'>
                                        {userImages.map(image => (
                                            <div key={image.id} className="image-container">
                                                <img src={image.image_url} alt={`Image ${image.id}`} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                ) : (
                    <div className="profiles">
                        <form>
                            <h1>Oh no!</h1>
                            <h4>Profiles cannot be loaded...</h4>
                        </form>
                    </div>
                )
            }
        </div>
    )
}

export default Home

