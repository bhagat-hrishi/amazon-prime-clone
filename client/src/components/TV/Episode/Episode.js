import React,{useState,useEffect} from 'react'

import myaxios from '../../../APIS/myaxios';
import API_KEY from '../../../APIS/tmdbapikey';
import img_not_found from '../../../assets/images/img_not_found.png'


// import images and css and icons
import './Episode.scss'
import PlayArrowSharpIcon from '@material-ui/icons/PlayArrowSharp';
// image url imports
let img_url_start = "https://image.tmdb.org/t/p/original/";

const Episode = (props)=>{

    const seasonNo = props.seasonNo;
    const tv_id = props.tv_id;


    const [episodeDetails,setEpisodeDetails] = useState([]);
    const [allData , setAllData] = useState([]);
    useEffect(() => {
        async function fetchDetails(){
            let request=null
            request = await myaxios.get(`/tv/${tv_id}/season/${seasonNo}?api_key=${API_KEY}`)

            if(request.data)
            {
                // console.log(request.data);
                setAllData(request.data);
                setEpisodeDetails(request.data.episodes);
                // console.log(episodeDetails);
            }
        } 
        fetchDetails();
    }, [seasonNo])
    
    const getImage = (imgObject) => {
        if(imgObject.still_path){
            return `${img_url_start}${imgObject.still_path}`;
        }
        return img_not_found;
      };
    return (
        <>
            <div className='episodes'>
                <h4 className='episode_no'>Episodes ({episodeDetails.length})</h4>
                {
                    episodeDetails.map((singleEpisode ,index)=>{
                        return(
                            <div className='single-episode' key={singleEpisode.episode_number} >
                                <img 
                                    src={getImage(singleEpisode)}
                                    className='single-episode__img animate__animated animate__zoomIn'
                                    title={singleEpisode.name}
                                />

                                <div className='single-episode__content'>
                                    <h5 className='single-episode__title'>
                                        <PlayArrowSharpIcon style={{ background: '#0F79AF',color:'#fff', borderRadius:'50%',fontSize:'50px',cursor:'pointer'}}/> {index+1}. {singleEpisode.name}
                                    </h5>
                                    <p className='single-episode__overview'>{singleEpisode.overview}</p>
                                    <h6>{singleEpisode.air_date}</h6>
                            </div>
                            </div>
                        )
                    })
                }    
            </div> 
        </>
    )
}

export default Episode
