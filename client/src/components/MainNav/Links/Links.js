import React from "react";
import { Link } from "react-router-dom";

import "./Links.scss";

import logoimage from "../../../assets/images/prime-video-logo.png";
import CloseIcon from '@material-ui/icons/Close';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const Links = ()=>{
	const openMobileLinksHanlder = ()=>{
		const mobileLinksNavElement = document.getElementById('mobile-links');
		// console.log(mobileLinksNavElement)
		mobileLinksNavElement.style.height = "100%";
	}
  const closeMobileLinksHandler = ()=>{
	document.getElementById('mobile-links').style.height = "0%";
  }


    return (
      <div className="links">
        <Link to="/home" className="links__main-logo">
          <img src={logoimage} alt="Main logo"></img>
        </Link>
        <div className='links-desktop'>
			<Link
				to="/home"
				className={`links__link`}
			>
				Home
			</Link>
			<Link
				to="/tvshows"
				className={`links__link`}
			>
				TvShows
			</Link>
			<Link
				to="/movies"
				className={`links__link`}
			>
				Movies
			</Link>
			<Link
				to="/kids"
				className={`links__link`}
				
			>
				Kids
			</Link>
        </div>
		<div className='mobile-nav'>
			
			<a  onClick={openMobileLinksHanlder} id="browselink">Browse<ArrowDropDownIcon style={{display:'inline'}}/></a>
			<div id="mobile-links">
				<CloseIcon onClick={closeMobileLinksHandler} id="closenav"/> 
				{/* <a onClick={closeMobileLinksHandler} id="closenav">CLOSE</a> */}
				<Link
					to="/home"
					className={`mobile-links__link`}
				>
					Home
				</Link>
				<Link
					to="/tvshows"
					className={`mobile-links__link`}
				>
					TvShows
				</Link>
				<Link
					to="/movies"
					className={`mobile-links__link`}
				>
					Movies
				</Link>
				<Link
					to="/kids"
					className={`mobile-links__link`}
				>
					Kids
				</Link>
			</div>
        </div>
      </div>
    );
}


export default Links;
