import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../context/userContext'

const Home = () => {
    const { users } = useContext(UserContext);

    return (
        <div className='home'>
            {
                users ? (
                    <div className="profiles">
                        <button>Filter</button>
                        {users.map((user) => {
                            const userCategories = user.categories.filter(category => category.user_id === user.id)
                            const userImages = user.images.filter(i => i.user_id === user.id)
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
                                        {userImages.filter(image => image.is_favorite === true).map(image => (
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

