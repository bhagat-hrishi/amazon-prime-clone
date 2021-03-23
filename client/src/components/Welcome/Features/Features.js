import React from 'react'

//scss and image import
import './Features.scss'
import w41 from "../../../assets/images/welcome/w41.jpg";
import w42 from "../../../assets/images/welcome/w42.jpg";
import w43 from "../../../assets/images/welcome/w43.png";


const Features = ()=>{
    return (
        <>
            <div className="welcomebanner4">
            <div className="welcomebanner4__item">
              <img src={w41} alt="Watch anywhere"></img>
              <h4 className="welcomebanner4__title">Watch anywhere</h4>
              <p className="welcomebanner4__description">
                Enjoy from the web or with the Prime Video app on your phone,
                tablet, or select Smart TVs — on up to 3 devices at once.
              </p>
            </div>
            <div className="welcomebanner4__item">
              <img src={w42} alt="Download and go"></img>
              <h4 className="welcomebanner4__title">Download and go</h4>
              <p className="welcomebanner4__description">
                Watch offline on the Prime Video app when you download titles to
                your iPhone, iPad, Tablet, or Android device.
              </p>
            </div>
            <div className="welcomebanner4__item">
              <img src={w43} alt="Data Saver"></img>
              <h4 className="welcomebanner4__title">Data Saver</h4>
              <p className="welcomebanner4__description">
                Control data usage while downloading and watching videos on
                select phones or tablets.
              </p>
            </div>
          </div>        
        </>
    )
}

export default Features;
