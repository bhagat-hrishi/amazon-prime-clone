// react import
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
// normal components
import MainNav from "../../MainNav/MainNav";
import Footer from "../../Footer/Footer";
import Loading from '../../Extra/Loading/Loading'
// api imports
import {languageRequest} from "../../../APIS/requests";
import myLanguageMap from '../../../APIS/myLanguageMapping'
import myaxios from "../../../APIS/myaxios";

// css imports
import "./SpecificLanguage.scss";
import imgNotFound from "../../../assets/images/img_not_found.png";
// image url start declaration
let img_url_start = "https://image.tmdb.org/t/p/original/";
// declaring variables
let selectedLanguage;

const SpecificLanguage = (props) => {
  const [moviesForSpecificLanguage, setMovies] = useState([]);
  const [isfetched, setIsFetched] = useState(false);

  // This will execute only once
  useEffect(() => {
    //    console.log(props.match.params);
    selectedLanguage = props.match.params.languageselected;
    async function fetchData() {
      const request = await myaxios.get(
        `${languageRequest.url}=${selectedLanguage}`
      );
      // console.log("data", request.data.results);
      setMovies(request.data.results);
      setIsFetched(true);
    }
    fetchData();
  }, []);

  const history = useHistory();
  const goToWatchComponentHandler =(event)=>{
        // console.log('clicked: ',event.target.alt)
      let videoIdToWatch = event.target.alt;
      history.push(`/watchmovie/${videoIdToWatch}`);
  }
  //   Functio to check if image is exist
  const getImage = (imgObject) => {
    if (imgObject.backdrop_path) {
      return `${img_url_start}${imgObject.backdrop_path}`;
    } else if (imgObject.poster_path) {
      return `${img_url_start}${imgObject.poster_path}`;
    }
    return imgNotFound;
  };
  selectedLanguage =props.match.params.languageselected
  return (
    <React.Fragment>
      <MainNav />
      {
        isfetched ? 
        <div className="specific-language">
        {/* language title */}
        <h2 id='specific-language__languagename'>{myLanguageMap.get(selectedLanguage)} </h2>
        <br />
        <br />
        <hr style={{marginTop:'40px' ,color:'#425265'}} />
        <div className="specific-language__movie-container">
          {moviesForSpecificLanguage.map((movieItem) => {
            return (
              <div key={movieItem.id} className="single-movie-item">
                <img
                  src={getImage(movieItem)}
                  alt={movieItem.id}
                  title={movieItem.title}
                  onClick={goToWatchComponentHandler}
                />
                <p className="single-movie-item__title"  >{movieItem.title}</p>
              </div>
            );
          })}
        </div>
      </div> : <Loading/>
      }
      <Footer/>
    </React.Fragment>
  );
};

export default SpecificLanguage;
