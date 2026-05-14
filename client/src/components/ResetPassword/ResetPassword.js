// react imports
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../../config';

// scss and image and icon
import './ResetPassword.scss';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

// components
import FormFooter from "../Form/FormFooter/FormFooter";
import FormLogo from '../Form/FormLogo/FormLogo';

// for state and errors
import validateReset from './validateReset';
import useResetForm from './useResetForm';

const ResetPassword = (props) => {
  const inputRef = useRef(null);
  const [islinkvalid, setlinkvalidity] = useState(true);
  const [stausofUpdate, setUpdateStatus] = useState({
    isLoading: false,
    error: false,
    updated: false
  });

  useEffect(() => {
    document.title = 'Reset password';
    
    async function isTokenValid() {
      try {
        const response = await axios.get(`${API_BASE_URL}/checktoken`, {
          params: {
            resetPasswordToken: props.match.params.token
          },
        });
        if (response.data.sucess === true) {
          setlinkvalidity(true);
          functiontosetUserName(response.data.user);
        } else {
          setlinkvalidity(false);
        }
      } catch (err) {
        setlinkvalidity(false);
      }
    }
    isTokenValid();
  }, [props.match.params.token]);

  const { inputChangeHandler, values, errors, functionToSetErrors, functiontosetUserName, setValues } = useResetForm(validateReset);

  const submithandler = (event) => {
    event.preventDefault();
    functionToSetErrors(validateReset(values));
    let errorObject = validateReset(values);
    let countofErrors = Object.keys(errorObject).length;

    if (countofErrors === 0 && islinkvalid) {
      setUpdateStatus({
        isLoading: true,
        error: false,
        updated: false
      });

      const user = {
        name: values.username,
        newpassword: values.newpassword
      };

      axios.put(`${API_BASE_URL}/updatepassword`, user)
        .then(res => {
          if (res.data.sucess === true) {
            setUpdateStatus({
              isLoading: false,
              error: false,
              updated: true
            });
          } else {
            setUpdateStatus({
              isLoading: false,
              error: true,
              updated: false
            });
          }
        }).catch(() => {
          setUpdateStatus({
            isLoading: false,
            error: true,
            updated: false
          });
        });
    }
    setValues({
      ...values,
      newpassword: '',
      confirmnewpassword: ''
    });
  };

  return (
    <div className="resetpassword-container">
      <FormLogo />

      {stausofUpdate.isLoading && <h3 style={{ textAlign: 'center', fontSize: '14px', marginBottom: '10px' }}>Updating...</h3>}
      
      {stausofUpdate.updated && (
        <div id='feedbacksucess' className='animate__animated animate__bounceIn'>
          <CheckCircleIcon />
          <h3>Password updated successfully</h3>
        </div>
      )}

      {stausofUpdate.error && (
        <div id='feedbackfail' className='animate__animated animate__bounceIn'>
          <ErrorOutlineIcon />
          <h3>Error in password update</h3>
        </div>
      )}

      {islinkvalid ? (
        <div className="form animate__animated animate__fadeIn">
          <h2 className="form__title">Create new password</h2>
          <p>We'll ask for this password whenever you sign in.</p>
          <form onSubmit={submithandler}>
            <div className="form-group">
              <label htmlFor="newpassword">New password</label>
              <input
                type="password"
                id="newpassword"
                name="newpassword"
                placeholder='At least 6 characters'
                className="form__input"
                value={values.newpassword}
                onChange={inputChangeHandler}
                ref={inputRef}
                autoComplete="new-password"
              />
              {errors.newpassword && (
                <p id='errormessage' className='animate__animated animate__fadeIn'>
                  <i className="fas fa-exclamation-circle"></i> {errors.newpassword}
                </p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="confirmnewpassword">Re-enter password</label>
              <input
                type="password"
                id="confirmnewpassword"
                name='confirmnewpassword'
                className="form__input"
                value={values.confirmnewpassword}
                onChange={inputChangeHandler}
                autoComplete="new-password"
              />
              {errors.confirmnewpassword && (
                <p id='errormessage' className='animate__animated animate__fadeIn'>
                  <i className="fas fa-exclamation-circle"></i> {errors.confirmnewpassword}
                </p>
              )}
            </div>

            <button className="form__button" type="submit">
              Save changes and Sign-In
            </button>
          </form>
        </div>
      ) : (
        <div id="invalidlink">
          <h3>Invalid Password Reset Link</h3>
          <p>This link is no longer valid. Please try resetting your password again.</p>
          <div className="invalid-actions">
            <Link to="/" id="go">Cancel</Link>
            <Link to="/forgotpassword" id="go">Reset Password</Link>
          </div>
        </div>
      )}

      {islinkvalid && (
        <Link to='/signin' id='gotosignin'>
          Sign-In
        </Link>
      )}

      <FormFooter />
    </div>
  );
};

export default ResetPassword;
