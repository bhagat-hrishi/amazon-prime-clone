// react import
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import API_BASE_URL from '../../config';

// api import
import API_KEY from '../../APIS/tmdbapikey'

// normal import
import MainNav from '../MainNav/MainNav'
import Row from '../Rows/Row'
import MovieDetails from './MovieDetails/MovieDetails'
import Footer from '../Footer/Footer'
import { UserInfoContext } from '../../UserContext'

// materialui imports
import ChatSharpIcon from '@material-ui/icons/ChatSharp';
import Button from '@material-ui/core/Button';
import PlayArrowSharpIcon from '@material-ui/icons/PlayArrowSharp';
import PlayArrowOutlinedIcon from '@material-ui/icons/PlayArrowOutlined';
import GetAppSharpIcon from '@material-ui/icons/GetAppSharp';
import AddSharpIcon from '@material-ui/icons/AddSharp';

// scss import and toast
import './Movie.scss'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// toast-configuration method, it is compulsory method. 
toast.configure()

// image import
import img_not_found from '../../assets/images/img_not_found.png'

// extra package import
import YouTube from 'react-youtube'
import movieTrailer from 'movie-trailer';
import Loading from '../Extra/Loading/Loading';
import WatchItemDetails from '../WatchItemDetails/WatchItemDetails';

// image url imports
let img_url_start = "https://image.tmdb.org/t/p/original/";
let toget_related_movies;

