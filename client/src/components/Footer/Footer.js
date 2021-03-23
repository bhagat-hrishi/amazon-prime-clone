import React from 'react';
import {Link} from 'react-router-dom'
import amazonlogo from '../../assets/images/prime-video-logo.png'

import './Footer.scss'
const Footer = ()=>{
    return(
        <div className='Footer'>
            <div className='FooterLogoContainer'>
                <img src={amazonlogo} alt='Amazon Prime Logo' className='FooterLogo'></img>
            </div>            
            <div className='FooterInfo'>
                <Link to='/privacy'>Terms and Privacy Notice</Link>
                <Link to='/feedback'>Send us feedback/Suggestion</Link>
                <a href="https://github.com/bhagat-hrishi/amazon-prime-clone" target='_blank' rel='noreferrer'>Feel Free To copy &#169;</a>
            </div>
        </div>
        
    )
}

export default Footer;