import React from 'react'
import {  useHistory } from "react-router-dom";
// scss and image import
import './Banners.scss'
import welcome1 from "../../../assets/images/welcome/welcome1.jpg";
import welcome2 from "../../../assets/images/welcome/welcome2.jpg";
import welcome3 from "../../../assets/images/welcome/welcome3.jpg";

const Banners = ()=>{

    const history = useHistory();

    const gotoHomeAsGuest =()=>{
        sessionStorage.setItem('Guest',true)
        history.push('/home');
    }

    return (
        <>
        {/* Banner 1 */}
            <div className="welcomebanner1">
                <div className="welcomebanner1__contet">
                    <h1 className="welcomebanner1__contet__title">
                        Welcome to Prime Video
                    </h1>
                    <br />
                    <p className="welcomebanner1__contet__decscription">
                        Join Prime to watch the latest movies, TV shows and
                        award-winning Amazon Originals
                    </p>
                    <br />
                    <button onClick={()=>{
                        alert('Try Loing as guest')
                    }}>Start your 30-day free trial</button>
                </div>
                <div className="welcomebanner1_img">
                    <img
                        src={welcome1}
                        alt="logo"
                        className="animate__animated animate__zoomIn"
                    ></img>
                </div>
            </div>
        
        {/* Banner 2*/}
            <div className="welcomebanner2">
                <div className="welcomebanner2__img">
                    <img
                        src={welcome2}
                        alt="welcome2"
                        className="animate__animated animate__zoomIn"
                    ></img>
                </div>
                <div className="welcomebanner2__content">
                    <h1 className="welcomebanner2__content__title">
                        Great Entertainment
                    </h1>
                    <br />
                    <p className="welcomebanner2__contet__decscription">
                        With your Prime membership, you have access to exclusive Amazon
                        Originals, blockbuster Bollywood movies, regional movies and
                        more.
                    </p>
                    <br />
                    <button onClick={gotoHomeAsGuest}>Get Started</button>
                </div>
            </div>
        {/* Banner 3 */}
        <div className="welcomebanner3">
            <div className="welcomebanner3__img">
                <img
                    src={welcome3}
                    alt="welcome3"
                    className="animate__animated animate__zoomIn"
                ></img>
            </div>
            <div className="welcomebanner3__line"></div>
            <div className="welcomebanner3__content">
                <h1 className="welcomebanner3__content__title">
                    Even better with Fire TV Stick
                </h1>
                <br />
                <p className="welcomebanner3__contet__decscription">
                    The biggest movies and TV shows are always better on a big
                    screen. Simply plug in your Amazon Fire TV Stick and stream on
                    any HDTV. Press the voice button on the remote and say the name
                    of the title you want to watch to find it in seconds.
                </p>
                <br />
                <button onClick={gotoHomeAsGuest}>Get Started</button>
            </div>
          </div>

          
        </>
    )
}

export default Banners
