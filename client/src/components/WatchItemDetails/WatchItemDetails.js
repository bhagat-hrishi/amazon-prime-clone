import React from 'react'
import myLanguageMap from '../../APIS/myLanguageMapping'
import './WatchItemDetails.scss'

const WatchItemDetails=(props)=>{

    const {director,starring,genres,language} = props
    
    return (
        <dl className='watch-item__details'>
        <div>
            <dt  className='watch-item__details__title'>Director</dt>
            <dd className='watch-item__details__info'>
                {
                   director.length >0  ? director.join(" , ") : "N/A"
                }
            </dd>
        </div>
        <div>
            <dt className='watch-item__details__title'>Starring</dt>
            <dd className='watch-item__details__info'>
                {
                    starring.length >0  ? starring.join(" , ") : "N/A"
                }
            </dd>
        </div>
        <div>
            <dt className='watch-item__details__title'>Genres</dt>
            <dd className='watch-item__details__info'>
                {
                    genres.length >0  ? genres.join(" , ") : "N/A"
                }
            </dd>
        </div>
        <div>
            <dt className='watch-item__details__title'>Audio Language</dt>
            <dd className='watch-item__details__info'>
                {
                    myLanguageMap.get(language)
                }
            </dd>
        </div>
    </dl>
    )
}

export default WatchItemDetails
