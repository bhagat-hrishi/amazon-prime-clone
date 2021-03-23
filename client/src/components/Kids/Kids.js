// react imports
import React,{useEffect} from 'react'

// normal components import
import Banner from "../Banner/Banner";
import MainNav from "../MainNav/MainNav";
import Footer from "../Footer/Footer";
import Row from '../Rows/Row'
import {kidsrequests} from '../../APIS/kidsrequest'


const Kids=()=>{

    useEffect(()=>{
      document.title = 'Prime Video: Kids'
    },[])
    
    return (
      <React.Fragment>
          {/* navigation */}
          <MainNav/>
          {/* Kids Banner */}
          <Banner fetchUrl={kidsrequests[0].url} />
          {kidsrequests.map((SingleRow) => {
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
        {/*Footer  */}
        <Footer/>
      </React.Fragment>
    );
}

export default Kids
