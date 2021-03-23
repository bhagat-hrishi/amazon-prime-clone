import React,{useEffect, useState,useRef} from 'react'
import { Link } from "react-router-dom";

import FormFooter from '../Form/FormFooter/FormFooter'

// import custom hooks
import useFeedbackForm from './useFeedbackForm'
import axios from 'axios'

// form validation
import validateFeedback from './validateFeedback'

// scss and icon
import './Feedback.scss'
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

const  Feedback =()=>{
    const {inputChangeHandler  ,values , errors,functionToSetErrors , setValues} = useFeedbackForm(validateFeedback);

    const inputRef  = useRef(null)
    useEffect(() => {
    //   To change document title
    document.title = 'Give Your Valuable Feedback 🙏'
  // Focus input on document load
    inputRef.current.focus();
    }, [])
    
    const [isFeedbackSendSucess , setSucess ] = useState(false);
    const [isFeedbackFail,setFailure ] = useState(false);

    const feedbackFormSubmitHandler = (event)=>{

        event.preventDefault();
        // set error messages
        functionToSetErrors(validateFeedback(values))
        let errorObject = validateFeedback(values);
        let countofErrors = Object.keys(errorObject).length;
        // console.log( 'count of errors',countofErrors,errorObject)
        if(countofErrors == 0){
              if(values.personcontact==""){
              values.personcontact = "N/A";
        }
        const user = {
            personcontact : values.personcontact,
            message : values.message
        }
          //send data to BackEnd
              axios.post('https://myprimecloneserver.herokuapp.com/feedback',user)
              .then(res =>{
                  // console.log(res.data)
                  // if sucess go to login
                  if(res.data.sucess === true){
                        setSucess(true);
                        setFailure(false);
                        setValues({
                          personcontact : '',
                          message : ''
                        })
                  }  
                  else{
                    setSucess(false);
                    setFailure(true);
                  }
          }) //axios part End
    }
    }

    return (
        <React.Fragment>
            
        {/* For error message */}
        {(errors.message) ?
                <div id='errordiv' style={{position:'relative',top:'40px'}}>
                  <div id='erroricon'>
                    <ReportProblemOutlinedIcon style={{fontSize:30,fontWeight:'thinner',color:'#c40000'}}/>
                  </div>
                  <div id='errorinfo'>
                    <h4>There was a problem</h4>
                    <ol>
                        {errors.message  && <li>{errors.message}</li>}
                    </ol>
                  </div>
                </div>
                :null  
         }
          {/* if sucess */}
          {
              isFeedbackSendSucess ? 
              <div id='feedbacksucess' className='animate__animated animate__bounceIn'>
                    <CheckCircleIcon/>
                    <h2>Thank You!</h2>
              </div> : null
          }
          {/* if fail */}
          {
              isFeedbackFail ? 
              <div id='feedbackfail' className='animate__animated animate__bounceIn'>
                    <ErrorOutlineIcon/>
                    <h2>Problem in sending feedback</h2>
              </div> : null
          }
        <div className="form animate__animated animate__zoomIn" id="feedbackdiv">
            <h2 className="form__title">Feedback</h2>
            <br/>
            <form onSubmit={feedbackFormSubmitHandler}>
            <div>
              <label>Email or Name</label>
              <input 
                type="text" className="form__input" ref={inputRef} 
                    placeholder='Optional'
                    name = 'personcontact'
                    value = {values.personcontact}
                    onChange = {inputChangeHandler}
                ></input>
            </div>
            <br />
            <div>
                <label>Message</label>
                <textarea 
                    className='form_input' 
                    id='feebackmesssage'
                    placeholder='Message'
                    name = 'message'
                    value = {values.message}
                    onChange = {inputChangeHandler}
                    style={{fontSize:'1rem'}}

                >
                </textarea>
            </div>
            <br />
            <button className="form__button" type="submit">
              Send
            </button>
          </form>
        </div>
        <br/>
        <Link to='/' id="feedbackbacktohome">
            Back To home
        </Link>

        <FormFooter />
        </React.Fragment>
        
    )
}

export default Feedback;
