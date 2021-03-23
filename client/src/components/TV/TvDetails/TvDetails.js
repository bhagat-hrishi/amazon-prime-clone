import React from 'react'

import './TvDetails.scss'

const TvDetails = (props)=>{
    console.log(props);
    return (
        <React.Fragment>
            <div id="details">
                <h3 className='details__heading animate__animated animate__slideInLeft'>More Details</h3>
                <div className='animate__animated animate__slideInLeft'>
                    <h5 className='details__position'>Actors</h5>
                    <p className='details__value'>
                        {
                            props.starring.length >0  ? props.starring.join(" , ") : "N/A"
                        }
                    </p>
                </div>
                <div className='animate__animated animate__slideInLeft'>
                    <h5 className='details__position'>Network</h5>
                    <p className='details__value'>
                        {
                            props.networks.length >0  ? props.networks.join(" , ") : "N/A"
                        }
                    </p>
                </div>
            </div>
        </React.Fragment>
    )
}

export default TvDetails
