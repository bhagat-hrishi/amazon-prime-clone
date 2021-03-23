import React,{useState,useEffect} from 'react'
import { useHistory } from "react-router-dom";
// images,icons,scss
import './Row.scss'
// image import
import img_not_found from '../../../src/assets/images/img_not_found.png';
import myaxios from '../../APIS/myaxios';

let img_url_start = 'https://image.tmdb.org/t/p/original/'

const Row=(props)=>{
    // console.log('props',props)
    const {title , fetchUrl , mediaType} = props;
    const [data, setData] = useState([])
    useEffect(() => {
        let request=null
        async function fetchData(){
            request = await myaxios.get(fetchUrl)

                if(request.data){
                    // console.log(request.data)
                    setData(request.data.results)
                }else{
                    // console.log('data not found');
                }
        }
        fetchData();
    }, [fetchUrl])

   
    const history = useHistory();
    const gotToWatchHandler =(id)=>{
        // console.log(id,mediaType)
        if(mediaType ==='tv'){
            history.push(`/watchtv/${id}`)
        }else if(mediaType === 'movie'){
            history.push(`/watchmovie/${id}`)
        }else{
            history.push('/pagenotfound');
        }

    }
    return (
        
           <React.Fragment>
               <div className='row'>
               <h4 className='row__title' >{title}</h4>
                    {
                        data.length > 0  ? 
                        
                        <div className='row__posters' >
                        {
                            data.map((singleItem,index)=>{
                                return(

                                    <img
                                    onClick={()=>{
                                        gotToWatchHandler(singleItem.id)
                                    }}
                                    watchtype =' ok'
                                    key={singleItem.id}
                                    title={singleItem.title || singleItem.name}
                                    className={`row__poster img-${index+1}`}
                                    src={`${img_url_start}${singleItem.backdrop_path}` || `${img_url_start}${singleItem.poster_path}` || {img_not_found}}
                                    
                                    />
                                    
                                
                                )
                            })
                        }
                        </div> :
                        <h1 style={{textAlign:'center',color:'white'}}>Not Available</h1>
                    }
                </div>
           
           </React.Fragment>
    )
}

export default Row
