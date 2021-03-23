import React,{useState,useEffect,useContext} from 'react'


import axios from 'axios'

// normal components import

import MainNav from "../MainNav/MainNav";
import Footer from "../Footer/Footer";



import './Watchlist.scss'
import WList from './WList/WList';
const Watchlist = ()=>{


    const [istvActive,setTvActive]=useState(true);
    useEffect(()=>{
        document.title ='Prime Video:Your Watchlist'
    },[])
    

    const tvShowsComponentHandler = ()=>{
        if(!istvActive)
        setTvActive(true);

    }   
    const moviesComponentHandler = ()=>{
        if(istvActive)
        setTvActive(false);

    }
    return (
       <React.Fragment>
           <MainNav/>
           <div className='watchlist'>
               <h4 className='watchlist__title'>Watchlist</h4>

               <a href='#tvwatchlist' className='watchlist__link' onClick={tvShowsComponentHandler} >Tv Shows</a>
               <a href='#moviewatchlist' className='watchlist__link'onClick={moviesComponentHandler} >Movies</a>
               {
                   istvActive ? <WList mediaType='tv'/> : <WList mediaType='movie' />
               }
           </div>
           <Footer/>
       </React.Fragment>
    )
}

export default Watchlist
