import React from 'react'
import useCarousel from '../hooks/useCarousel'
import Image1 from '../img/1.jpg'
import Image2 from '../img/2.jpg'
import Image3 from '../img/3.jpg'
import Image4 from '../img/4.jpg'
import Image5 from '../img/5.jpg'
import Image6 from '../img/6.jpg'


const Profile = () => {
    const images = [Image1, Image2, Image3, Image4, Image5, Image6]
    const { currentIndex, prevSlide, nextSlide, getImageIndex } = useCarousel(images)

    return (
        <div className='singlepage'>
            <div className="content">
                <button>Edit profile</button>
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
                                <h3>John Cena</h3>
                                <h4>Helsinki</h4>
                                <p>portraits, sports, nature</p>
                            </div>
                            <hr />
                            <div className="contact">
                                <h3>Contact:</h3>
                                <p>email@email.com</p>
                                <p>+358 12343565</p>
                            </div>
                            <hr />
                            <div className="socialmedia">
                                <h3>Social media</h3>
                                <a>Instagram</a>
                                <a>LinkedIn</a>
                                <a>Portfolio.com</a>
                            </div>

                        </div>
                    </div>
                    <div className='rightcontent'>
                        <h3>Introduction:</h3>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Commodi rerum facere dolore dicta beatae ea deleniti delectus necessitatibus laborum molestiae asperiores, totam, ducimus cum minus repellat consectetur veritatis maxime quis!
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sit recusandae exercitationem asperiores molestias. Aspernatur praesentium asperiores quasi, tempore minus voluptatem cumque? Cupiditate exercitationem earum impedit repellendus necessitatibus amet ipsa nisi!
                        </p>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Commodi rerum facere dolore dicta beatae ea deleniti delectus necessitatibus laborum molestiae asperiores, totam, ducimus cum minus repellat consectetur veritatis maxime quis!
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sit recusandae exercitationem asperiores molestias. Aspernatur praesentium asperiores quasi, tempore minus voluptatem cumque? Cupiditate exercitationem earum impedit repellendus necessitatibus amet ipsa nisi!
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Profile