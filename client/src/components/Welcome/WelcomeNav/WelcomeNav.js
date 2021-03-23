import React,{useRef,useContext} from 'react'
import { Link } from "react-router-dom";


// scss ,images,icon import
import './WelcomeNav.scss'
import logoimage from "../../../assets/images/prime-video-logo.png";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import {UserInfoContext} from '../../../UserContext'
const WelcomeNav =()=>{
    const [userInfo , setUserInfo] = useContext(UserInfoContext);
    const mobileNavRef = useRef(null)
    const openMobileNavHandler = () => {
        // console.log(mobileNavRef.current)
        mobileNavRef.current.style.width = "100%";
    };

    const closeMobileNavHandler = () => {
        mobileNavRef.current.style.width = "0%";
    };
    return (
        <>
            <div className="welcome">
                <div className="welcome__nav">
                    {/* Logo */}
                    <Link to="/" className="welcome__nav__logo">
                        <img
                        src={logoimage}
                        alt="Main logo"
                        className="animate__animated animate__lightSpeedInLeft"
                        ></img>
                    </Link>

                    {/*Navigation For Mobile View */}
                    <div className="welcome__nav__mobile-icon">
                        <button onClick={openMobileNavHandler}>
                        <AccountCircleIcon style={{ fontSize: 30 }} />
                        </button>
                        <div className="welcome_mobile-nav" ref={mobileNavRef}>
                        <h2 id="closeBtn" onClick={closeMobileNavHandler}>
                            &times;
                        </h2>
                        <Link to="/signin" className="mobile-link">
                            Sign In
                        </Link>
                        <Link to="/signup" className="mobile-link">
                            Sign Up
                        </Link>
                        <Link to='/home' className='mobile-link' onClick={()=>{
                            sessionStorage.setItem('Guest',true);
                        }}>
                            Guest
                        </Link>
                        </div>
                    </div>

                    {/* Navigation For Desktop*/}
                    <div className="welcome__nav__links">
                        <Link to="/signin" className="welcome__nav__link">
                        Sign In
                        </Link>
                        <Link to="/signup" className="welcome__nav__link">
                        Sign Up
                        </Link>
                        <Link to='/home' className='welcome__nav__link'  onClick={sessionStorage.setItem('Guest',true)}>
                        Guest
                        </Link>
                    </div>
                </div>
            </div>   
        </>
    )
}

export default WelcomeNav
