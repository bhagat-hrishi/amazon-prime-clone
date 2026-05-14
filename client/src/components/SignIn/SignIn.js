// react imports
import React, { useState, useRef, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from 'axios';
import API_BASE_URL from '../../config';

// normal component, scss, context
import FormFooter from "../Form/FormFooter/FormFooter";
import FormLogo from '../Form/FormLogo/FormLogo';
import "./SignIn.scss";

// import custom hooks
import useSigninForm from './useSigninForm';
// form validation
import validatesignin from './validatesignin';

const SignIn = () => {
  const [loginWarning, setLogingWarning] = useState(null);
  const inputRef = useRef(null);
  const history = useHistory();

  useEffect(() => {
    document.title = 'Amazon Sign-In';
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const formSubmitHandler = (event) => {
    event.preventDefault();
    functionToSetErrors(validatesignin(values));

    let errorObject = validatesignin(values);
    let countofErrors = Object.keys(errorObject).length;
    if (countofErrors === 0) {
      axios.post(`${API_BASE_URL}/signin`, {
        email: values.email,
        password: values.password
      }).then((response) => {
        sessionStorage.setItem('name', response.data.createdUser.name);
        sessionStorage.setItem('_id', response.data.createdUser._id);
        sessionStorage.removeItem('Guest');
        history.push('/home');
      }).catch((error) => {
        if (error.response) {
          setLogingWarning(error.response.data.message);
        } else {
          setLogingWarning("Something went wrong. Please try again.");
        }
      });
    }
  };

  const goToSignUpPage = (event) => {
    event.preventDefault();
    history.push("/signup");
  };

  const { inputChangeHandler, values, errors, functionToSetErrors } = useSigninForm(validatesignin);

  return (
    <div className="signin-container">
      <FormLogo />

      {loginWarning && (
        <div className="loginwarning">
          <i className="fas fa-exclamation-triangle" style={{ marginRight: '8px' }}></i>
          {loginWarning}
        </div>
      )}

      <div className="form animate__animated animate__fadeIn">
        <h2 className="form__title">Sign-In</h2>
        <form onSubmit={formSubmitHandler}>
          <div className="form-group">
            <label htmlFor="email">Email or mobile phone number</label>
            <input
              type="email"
              id="email"
              name='email'
              className="form__input"
              value={values.email}
              onChange={inputChangeHandler}
              ref={inputRef}
              autoComplete='on'
            />
            {errors.email && (
              <p id='errormessage' className='animate__animated animate__fadeIn'>
                <i className="fas fa-exclamation-circle"></i> {errors.email}
              </p>
            )}
          </div>

          <div className="form-group">
            <div id='form__passwordlable'>
              <label htmlFor="password">Password</label>
              <Link to='/forgotpassword' id='forgotpassword'>Forgot your password?</Link>
            </div>
            <input
              type="password"
              id="password"
              className="form__input"
              name='password'
              value={values.password}
              onChange={inputChangeHandler}
            />
            {errors.password && (
              <p id='errormessage' className='animate__animated animate__fadeIn'>
                <i className="fas fa-exclamation-circle"></i> {errors.password}
              </p>
            )}
          </div>

          <button className="form__button" type="submit">
            Sign-In
          </button>
        </form>

        <p className="form_condition">
          By continuing, you agree to Amazon's{" "}
          <Link to='/conditions'>Conditions of Use</Link> and{" "}
          <Link to='/privacy'>Privacy Notice</Link>.
        </p>
      </div>

      <div className="new-to-amazon">
        <h5>New to Amazon?</h5>
      </div>

      <button className="create-account-button" onClick={goToSignUpPage}>
        Create your Amazon account
      </button>

      <FormFooter />
    </div>
  );
};

export default SignIn;

