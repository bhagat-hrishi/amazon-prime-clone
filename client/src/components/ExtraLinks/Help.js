import React,{useEffect} from 'react'
import { Link } from "react-router-dom";


import './ExtraShared.scss'

const Help = ()=> {
  useEffect(() => {
    //   To change document title
    document.title = 'Help'
    }, [])
    return (
      <div className='extradiv'>
        <h1  className='extradiv__title'>Contact Me On LinkedIn</h1>
        <a
          href="https://www.linkedin.com/in/hrishikeshbhagat"
          target="_blank"
          rel="noreferrer"
          id="linkedin"
        >  
        Go To LinkedIn
        </a>
        <br/>
        <Link to="/" id="backto">Home</Link>
          <Link to="/signin" id="backto">SignIn</Link>
          <Link to="/signup" id="backto">SignUp</Link>
      </div>
    );
}

export default Help
