import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../context/userContext'
import { images } from '../mockdata/data'
import { getUserCategoryByUserId } from '../requests/Category'
import { Category } from '../type'

const Home = () => {
    const { users } = useContext(UserContext);
    const [categories, setCategories] = useState<Category[]>([])

    useEffect(() => {
        const fetchCategory = async () => {
            const fetchedCategories = await getUserCategoryByUserId()
            if (fetchedCategories) {
                setCategories(fetchedCategories)
            }
        }
        fetchCategory()
    }, [])

    return (
        <div className='home'>
            {
                users && users.length > 0 ? (
                    <div className="profiles">
                        <button>Filter</button>
                        {users.map((user) => {
                            const userCategories = categories.filter(category => category.user_id === user.id);
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
                                        {images.map(image => (
                                            <div key={image.id}>
                                                <img src={image.src} />
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

