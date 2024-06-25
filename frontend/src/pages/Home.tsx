import React from 'react'
import { profiles } from '../mockdata/data'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div className='home'>
            <div className="profiles">
                <button>Filter</button>
                {profiles.map(profile => (
                    <div key={profile.id}>
                        <div className="header">
                            <Link className='link' to={`/profile/${profile.id}`}><h2>{profile.firstname} {profile.lastname}</h2></Link>
                            <h4>{profile.city}</h4>
                        </div>
                        <div className='category'>
                            {profile.categories.map((category, index) => (
                                <div key={index}>
                                    <p>{category},</p>
                                </div>
                            ))}
                        </div>
                        <hr />
                        <div className='image'>
                            {profile.images.map(image => (
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