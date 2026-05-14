import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import API_BASE_URL from '../../config';

// normal component import
import FormFooter from "../Form/FormFooter/FormFooter";
import FormLogo from '../Form/FormLogo/FormLogo';
import "./Forgotpassword.scss";

const Forgotpassword = () => {
  const [email, setEmail] = useState("");
  const [emailnotEnteredError, setemailnotEnteredError] = useState(false);
  const [isemailfound, setEmailFound] = useState(true);
  const [isemailSend, setEmailSend] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    document.title = 'Amazon Password Assistance';
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const inputChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const user = {
      email: email
    };
    if (email.trim() === '') {
      setemailnotEnteredError(true);
    } else {
      setemailnotEnteredError(false);
      axios.post(`${API_BASE_URL}/forgotpassword`, user)
        .then(result => {
          let sucess = result.data.sucess;
          if (!sucess) {
            setEmailFound(false);
            setEmailSend(false);
          }
          if (sucess) {
            setEmailFound(true);
            setEmailSend(true);
            setEmail('');
          }
        })
        .catch(err => {
          console.log('Error in sending email', err);
          setEmailFound(false);
        });
    }
  };

  return (
    <div className="forgotpassword-container">
      <FormLogo />

      {!isemailfound && (
        <div id='errordiv' className='animate__animated animate__fadeIn'>
          <div id='erroricon'>
            <i className="fas fa-exclamation-triangle" style={{ fontSize: 30, color: '#c40000' }}></i>
          </div>
          <div id='errorinfo'>
            <h4>There was a problem</h4>
            <p style={{ fontSize: '13px' }}>We're sorry. We wasn't able to find an account with that email address.</p>
          </div>
        </div>
      )}

      {isemailSend && (
        <div id='sucessemail' className='animate__animated animate__bounceIn'>
          <h4>Your password reset email has sent!</h4>
          <p>
            We have sent a password reset link to your email address.
            Please check your inbox and continue.
          </p>
        </div>
      )}

      <div className='form animate__animated animate__fadeIn'>
        <h2 className='form__title'>Password assistance</h2>
        <p>
          Enter the email address associated with your Amazon account.
        </p>
        <form onSubmit={formSubmitHandler}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type='email'
              id="email"
              className='form__input'
              ref={inputRef}
              name='email'
              value={email}
              onChange={inputChangeHandler}
            />
            {emailnotEnteredError && (
              <p id='errormessage' className='animate__animated animate__fadeIn'>
                <i className="fas fa-exclamation-circle"></i> Please enter your email
              </p>
            )}
          </div>

          <button className='form__button' type='submit'>
            Continue
          </button>
        </form>
      </div>

      <FormFooter />
    </div>
  );
};

export default Forgotpassword;
