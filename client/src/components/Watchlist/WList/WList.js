import React,{useState,useEffect,useContext,} from 'react'
import {Link,useHistory} from 'react-router-dom';

// image url imports
import axios from 'axios'
let img_url_start = "https://image.tmdb.org/t/p/original/";
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import img_not_found from '../../../assets/images/img_not_found.png'

import {UserInfoContext} from '../../../UserContext'
import empty_watchlist from '../../../assets/images/other/empty_watchlist.png'

import './WList.scss'



const WList=(props)=>{
    
    // console.log('props',props)
    const mediaType = props.mediaType
    const userId = sessionStorage.getItem('_id');

    const [userInfo , setUserInfo] = useContext(UserInfoContext);
    const [data,setData]=useState([]);

    let WarningMessage = ''
    if(props.mediaType == 'tv'){
        WarningMessage = 'You have no TV shows on Your Watchlist';
    }else{
        WarningMessage = 'You have no movies on Your Watchlist';
    }
    useEffect(() => {

        async function fetchData(){

            // ${props.mediaType}
            let request = await axios.get(`https://myprimecloneserver.herokuapp.com/watchlist/${mediaType}/${userId}`)

                if(request.data){
                    // console.log(`For ${props.mediaType} data `,request.data)
                    setData(request.data.data)

                    // display required height if watchlist items are less
                    if(data.length>0 && data.length<11 && screen.width>=700){
                        document.getElementById('wlist').style.height='65vh'
                    }else if(data.length>0){
                        document.getElementById('wlist').style.heigh='auto';
                    }
                }else{
                    // console.log('data not found');
                    setData([])
                    // console.log(data);
                }
            }
            fetchData();
        
    },[mediaType])

        const history = useHistory();
        let path ='';
        const goToWatchComponentHandler =(event)=>{
                let id = event.target.id;
                if(props.mediaType == 'tv'){
                    history.push(`/watchtv/${id}`)
                }else{
                    history.push(`/watchmovie/${id}`)
                }
        }
    const deleteFromWatchListHandler = (event)=>{
        alert('This service is not available')
    }

    return (
        <React.Fragment>
            
            { 
                data.length > 0 ? 
                <div id='wlist'>
                { data.map((sigleWatchListItem,index)=>{
                    return(
                        <div key={index} className='single-watchlist-item'>
                            <img
                                src={`${img_url_start}${sigleWatchListItem.imgUrl}`}
                                id={sigleWatchListItem.mediaId}
                                
                                onClick={goToWatchComponentHandler}
                            />
                            <DeleteOutlineIcon   title='remove from watchlist' className='delete-watchlist-icon' onClick={deleteFromWatchListHandler}/>
                        </div>
                    )
                })}
                </div> :
                <div className='empty-watchlist'>
                    <img src={empty_watchlist}/>
                    <p className='empty-watchlist__warning-message'>
                        {
                            (props.mediaType == 'tv') ? 'You have no TV shows on Your Watchlist' :  'You have no movies on Your Watchlist'
                        }
                    </p>
                    <p className='empty-watchlist__toadd-message'>Add <Link to='/tvshows' className='toadd-message-link'>TV shows</Link> and <Link to='/movies'  className='toadd-message-link'>Movies</Link> that you want to watch later by clicking Add to Watchlist.</p>
                </div>
            }
        </React.Fragment>
       
    )
}

export default WList
