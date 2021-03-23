import React from 'react'
import {Link} from 'react-router-dom'

import pagenotfound from '../../assets/gif/pagenotfound.gif'

const PageNotFound = ()=>{
    return (
        <div>
            <Link 
                to='/' 
                style={
                    {   
                        color :'white',
                        display : 'block',
                        fontSize:'2rem',
                        textDecoration : 'none',
                        position: 'fixed',
                        zIndex : '2',
                        top : '20px',
                        right:'10%'
                    }
                } 
            
            >
                Home
            </Link>
            <img 
                src={pagenotfound}
                style={{width:'100vw',height:'100vh',objectFit:'contain',background:'black',position:'fixed'}}
            ></img>
        </div>
    )
}

export default PageNotFound
