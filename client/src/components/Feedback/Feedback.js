import React, { useEffect, useState, useRef } from 'react'
import { Link } from "react-router-dom";
import axios from 'axios'
import API_BASE_URL from '../../config';

import FormFooter from '../Form/FormFooter/FormFooter'
import FormLogo from '../Form/FormLogo/FormLogo';

// import custom hooks
import useFeedbackForm from './useFeedbackForm'

// form validation
import validateFeedback from './validateFeedback'

// scss and icon
import './Feedback.scss'
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

const Feedback = () => {
  const { inputChangeHandler, values, errors, functionToSetErrors, setValues } = useFeedbackForm(validateFeedback);

  const inputRef = useRef(null)
  useEffect(() => {
    document.title = 'Give Your Valuable Feedback 🙏'
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [])

  const [isFeedbackSendSucess, setSucess] = useState(false);
  const [isFeedbackFail, setFailure] = useState(false);

  const feedbackFormSubmitHandler = (event) => {
    event.preventDefault();
    functionToSetErrors(validateFeedback(values))
    let errorObject = validateFeedback(values);
    let countofErrors = Object.keys(errorObject).length;

    if (countofErrors === 0) {
      const feedbackData = {
        personcontact: values.personcontact || "N/A",
        message: values.message
      }

      axios.post(`${API_BASE_URL}/feedback`, feedbackData)
        .then(res => {
          if (res.data.sucess === true) {
            setSucess(true);
            setFailure(false);
            setValues({
              personcontact: '',
              message: ''
            })
          } else {
            setSucess(false);
            setFailure(true);
          }
        })
        .catch(() => {
          setSucess(false);
          setFailure(true);
        })
    }
  }

  return (
    <div className="feedback-container">
      <FormLogo />

      <Link to='/' id="feedbackbacktohome">
        Back To Home
      </Link>

      {errors.message && (
        <div id='errordiv' className='animate__animated animate__fadeIn'>
          <div id='erroricon'>
            <ReportProblemOutlinedIcon style={{ fontSize: 30, color: '#c40000' }} />
          </div>
          <div id='errorinfo'>
            <h4>There was a problem</h4>
            <ol>
              <li>{errors.message}</li>
            </ol>
          </div>
        </div>
      )}

      {isFeedbackSendSucess && (
        <div id='feedbacksucess' className='animate__animated animate__bounceIn'>
          <CheckCircleIcon style={{ color: '#008a00' }} />
          <h2>Thank you! Your feedback has been sent.</h2>
        </div>
      )}

      {isFeedbackFail && (
        <div id='feedbackfail' className='animate__animated animate__bounceIn'>
          <ErrorOutlineIcon style={{ color: '#c40000' }} />
          <h2>Problem in sending feedback. Please try again later.</h2>
        </div>
      )}

      <div className="form animate__animated animate__zoomIn" id="feedbackdiv">
        <h2 className="form__title">Feedback</h2>
        <form onSubmit={feedbackFormSubmitHandler}>
          <div className="form-group">
            <label htmlFor="personcontact">Email or Name (Optional)</label>
            <input
              type="text"
              id="personcontact"
              className="form__input"
              ref={inputRef}
              placeholder='Optional'
              name='personcontact'
              value={values.personcontact}
              onChange={inputChangeHandler}
            />
          </div>

          <div className="form-group">
            <label htmlFor="feebackmesssage">Message</label>
            <textarea
              className='form__input'
              id='feebackmesssage'
              name='message'
              value={values.message}
              onChange={inputChangeHandler}
              rows="5"
            ></textarea>
          </div>

          <button className="form__button" type="submit">
            Send Feedback
          </button>
        </form>
      </div>

      <FormFooter />
    </div>
  )
}

export default Feedback;
