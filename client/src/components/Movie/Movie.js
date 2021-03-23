// react import
import React,{useEffect, useState,useContext} from 'react';
// api import
import API_KEY from '../../APIS/tmdbapikey'
import axios from 'axios';
// normal import
import MainNav from '../MainNav/MainNav'
import Row from '../Rows/Row'
import MovieDetails from './MovieDetails/MovieDetails'
import Footer from '../Footer/Footer'
import {UserInfoContext} from '../../UserContext'
// materialui imports
import ChatSharpIcon from '@material-ui/icons/ChatSharp';
import Button from '@material-ui/core/Button';
import PlayArrowSharpIcon from '@material-ui/icons/PlayArrowSharp';
import PlayArrowOutlinedIcon from '@material-ui/icons/PlayArrowOutlined';
import GetAppSharpIcon from '@material-ui/icons/GetAppSharp';
import AddSharpIcon from '@material-ui/icons/AddSharp';
// scss import  and toast
import './Movie.scss'
import {toast} from 'react-toastify';  
import 'react-toastify/dist/ReactToastify.css';  
// toast-configuration method,  it is compulsory method. 
toast.configure() 
// image import
import img_not_found from '../../../src/assets/images/img_not_found.png'
// extra package import
import YouTube from 'react-youtube'
import movieTrailer from 'movie-trailer';
import Loading from '../Extra/Loading/Loading';
import WatchItemDetails from '../WatchItemDetails/WatchItemDetails';
// image url imports
let img_url_start = "https://image.tmdb.org/t/p/original/";
let toget_related_movies; 


