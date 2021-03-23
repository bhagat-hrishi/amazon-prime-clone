// react imports
import React,{useEffect} from "react";

// normal component import
import WelcomeNav from './WelcomeNav/WelcomeNav'
import Banners from './Banners/Banners'
import Features from "./Features/Features";
import WelcomeFooter from "./WelcomeFooter/WelcomeFooter";

// scss import
import "./Welcome.scss";

const Welcome = (props) => {
  useEffect(() => {
    //    change document title
    document.title = "Welcome to Prime Video";
  }, []);
  

  return (
    <React.Fragment>
      <WelcomeNav/>
      <Banners/>
      <Features/>
      <WelcomeFooter />
    </React.Fragment>
  );
};

export default Welcome;
