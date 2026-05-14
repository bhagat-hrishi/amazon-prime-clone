// react imports and packages
import React, { useEffect, useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from 'axios';
import API_BASE_URL from '../../config';

// normal components imports
import FormFooter from "../Form/FormFooter/FormFooter";
import FormLogo from '../Form/FormLogo/FormLogo';

// scss import and images import and material ui and context
import "./SignUp.scss";
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';

// import custom hooks
import useForm from './useSignUpForm';

// form validation
import validate from './validateInfo';

const SignUp = () => {
  const inputRef = useRef(null);
  const history = useHistory();
  const [signuperrormessage, setSignUpMessage] = useState(null);

  useEffect(() => {
    document.title = 'Prime Registration';
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const { inputChangeHandler, values, errors, functionToSetErrors } = useForm(validate);

  const submithandler = (event) => {
    event.preventDefault();
    functionToSetErrors(validate(values));

    let errorObject = validate(values);
    let countofErrors = Object.keys(errorObject).length;

    if (countofErrors === 0) {
      const user = {
        name: values.name,
        email: values.email,
        password: values.password
      };

      axios.post(`${API_BASE_URL}/signup`, user)
        .then(res => {
          if (res.data.sucess === true && res.data.message === 'User saved succesfully') {
            sessionStorage.setItem('name', res.data.createdUser.name);
            sessionStorage.setItem('_id', res.data.createdUser._id);
            sessionStorage.removeItem('Guest');
            history.push('/home');
          } else if (res.data.sucess === false && res.data.message === 'User all ready exist') {
            setSignUpMessage(res.data.message);
          }
        }).catch((error) => {
          console.log(error);
          setSignUpMessage("Something went wrong. Please try again.");
        });
    }
  };

  return (
    <div className="signup-container">
      <FormLogo />

      {(errors.name || errors.email || errors.password || errors.confirmpassword || signuperrormessage) && (
        <div id='errordiv' className='animate__animated animate__fadeIn'>
          <div id='erroricon'>
            <ReportProblemOutlinedIcon style={{ fontSize: 30, color: '#c40000' }} />
          </div>
          <div id='errorinfo'>
            <h4>There was a problem</h4>
            <ol>
              {errors.name && <li>{errors.name}</li>}
              {errors.email && <li>{errors.email}</li>}
              {errors.password && <li>{errors.password}</li>}
              {errors.confirmpassword && <li>{errors.confirmpassword}</li>}
              {signuperrormessage && <li>{signuperrormessage}</li>}
            </ol>
          </div>
        </div>
      )}

      <div className="form animate__animated animate__fadeIn">
        <h2 className="form__title">Create account</h2>
        <form onSubmit={submithandler} id='signupform'>
          <div className="form-group">
            <label htmlFor="name">Your name</label>
            <input
              type="text"
              id="name"
              className="form__input"
              ref={inputRef}
              name='name'
              value={values.name}
              onChange={inputChangeHandler}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name='email'
              className="form__input"
              value={values.email}
              onChange={inputChangeHandler}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder='At least 6 characters'
              className="form__input"
              value={values.password}
              onChange={inputChangeHandler}
            />
            <div className="password-info">
              <i className="fa fa-info-circle"></i>
              <span>Passwords must be at least 6 characters.</span>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="confirmpassword">Re-enter password</label>
            <input
              type="password"
              id="confirmpassword"
              name='confirmpassword'
              className="form__input"
              value={values.confirmpassword}
              onChange={inputChangeHandler}
            />
          </div>

          <button className="form__button" type="submit">
            Create your Amazon account
          </button>
        </form>

        <p className="form_condition">
          By creating an account, you agree to Amazon's{" "}
          <Link to='/conditions'>Conditions of Use</Link> and{" "}
          <Link to='/privacy'>Privacy Notice</Link>.
        </p>

        <div className="already-have-account">
          Already have an account?{" "}
          <Link to="/signin" className="goToSignUp">
            Sign-In
          </Link>
        </div>
      </div>

      <FormFooter />
    </div>
  );
};

export default SignUp;