const Watch = (props)=>{

    const [] = useContext(UserInfoContext);
    const [watchDetails, setWatchDetails] = useState({});
    
    const [watchCredits, setWatchCredits] = useState({});
    const [related] = useState({});

    const [isDetailsFetched , setDetailsFetched] = useState(false);
    const [isCreditsFetched , setCreditsFetched] = useState(false);

    const [isRelatedActive , setRelated] = useState(true);
    const [isDetailsActive , setDetails] = useState(false);

    const [trailerUrl , setTrailerUrl] = useState("");


    let movieName="";
    let director = [];
    let production = [];
    let cast = [];
    let supportingActors = [];
    let starring = [];
    let genres = [];
    let movieId;
    
    useEffect(() => {
        // console.log(props.match.params);
        
        async function fetchDetails(){
             movieId = props.match.params.id;
            let request=null
            request = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`)
            if(request.data)
            {
                setWatchDetails(request.data);
                setDetailsFetched(true)
                movieName = request.data.title;
                // changing document title
                document.title = `Prime Video: ${movieName}`
                // console.log('details: ',watchDetails);
            }
            
        }

        toget_related_movies = `movie/${props.match.params.id}/recommendations?api_key=${API_KEY}`
        
        async function fetchCredits(){
            let request=null;
            request = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}`)
            if(request.data)
            {
                setWatchCredits(request.data)
                setCreditsFetched(true)
                // console.log('Credits: ',watchCredits);
            }
            
        }
        fetchDetails();
        fetchCredits();
        
    }, [props.match.params.id]);
    const opts = {
        height : "800px",
        width : "100%",
        position : "absolute",
        paddingTop :"10%",
        playerVars : {
            autoplay : 1,
        },
    };


    const openwatchTrailerHandler = ()=>{

        const trailerElement = document.getElementById('yt-trailer-div');
        // console.log(trailerElement);
        trailerElement.style.height = '100%';
        
        // console.log(watchDetails.title);
        if(trailerUrl){
            // if all ready playing
            setTrailerUrl('');
        }else{
            movieTrailer(watchDetails.title || "")
            .then((url) =>{
                const urlParams = new URLSearchParams(new URL(url).search);
                setTrailerUrl(urlParams.get("v"));
            }).catch(err => {
                // console.log(`Error in watchTrailerHandler for ${watchDetails.title}`,err)
            })
        }
    }

    const closewatchTrailerHandler = ()=>{
        const trailerElement = document.getElementById('yt-trailer-div');
        // console.log(trailerElement);
        trailerElement.style.height = '0%';

        // set trailerurl to empty
        setTrailerUrl('');
    }

    const extraInfoClickHandler = (toshow)=>{
        // console.log(toshow);
        if(toshow ==='related')
        {
            setRelated(true);
            setDetails(false);
        }else if (toshow === 'details')
        {
            setRelated(false);
            setDetails(true);
        }
    }

    const minuteToHourAndMinuteConverter = (argumentMinutes)=>{
        let hours = argumentMinutes/60
        let rhours = Math.floor(hours);
        let minutes = (hours-rhours)*60;
        let rminutes = Math.round(minutes);
        return " "+rhours + "h "+ rminutes +"min ";
    }

    if(isCreditsFetched)
    {
        watchCredits.cast.map( person =>{
            cast.push(person.original_name)
        } )
        // console.log(cast);
        starring = cast.slice(0,3);

        // get supporting actors
        if(cast.length>=4)
            supportingActors = cast.slice(Math.max(cast.length - 6, 3))
        else
            supportingActors = cast;
        

        // getting directors
        watchCredits.crew.map(singleCrew =>{
            if(singleCrew.department === "Directing")
            {
                director.push(singleCrew.name);
            }
        })
        // remove redund elements 
        director = [...new Set(director)];
        // remove extra producers
        if(director.length >=4)
            director = director.slice(0,3);

        // getting producers
        watchCredits.crew.map(singleCrew =>{
            if(singleCrew.known_for_department === "Production" || singleCrew.department === "Production")
            {
                production.push(singleCrew.name);
            }
        })
        // remove extra producers
        if(production.length >=4)
            production = production.slice(0,3);
    }
    if(isDetailsFetched)
    {
        watchDetails.genres.map(singleGenre =>{
            genres.push(singleGenre.name)
        })
        // console.log( '\ndetails',watchDetails ,'\ncredits', watchCredits,'\nrelated' ,related)
    }

    const getImage = ()=>{
        if(watchDetails.backdrop_path){
            return `${img_url_start}${watchDetails.backdrop_path}`
        }else if(watchDetails.poster_path){
          return `${img_url_start}${watchDetails.poster_path}`
        }
        return img_not_found;
    }

    const notAvailableService = ()=>{
        alert("Sorry This Service is not available");
    }

    const addToWatchListHandler = ()=>{

        if(sessionStorage.getItem('Guest'))
            return alert('This service not available for Guest')
        // console.log('id',movieId);
        axios.put(`https://myprimecloneserver.herokuapp.com/watchlist`,{
            userId:sessionStorage.getItem('_id'),
            media : 'movie',
            mediaId : props.match.params.id,
            imgUrl: watchDetails.backdrop_path

        }).then(()=>{

            // console.log(result.data);
            toast.info('Sucessfully added to watchlist!',{position:toast.POSITION.TOP_CENTER})
        }).catch((err)=>{
            console.log(err);
            toast.error('error in adding to watchlist!',{position:toast.POSITION.TOP_CENTER})
        })
    }
    return(
        
        <React.Fragment>
        <MainNav/>
        {
            (isDetailsFetched && isCreditsFetched) ? 
            <div>
                <div className='watch-item'>
                    {/* left part */}
                    <div className='watch-item__left animate__animated animate__slideInDown'>

                        <h1 className='watch-item__title'>{watchDetails.title}</h1>

                        <div className='watch-item__info'>
                            <p>IMDb {watchDetails.vote_average}</p>
                            <p>{minuteToHourAndMinuteConverter(watchDetails.runtime)}</p>
                            <p>{String(watchDetails.release_date).slice(0,4)}</p>
                            <p>X-Ray</p>
                            <p>{watchDetails.adult ? "18+" : "ALL"}</p>
                            <ChatSharpIcon/>
                        </div> 

                        <p className='watch-item__overview'>
                        {watchDetails.overview} 
                        </p>

                        <div className='watch-item__buttons'>
                            <Button 
                                startIcon={<PlayArrowSharpIcon  style={{ fontSize: 40}}/>} className='watch-item__buttons__play'
                                onClick={notAvailableService}
                            >
                                Play
                            </Button>
                            
                            <Button startIcon={< PlayArrowOutlinedIcon  style={{ fontSize: 40 }} />} onClick={()=>{
                                openwatchTrailerHandler()
                            }}>
                                Watch Trailer
                            </Button>
                            
                            <Button startIcon={<AddSharpIcon style={{ fontSize: 40 }}/>} onClick={addToWatchListHandler} >
                                Add to Watch List
                            </Button>
                            
                            <Button startIcon={<GetAppSharpIcon  style={{ fontSize: 40 }} />} onClick={notAvailableService}>
                                Download
                            </Button>
                        </div>

                        {/* details in main div */}
                        <WatchItemDetails
                            from='movie'
                            director={director}
                            starring={starring}
                            genres={genres}
                            language={watchDetails.original_language}
                        />

                        <br/>
                        <p className='watch-item__termsofuse'>By clicking play, you agree to our <span>Terms of Use.</span></p>
                    </div>
                    
                    {/* Right part image */}
                    <div className='watch-item__right animate__animated animate__slideInDown'>
                        <img
                            src={getImage()}
                        ></img>
                    </div>

                        
                    </div>   
                    
                    {/* To watch trailer */}
                    <div className='watch-item__yt-trailer' id='yt-trailer-div'>
                        <div className='watch-item__yt-trailer__video'>
                            {
                                trailerUrl ? <YouTube videoId={trailerUrl}  opts={opts} /> 
                                :<div style={{textAlign:'center',color:'white',position:'relative',top:'400px'}}>
                                    <h3>Sorry</h3>
                                    <h4>This video does not exist</h4>
                                </div>
                            }
                            {navigator.onLine ? null : <marquee direction='right' >You are offline . To watch Trailer You should connected to internet</marquee>}
                            
                        </div>
                        <a href="#" className="yt-trailer__close-button" onClick={closewatchTrailerHandler}title='stop watching trailer' ><i className="fa fa-close"></i></a>
                        <marquee direction='right' style={{color:'white'}} >Some Times another movie trailer may play &#128517;</marquee>
                    </div>
                    {/* To watch trailer end */}
        
                    <div id='wi-extra-info-links'>
                        <a href="#related" onClick={()=>{
                            extraInfoClickHandler('related');
                        }} >Related</a>
                        <a href="#details" onClick={()=>{
                            extraInfoClickHandler('details')
                        }}>Details</a>
                    </div>
    
                    <div className='wi-extra-info-content' >
                        { 
                            isRelatedActive ? 
                            <Row title='Customers also watched' fetchUrl={toget_related_movies} mediaType='movie' />
                            : null
                        }
                        {
                            isDetailsActive ? 
                            <MovieDetails production={production} supportingActors={supportingActors} />
                            : null
                        }
                    </div>
                </div> : <Loading/>
            }
            
            <Footer/>
            
        </React.Fragment>
        
    )
}

export default Watch;