const Watch = (props) => {
  const [userId] = useContext(UserInfoContext);
  const [watchDetails, setWatchDetails] = useState({});
  const [watchCredits, setWatchCredits] = useState({});
  const [isDetailsFetched, setDetailsFetched] = useState(false);
  const [isCreditsFetched, setCreditsFetched] = useState(false);
  const [isRelatedActive, setRelated] = useState(true);
  const [isDetailsActive, setDetails] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState("");

  let director = [];
  let production = [];
  let cast = [];
  let supportingActors = [];
  let starring = [];
  let genres = [];
  let movieId = props.match.params.id;

  useEffect(() => {
    async function fetchData() {
      try {
        const detailsResponse = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`);
        if (detailsResponse.data) {
          setWatchDetails(detailsResponse.data);
          setDetailsFetched(true);
          document.title = `Prime Video: ${detailsResponse.data.title}`;
        }

        const creditsResponse = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}`);
        if (creditsResponse.data) {
          setWatchCredits(creditsResponse.data);
          setCreditsFetched(true);
        }
      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
    }

    fetchData();
    toget_related_movies = `movie/${movieId}/recommendations?api_key=${API_KEY}`;
  }, [movieId]);

  const opts = {
    height: "800px",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const openwatchTrailerHandler = () => {
    const trailerElement = document.getElementById('yt-trailer-div');
    if (trailerElement) trailerElement.style.height = '100%';

    if (trailerUrl) {
      setTrailerUrl('');
    } else {
      movieTrailer(watchDetails.title || "")
        .then((url) => {
          if (url) {
            const urlParams = new URLSearchParams(new URL(url).search);
            setTrailerUrl(urlParams.get("v"));
          } else {
            setTrailerUrl(null);
          }
        }).catch(() => {
          setTrailerUrl(null);
        });
    }
  }

  const closewatchTrailerHandler = (e) => {
    if (e) e.preventDefault();
    const trailerElement = document.getElementById('yt-trailer-div');
    if (trailerElement) trailerElement.style.height = '0%';
    setTrailerUrl('');
  }

  const extraInfoClickHandler = (toshow) => {
    if (toshow === 'related') {
      setRelated(true);
      setDetails(false);
    } else if (toshow === 'details') {
      setRelated(false);
      setDetails(true);
    }
  }

  const minuteToHourAndMinuteConverter = (argumentMinutes) => {
    let hours = argumentMinutes / 60;
    let rhours = Math.floor(hours);
    let minutes = (hours - rhours) * 60;
    let rminutes = Math.round(minutes);
    return " " + rhours + "h " + rminutes + "min ";
  }

  if (isCreditsFetched) {
    watchCredits.cast.forEach(person => {
      cast.push(person.original_name)
    });
    starring = cast.slice(0, 3);

    if (cast.length >= 4)
      supportingActors = cast.slice(3, 9);
    else
      supportingActors = cast;

    watchCredits.crew.forEach(singleCrew => {
      if (singleCrew.department === "Directing") {
        director.push(singleCrew.name);
      }
      if (singleCrew.known_for_department === "Production" || singleCrew.department === "Production") {
        production.push(singleCrew.name);
      }
    });

    director = [...new Set(director)].slice(0, 3);
    production = [...new Set(production)].slice(0, 3);
  }

  if (isDetailsFetched) {
    watchDetails.genres.forEach(singleGenre => {
      genres.push(singleGenre.name)
    });
  }

  const getImage = () => {
    if (watchDetails.backdrop_path) {
      return `${img_url_start}${watchDetails.backdrop_path}`
    } else if (watchDetails.poster_path) {
      return `${img_url_start}${watchDetails.poster_path}`
    }
    return img_not_found;
  }

  const notAvailableService = () => {
    alert("Sorry. This service is not available.");
  }

  const addToWatchListHandler = () => {
    if (sessionStorage.getItem('Guest')) {
      return alert('This service is not available for guests.');
    }

    axios.put(`${API_BASE_URL}/watchlist`, {
      userId: sessionStorage.getItem('_id'),
      media: 'movie',
      mediaId: movieId,
      imgUrl: watchDetails.backdrop_path
    }).then(() => {
      toast.info('Successfully added to watchlist!', { position: toast.POSITION.TOP_CENTER })
    }).catch((err) => {
      console.error(err);
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
                <h1 className='watch-item__title'>{watchDetails.title}</h1>
                <div className='watch-item__info'>
                  <p>IMDb {watchDetails.vote_average}</p>
                  <p>{minuteToHourAndMinuteConverter(watchDetails.runtime)}</p>
                  <p>{String(watchDetails.release_date).slice(0, 4)}</p>
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
                  <Button startIcon={<PlayArrowOutlinedIcon style={{ fontSize: 40 }} />} onClick={openwatchTrailerHandler}>
                    Watch Trailer
                  </Button>
                  <Button startIcon={<AddSharpIcon style={{ fontSize: 40 }} />} onClick={addToWatchListHandler} >
                    Add to Watchlist
                  </Button>
                  <Button startIcon={<GetAppSharpIcon style={{ fontSize: 40 }} />} onClick={notAvailableService}>
                    Download
                  </Button>
                </div>
                <WatchItemDetails
                  from='movie'
                  director={director}
                  starring={starring}
                  genres={genres}
                  language={watchDetails.original_language}
                />
                <br />
                <p className='watch-item__termsofuse'>By clicking play, you agree to our <span>Terms of Use.</span></p>
              </div>
              <div className='watch-item__right animate__animated animate__slideInDown'>
                <img src={getImage()} alt={watchDetails.title} />
              </div>
            </div>
            <div className='watch-item__yt-trailer' id='yt-trailer-div'>
              <div className='watch-item__yt-trailer__video'>
                {trailerUrl ? (
                  <YouTube videoId={trailerUrl} opts={opts} />
                ) : (
                  <div style={{ textAlign: 'center', color: 'white', position: 'relative', top: '400px' }}>
                    <h3>Sorry</h3>
                    <h4>This video does not exist</h4>
                  </div>
                )}
                {!navigator.onLine && <marquee direction='right' >You are offline. Connect to the internet to watch the trailer.</marquee>}
              </div>
              <a href="#" className="yt-trailer__close-button" onClick={closewatchTrailerHandler} title='stop watching trailer' >
                <i className="fa fa-close"></i>
              </a>
            </div>
            <div id='wi-extra-info-links'>
              <a href="#related" onClick={(e) => { e.preventDefault(); extraInfoClickHandler('related'); }} >Related</a>
              <a href="#details" onClick={(e) => { e.preventDefault(); extraInfoClickHandler('details') }}>Details</a>
            </div>
            <div className='wi-extra-info-content' >
              {isRelatedActive && <Row title='Customers also watched' fetchUrl={toget_related_movies} mediaType='movie' />}
              {isDetailsActive && <MovieDetails production={production} supportingActors={supportingActors} />}
            </div>
          </div> : <Loading />
      }
      <Footer />
    </React.Fragment>
  )
}

export default Watch;