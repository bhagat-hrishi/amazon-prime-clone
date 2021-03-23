// react imports
import React, { useState ,useRef,useEffect} from "react";
import { Link, useHistory } from "react-router-dom";
import axios from 'axios'
// normal component , scss , context
import FormFooter from "../Form/FormFooter/FormFooter";
import FormLogo from '../Form/FormLogo/FormLogo'
import "./SignIn.scss";
// import custom hooks
import useSigninForm from './useSigninForm'
// form validation
import validatesignin from './validatesignin';


const SignIn = () => {


  const [loginWarning, setLogingWarning] = useState(null);
  let inputRef =useRef(null)
    useEffect(() => {
    //   To change document title
    document.title = 'Amazon Sign-In'
    // Focus input on document load
    inputRef.current.focus();
    }, [])
  const history = useHistory();
  const formSubmitHandler = (event) => {
    event.preventDefault();
    // console.log(values)
    // set error messages
    functionToSetErrors(validatesignin(values))
    
    let errorObject = validatesignin(values);
    let countofErrors = Object.keys(errorObject).length;
    if(countofErrors == 0){
      axios.post('https://myprimecloneserver.herokuapp.com/signin',{
        email : values.email,
        password : values.password
      }).then((response)=>{
        // console.log(response.data);
        
        sessionStorage.setItem('name',response.data.createdUser.name);
        sessionStorage.setItem('_id',response.data.createdUser._id);
        sessionStorage.removeItem('Guest');
        history.push('/home');
      })
      .catch((error)=>{
        if (error.response) {
          // console.log(error.response.data);
          setLogingWarning(error.response.data.message)
        }
        
      })
      
    }
  };

  const goToSignUpPage = (event) => {
    event.preventDefault();
    let path = "/signup";
    history.push(path);
  };


  const {inputChangeHandler  ,values , errors,functionToSetErrors} = useSigninForm(validatesignin);
    
  return (
    <React.Fragment>
      <FormLogo/>

      <div>
        
      <p className='loginwarning'>
        {loginWarning}
        </p>
        <div className="form animate__animated animate__fadeInDown">
          <h2 className="form__title">Sign-In</h2>
          <br />
          <form onSubmit={formSubmitHandler}>
            <div>
              <label>Email</label>
              <input 
                type="email" 
                name = 'email'
                className="form__input"
                value = {values.email}
                onChange = {inputChangeHandler}
                ref={inputRef}
                autoComplete='on'
              />
              
            </div>
            {errors.email  && <p id='errormessage' className='animate__animated animate__fadeIn'> <i className="fas fa-exclamation"></i> {errors.email}</p>}
            <br />
            <div>
              <p id='form__passwordlable'>
                <label>Password</label>
                <Link to='/forgotpassword' id='forgotpassword'>Forgot your password?</Link>
              </p>
              <input 
                type="password" 
                className="form__input"
                name = 'password'
                value = {values.password}
                onChange={inputChangeHandler}
              />
            </div>
            {errors.password  && <p id='errormessage' className='animate__animated animate__fadeIn'> <i className="fas fa-exclamation"></i> {errors.password}</p>}
            <br />
            <button className="form__button" type="submit">
              Sign-In
            </button>
          </form>
          <br />
          <p className="form_condition">
            By continuing, you agree to Amazon's
            <span>
              <Link to='/conditions'>
              Conditions of Use
              </Link>
            </span>
            and
            <span>
              {" "}
              <Link to='privacy'>
                Privacy Notice
              </Link>
            </span>.
          </p>

          <br />
          <br />
          <p className="form_gotologin">
            <span>New to Amazon?</span>
          </p>
          <button className="create-account-button" onClick={goToSignUpPage}>
            Create your Amazon account
          </button>
        </div>
      </div>
      <FormFooter />
    </React.Fragment>
  );
};

export default SignIn;

