import React,{useEffect} from 'react'
import MainNav from "../MainNav/MainNav";
import Footer from "../Footer/Footer";
import Banner from "../Banner/Banner";


import Row from '../Rows/Row'
import {moviesrequest} from '../../APIS/moviesrequest'

const Movies=()=>{
    useEffect(()=>{
        document.title = 'Prime Video: Movies'
      },[])
    return (
        <React.Fragment>
            <MainNav/>
            <Banner fetchUrl={moviesrequest[0].url} />
            {moviesrequest.map((SingleRow) => {
                // console.log(SingleRow);
                return (
                <Row
                    key={SingleRow.title}
                    title={SingleRow.title}
                    fetchUrl={SingleRow.url}
                    mediaType={SingleRow.media}
                />
                );
            })}
            <Footer/>
        </React.Fragment>
    )
}

export default Movies
