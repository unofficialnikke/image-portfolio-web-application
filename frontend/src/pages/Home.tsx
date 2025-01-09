import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../context/userContext'
import { FilterDialog } from '../components/FilterDialog'

const Home = () => {
    const [filter, setFilter] = useState(false)
    const { users } = useContext(UserContext)
    const [category, setCategory] = useState<string | null>(null)
    const filterOutAdmin = users?.filter(user => user.firstname !== 'admin')
    const filteredUsers = filterOutAdmin?.filter(user => category === null || user.categories.some(c => c.name === category))

    return (
        <div className='home' style={filteredUsers ? undefined : { justifyContent: 'center' }}>
            {
                filteredUsers ? (
                    <div className="profiles">
                        <button onClick={() => setFilter(true)} className='filterbutton'>Filter</button>
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map((user) => {
                                const userCategories = user.categories.filter(category => category.user_id === user.id)
                                const userImages = user.images.filter(i => i.user_id === user.id)
                                return (
                                    <div key={user.id}>
                                        <div className="header">
                                            <Link className='link' to={`/profile/${user.id}`}>
                                                <h2>{user.firstname} {user.lastname}</h2></Link>
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
                            })
                        ) : (
                            <form>
                                <h3>No profiles found with category: {category}</h3>
                            </form>
                        )}
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
            <FilterDialog isOpen={filter} setFilterDialog={setFilter} category={category} setCategory={setCategory} />
        </div>
    )
}

export default Home

