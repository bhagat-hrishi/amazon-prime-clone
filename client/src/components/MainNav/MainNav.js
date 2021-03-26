import React,{useState,useContext, useEffect} from 'react';
import {Link} from 'react-router-dom'

import Links from './Links/Links';


// scss , icon , context import 
import './MainNav.scss'
import SearchSharpIcon from "@material-ui/icons/SearchSharp";
import AccountCircleSharpIcon from "@material-ui/icons/AccountCircleSharp";
import CancelIcon from '@material-ui/icons/Cancel';
import {UserInfoContext} from '../../UserContext'

const MainNav = ()=>{

  const [userInfo , setUserInfo] = useContext(UserInfoContext);
  const [ isMyLinksVisible , setVisibilityOfMyLinks] = useState(true);

  // console.log('main Nav',userInfo);
  const searchClickHandler = ()=>{
    if(window.innerWidth > 1000)
      return ;
    const mainNavRightElement = document.getElementById('MainNavigationRight');
    const searchFormElement = document.getElementById('searchform');
    const searchbarElement = document.getElementById('searchbar');
    const userAccountButtonElement = document.getElementById('userAccountButton');
    if(isMyLinksVisible == false)
    {
      setVisibilityOfMyLinks(true);
      mainNavRightElement.style.width = "35%";
      // searchFormElement.style.width="30%";
      searchbarElement.style.width = "0%";
      userAccountButtonElement.style.visibility="visible";
      // userAccountButtonElement.style.display = "inline-block"
    }
    else 
    {
      setVisibilityOfMyLinks(false);
      mainNavRightElement.style.width = "100%";
      searchFormElement.style.width="100%";
      searchbarElement.style.width = "100%";
      userAccountButtonElement.style.visibility="hidden";
      // userAccountButtonElement.style.display = "none"
    }
  }

  const userAccountClickhandler = ()=>{
    const screenWidth = screen.width;
    const userinfoDivElement = document.getElementById('userinfoDiv');
    if(screenWidth > 1000)
      userinfoDivElement.style.width = '20%';
    else if(screenWidth >700)
      userinfoDivElement.style.width = '30%';
    else 
        userinfoDivElement.style.width = '100%';
      
      
  }

	const cancelUserInfoDiv = ()=>{
		document.getElementById('userinfoDiv').style.width = '0%';
	}
  
  return (
      <div className="main-nav" >
        {/*My Links */}
        {isMyLinksVisible ? <Links  id='mylinks' /> : null}
        <div className="main-nav__right" id='MainNavigationRight'>
          {/* Seach Bar */}
          <form className="main-nav__right__search-form" id='searchform' onSubmit={(event)=>{
              event.preventDefault();
              alert('This service is not available');
          }} >
            <SearchSharpIcon
              onClick={searchClickHandler}
              className="main-nav__right__search-form__search-icon"
              style={{ fontSize: 40 }}
              id="searchicon"
            
            />
            <input
              type="text"
              placeholder="Search"
              name="search"
              id="searchbar"
              className="main-nav__right__search-form__search-input"
            ></input>
          </form>
          {/* Watchig user */}
          <button className="main-nav__right__account" id='userAccountButton' onClick={userAccountClickhandler}>
            <AccountCircleSharpIcon
              style={{ fontSize: 40, color: "primary" }}
              className="main-nav__right__account__logo"
            >
            </AccountCircleSharpIcon>
            {/* <p className="main-nav__right__account__name">{shortname}</p> */}
          </button>

		  {/* user info */}
          <div id='userinfoDiv'>
                <h3>{sessionStorage.getItem('Guest') ? 'Guest' : sessionStorage.getItem('name')}</h3>
                {/* {console.log(userInfo)} */}
                <hr/>
                {
                  sessionStorage.getItem('Guest') ? null :  <Link className='userinfoDiv__link' to='/watchlist'>Your watchlist </Link>
                }
                <Link className='userinfoDiv__link' to='/signin'  onClick={()=>{sessionStorage.clear()}} >Account settings</Link>
                <Link className='userinfoDiv__link' to='/help'>Help</Link>
                <Link className='userinfoDiv__link' to='/' onClick={()=>{sessionStorage.clear()}}>Sign out</Link>
                <CancelIcon id='canceluserinfoDiv' fontSize='large' onClick={cancelUserInfoDiv} />
          </div>
        </div>
      </div>
    );
}


export default MainNav