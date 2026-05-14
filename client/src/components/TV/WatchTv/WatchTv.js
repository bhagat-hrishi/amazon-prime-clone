// react import
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../../../config';

// api import
import API_KEY from '../../../APIS/tmdbapikey'
import myaxios from '../../../APIS/myaxios'

// normal import
import MainNav from '../../MainNav/MainNav'
import Row from '../../Rows/Row'
import Footer from '../../Footer/Footer'
import WatchItemDetails from '../../WatchItemDetails/WatchItemDetails'
import Loading from '../../Extra/Loading/Loading';

// materialui imports
import ChatSharpIcon from '@material-ui/icons/ChatSharp';
import Button from '@material-ui/core/Button';
import PlayArrowSharpIcon from '@material-ui/icons/PlayArrowSharp';
import AddSharpIcon from '@material-ui/icons/AddSharp';

// scss import 
import './WatchTv.scss'

// image import and toast
import img_not_found from '../../../assets/images/img_not_found.png'
import Episode from '../Episode/Episode';
import TvDetails from '../TvDetails/TvDetails';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// toast-configuration method, it is compulsory method. 
toast.configure()

// image url imports
let img_url_start = "https://image.tmdb.org/t/p/original/";
let toget_related_shows;

const WatchTv = (props) => {
  const [watchDetails, setWatchDetails] = useState({});
  const [watchCredits, setWatchCredits] = useState({});
  const [isDetailsFetched, setDetailsFetched] = useState(false);
  const [isCreditsFetched, setCreditsFetched] = useState(false);
  const [isRelatedActive, setRelated] = useState(false);
  const [isDetailsActive, setDetails] = useState(false);
  const [isEpisodesActive, setEpisodes] = useState(true);
  const [selectedSeason, setSelectedSeason] = useState(1);

  let cast = [];
  let starring = [];
  let networks = [];
  let genres = [];
  let tv_id = props.match.params.tv_id;

  useEffect(() => {
    async function fetchDetails() {
      try {
        const response = await myaxios.get(`/tv/${tv_id}?api_key=${API_KEY}`);
        if (response.data) {
          setWatchDetails(response.data);
          setDetailsFetched(true);
          const noOfSeasons = response.data.number_of_seasons;
          
          setTimeout(() => {
            const selectseason = document.getElementById('selectseason');
            if (selectseason) {
              selectseason.innerHTML = "";
              for (let i = 0; i < noOfSeasons; i++) {
                let option = document.createElement('option');
                option.value = i + 1;
                option.text = `Season ${i + 1}`;
                option.classList.add('singleseason');
                selectseason.appendChild(option);
              }
            }
          }, 500);
        }
      } catch (error) {
        console.error("Error fetching TV details:", error);
      }
    }
    
    async function fetchCredits() {
      try {
        const response = await myaxios.get(`/tv/${tv_id}/credits?api_key=${API_KEY}`);
        if (response.data) {
          setWatchCredits(response.data);
          setCreditsFetched(true);
        }
      } catch (error) {
        console.error("Error fetching TV credits:", error);
      }
    }

    fetchDetails();
    fetchCredits();
    toget_related_shows = `tv/${tv_id}/similar?api_key=${API_KEY}`;
  }, [tv_id]);

  if (isDetailsFetched) {
    watchDetails.genres.forEach(singleGenre => {
      genres.push(singleGenre.name)
    });
    watchDetails.networks.forEach(singleNetwork => {
      networks.push(singleNetwork.name);
    });
  }

  if (isCreditsFetched) {
    watchCredits.cast.forEach(person => {
      cast.push(person.original_name)
    });
    starring = cast.slice(0, 10);
  }

  const getImage = () => {
    if (watchDetails.backdrop_path) {
      return `${img_url_start}${watchDetails.backdrop_path}`
    } else if (watchDetails.poster_path) {
      return `${img_url_start}${watchDetails.poster_path}`
    }
    return img_not_found;
  }

  const extraInfoClickHandler = (toshow) => {
    if (toshow === 'episode') {
      setRelated(false);
      setDetails(false);
      setEpisodes(true);
    } else if (toshow === 'related') {
      setRelated(true);
      setDetails(false);
      setEpisodes(false);
    } else {
      setRelated(false);
      setDetails(true);
      setEpisodes(false);
    }
  }

  const notAvailableService = () => {
    alert("Sorry. This service is not available.");
  }

  const seasonSelectionHandler = () => {
    const selectseason = document.getElementById('selectseason');
    if (selectseason) {
      setSelectedSeason(selectseason.value);
    }
  }

  const addToWatchListHandler = () => {
    if (sessionStorage.getItem('Guest')) {
      return alert('This service is not available for guests.');
    }

    axios.put(`${API_BASE_URL}/watchlist`, {
      userId: sessionStorage.getItem('_id'),
      media: 'tv',
      mediaId: tv_id,
      imgUrl: watchDetails.backdrop_path
    }).then(() => {
      toast.info('Successfully added to watchlist!', { position: toast.POSITION.TOP_CENTER })
    }).catch(() => {
      toast.error('Error in adding to watchlist!', { position: toast.POSITION.TOP_CENTER })
    });
  }

  return (
    <React.Fragment>
      <MainNav />
      {
        (isDetailsFetched && isCreditsFetched) ?
          <div>
            <div className='watch-item'>
              <div className='watch-item__left animate__animated animate__slideInDown'>
                <h1 className='watch-item__title'>{watchDetails.name}</h1>
                <div className='watch-item__info'>
                  <select onChange={seasonSelectionHandler} id='selectseason'></select>
                  <p>IMDb {watchDetails.vote_average}</p>
                  <p>{String(watchDetails.first_air_date).slice(0, 4)}</p>
                  <p>X-Ray</p>
                  <p>{watchDetails.adult ? "18+" : "ALL"}</p>
                  <ChatSharpIcon />
                </div>
                <p className='watch-item__overview'>{watchDetails.overview}</p>
                <div className='watch-item__buttons'>
                  <Button
                    startIcon={<PlayArrowSharpIcon style={{ fontSize: 40 }} />}
                    className='watch-item__buttons__play'
                    onClick={notAvailableService}
                  >
                    Play
                  </Button>
                  <Button startIcon={<AddSharpIcon style={{ fontSize: 40 }} />} onClick={addToWatchListHandler} >
                    Add to Watchlist
                  </Button>
                </div>
                <WatchItemDetails
                  from='tvshows'
                  director={[]}
                  starring={starring.slice(0, 4)}
                  genres={genres}
                  language={watchDetails.original_language}
                />
                <br />
                <p className='watch-item__termsofuse'>By clicking play, you agree to our <span>Terms of Use.</span></p>
              </div>
              <div className='watch-item__right animate__animated animate__slideInDown'>
                <img src={getImage()} alt={watchDetails.name} />
              </div>
            </div>
            <div id='wi-extra-info-links'>
              <a href="#episodes" id='episodelink' onClick={(e) => { e.preventDefault(); extraInfoClickHandler('episode') }}>Episodes</a>
              <a href="#related" id='relatedlink' onClick={(e) => { e.preventDefault(); extraInfoClickHandler('related'); }} >Related</a>
              <a href="#details" id='detailslink' onClick={(e) => { e.preventDefault(); extraInfoClickHandler('details'); }} >Details</a>
            </div>
            <div className='wi-extra-info-content' >
              {isEpisodesActive && <Episode tv_id={tv_id} seasonNo={selectedSeason} />}
              {isRelatedActive && <Row title='Customers also watched' fetchUrl={toget_related_shows} mediaType='tv' />}
              {isDetailsActive && <TvDetails starring={starring} networks={networks} />}
            </div>
          </div> : <Loading />
      }
      <Footer />
    </React.Fragment>
  )
}

export default WatchTv;