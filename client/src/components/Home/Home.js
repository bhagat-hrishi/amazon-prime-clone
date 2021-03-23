// react imports
import React from "react";
import {useEffect } from 'react'

// normal components import
import Banner from "../Banner/Banner";
import MainNav from "../MainNav/MainNav";
import Footer from "../Footer/Footer";
import Row from "../Rows/Row";

import ByLanguage from '../ByLanguage/ByLanguage'
import {requests} from "../../APIS/requests";

// scss import
import "./Home.scss";


const Home = () => {
    useEffect(() => {
      document.title = 'Prime Video: Home'
    }, [])
    
  return (
    < React.Fragment>
      {/* nvigatiom */}
      <MainNav />
      {/* Home banner */}
      <Banner fetchUrl={requests[0].url} />
        {/* Rows */}
        <div className="Home">
          {requests.map((SingleRow) => {
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
        </div>
      {/*  language component */}
      <ByLanguage />
      {/* footer */}
      <Footer />
    </ React.Fragment>
  );
};

export default Home;
