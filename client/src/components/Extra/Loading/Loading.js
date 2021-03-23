import React from 'react'
import loadingGif from '../../../assets/gif/Loading.gif'

const Loading=()=>{
    
    return (
        <div style={
            {
                background:'#1b2530',
                textAlign:'center',
                position:'relative',
                top:'50px',
                height:'77vh',
                overflow:'hidden'
            }
        } >
           <img style={{
               paddingTop:'6rem'
           }} src={loadingGif} alt='Loading'/> 
        </div>
    )
}

export default Loading
