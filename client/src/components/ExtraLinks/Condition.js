import React,{useEffect} from 'react'
import { Link } from "react-router-dom";
import './ExtraShared.scss'

const Condition = ()=>{
  useEffect(() => {
    //   To change document title
    document.title = 'Conditions To use'
    }, [])
    
    return (
      <div className='extradiv'>
          <h1 className='extradiv__title' style={{color:'green'}}>No conditions </h1>
          <Link to="/" id="backto">Home</Link>
          <Link to="/signin" id="backto">SignIn</Link>
          <Link to="/signup" id="backto">SignUp</Link>
      </div>
    );
}
export default Condition
