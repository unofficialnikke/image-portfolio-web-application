import React from 'react'
import Image1 from '../img/1.jpg'
import Image2 from '../img/2.jpg'
import Image3 from '../img/3.jpg'


const Profile = () => {


    return (
        <div className='singlepage'>
            <div className="content">
                <div className='image'>
                    <img src={Image1}></img>
                    <img src={Image2}></img>
                    <img src={Image3}></img>
                </div>
                <form>
                    <div className='leftcontent'>
                        <div className='usercontent'>
                            <div className="username">
                                <h2>John Cena</h2>
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