import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../context/userContext'
import { images, categories } from '../mockdata/data'

const Home = () => {
    const { users } = useContext(UserContext);

    return (
        <div className='home'>
            <div className="profiles">
                <button>Filter</button>
                {users.map((user) => (
                    <div key={user.id}>
                        <div className="header">
                            <Link className='link' to={`/profile/${user.id}`}><h2>{user.firstname} {user.lastname}</h2></Link>
                            <h4>{user.city}</h4>
                        </div>
                        <div className='category'>
                            {categories.map(category => (
                                <div key={category.id}>
                                    <p>{category.name}, </p>
                                </div>
                            ))}
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
                ))}

            </div>

        </div>
    )
}

export default Home

