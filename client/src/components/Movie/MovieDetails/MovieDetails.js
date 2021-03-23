import React from 'react'

import './MovieDetails.scss'

const WatchDetails = (props)=>{
    const {production,supportingActors}= props
    return (
        <React.Fragment>
            <div id="details">
                <h3 className='details__heading animate__animated animate__slideInLeft'>More Details</h3>
                <div className='animate__animated animate__slideInLeft'>
                    <h5 className='details__position'>Producer</h5>
                    <p className='details__value'>
                        { production.length >0  ?  production.join(" , ") : "N/A"}
                    </p>
                </div>
                <div className='animate__animated animate__slideInLeft'>
                    <h5 className='details__position'>Supporting Actor</h5>
                    <p className='details__value'>
                    { supportingActors.length >0  ?  supportingActors.join(" , ") : "N/A"}
                    </p>
                </div>
            </div>
        </React.Fragment>
    )
}

export default WatchDetails
