import React,{useEffect} from "react";
import Banner from "../Banner/Banner";
import MainNav from "../MainNav/MainNav";
import Footer from "../Footer/Footer";
import Row from '../Rows/Row'

import {tvrequests} from '../../APIS/tvrequest'

const TvShows = () => {
  
  useEffect(()=>{
    document.title = 'Prime Video: TV Shows'
  },[])
  return (
    
    <React.Fragment>
        <MainNav/>
        <Banner fetchUrl={tvrequests[0].url} />
        {tvrequests.map((SingleRow) => {
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
  );
};

export default TvShows;
