import React,{useEffect} from 'react'
import { Link } from "react-router-dom";

import './ExtraShared.scss'

function Privacy() {
  useEffect(() => {
    //   To change document title
    document.title = 'Privacy🔒'
    }, [])

    return (
      <div className='extradiv'>
        <h1 className='extradiv__title'>
        🙏 Please  <span style={{color:'red'}}>Do Not</span> Share your original information such as original email and
          original mobile no.
        </h1>
        <Link to="/" id="backto">Home</Link>
          <Link to="/signin" id="backto">SignIn</Link>
          <Link to="/signup" id="backto">SignUp</Link>
      </div>
    );
}
export default Privacy
