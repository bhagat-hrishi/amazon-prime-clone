import React, { useState, useEffect, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios'
import API_BASE_URL from '../../../config'

// image url imports
let img_url_start = "https://image.tmdb.org/t/p/original/";
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import img_not_found from '../../../assets/images/img_not_found.png'

import { UserInfoContext } from '../../../UserContext'
import empty_watchlist from '../../../assets/images/other/empty_watchlist.png'

import './WList.scss'

const WList = (props) => {
  const mediaType = props.mediaType
  const userId = sessionStorage.getItem('_id');

  const [userInfo, setUserInfo] = useContext(UserInfoContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        let request = await axios.get(`${API_BASE_URL}/watchlist/${mediaType}/${userId}`);
        if (request.data && request.data.data) {
          setData(request.data.data);
          if (request.data.data.length > 0 && request.data.data.length < 10) {
            const wlistElement = document.getElementById('wlist');
            if (wlistElement) {
              wlistElement.style.height = '80vh';
            }
          }
        } else {
          setData([]);
        }
      } catch (error) {
        console.error("Error fetching watchlist:", error);
        setData([]);
      }
    }
    fetchData();
  }, [mediaType, userId]);

  const history = useHistory();

  const goToWatchComponentHandler = (event) => {
    let id = event.target.id;
    if (props.mediaType === 'tv') {
      history.push(`/watchtv/${id}`)
    } else {
      history.push(`/watchmovie/${id}`)
    }
  }

  const deleteFromWatchListHandler = (event) => {
    alert('This service is not available')
  }

  return (
    <React.Fragment>
      {
        data.length > 0 ?
          <div id='wlist'>
            {data.map((sigleWatchListItem, index) => {
              return (
                <div key={index} className='single-watchlist-item'>
                  <img
                    src={`${img_url_start}${sigleWatchListItem.imgUrl}`}
                    id={sigleWatchListItem.mediaId}
                    alt="Watchlist Item"
                    onClick={goToWatchComponentHandler}
                  />
                </div>
              )
            })}
          </div> :
          <div className='empty-watchlist'>
            <img src={empty_watchlist} alt="Empty Watchlist" />
            <p className='empty-watchlist__warning-message'>
              {
                (props.mediaType === 'tv') ? 'You have no TV shows on Your Watchlist' : 'You have no movies on Your Watchlist'
              }
            </p>
            <p className='empty-watchlist__toadd-message'>Add <Link to='/tvshows' className='toadd-message-link'>TV shows</Link> and <Link to='/movies' className='toadd-message-link'>Movies</Link> that you want to watch later by clicking Add to Watchlist.</p>
          </div>
      }
    </React.Fragment>
  )
}

export default WList