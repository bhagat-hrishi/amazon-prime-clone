// react imports and packages
import React,{ useEffect ,useState,useRef} from "react";
import { Link ,useHistory } from "react-router-dom";

import axios from 'axios'
//noraml components imports
import FormFooter from "../Form/FormFooter/FormFooter";
import FormLogo from '../Form/FormLogo/FormLogo';
// scss import and images import and material ui  and context
import "./SignUp.scss";
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';

// import custom hooks
import useForm from './useSignUpForm'

// form validation
import validate from './validateInfo'
import { blue } from "@material-ui/core/colors";

const SignUp = () => {

 
     let inputRef = useRef(null);
     const history = useHistory();

     const [signuperrormessage , setSignUpMessage ] = useState(null);
     useEffect(() => {
         inputRef.current.focus()
         document.title = 'Prime Registration'
     }, [])

    const {inputChangeHandler  ,values , errors,functionToSetErrors} = useForm(validate);

     const submithandler = (event)=>{
       
        event.preventDefault();
        
        // set error messages
        functionToSetErrors(validate(values))
        
        let errorObject = validate(values);
        let countofErrors = Object.keys(errorObject).length;
        // console.log( 'count of errors',countofErrors)
        if(countofErrors == 0){
            const user = {
              name : values.name,
              email : values.email,
              password : values.password
            }
            //send data to BackEnd
                axios.post('https://myprimecloneserver.herokuapp.com/signup',user)
                .then(res =>{
                    // if sucess go to login
                    if(res.data.sucess === true && res.data.message === 'User saved succesfully'){
                      console.log(res.data)
                      sessionStorage.setItem('name',res.data.createdUser.name);
                      sessionStorage.setItem('_id',res.data.createdUser._id);
                      sessionStorage.removeItem('Guest');
                      history.push('/home');
                      // return;

                    }  
                    else if(res.data.sucess === false && res.data.message === 'User all ready exist'){
                        setSignUpMessage(res.data.message)
                    }
            }).catch((error)=>{
              console.log(error)
            }) //axios part End
        }
     }
    

  return (
    <React.Fragment>
      <FormLogo/>
      <div>
       

        <div >
          {(errors.name || errors.email || errors.password || errors.confirmpassword ) ?
                <div id='errordiv' className='animate__animated animate__fadeIn'>
                  <div id='erroricon'>
                    <ReportProblemOutlinedIcon style={{fontSize:30,fontWeight:'thinner',color:'#c40000'}}/>
                  </div>
                  <div id='errorinfo'>
                    <h4>There was a problem</h4>
                    <ol>
                        {errors.name  && <li>{errors.name}</li>}
                        {errors.email  && <li>{errors.email}</li>} 
                        {errors.password  && <li>{errors.password}</li>} 
                        {errors.confirmpassword  && <li>{errors.confirmpassword}</li>} 
                    </ol>
                  </div>
                </div>
                :null  
          
          }
          {
            signuperrormessage  && <div id='errordiv' style={{color:'#c40000',textAlign:'center',padding:'20px'}}>{signuperrormessage} please go to signin</div>
          }
        </div>
        <div
          className="form animate__animated animate__fadeInDown"
        >
          <h2 className="form__title">Create account</h2>
          <br />
          <form onSubmit={submithandler} id='signupform'>
            <div>
              <label>Your name</label>
              <input 
                type="text" 
                className="form__input" 
                ref={inputRef}
                name = 'name'
                value = {values.name}
                onChange = {inputChangeHandler}
              ></input>
            </div>
            <br />
            <div>
              <label>Email</label>
              <input 
                type="email" 
                name = 'email'
                className="form__input"
                value = {values.email}
                onChange = {inputChangeHandler}
              ></input>
            </div>
            <br />
            <div>
              <label>Password</label>
              <input 
                type="password" 
                name="password" 
                placeholder=' At least 6 characters'
                className="form__input" 
                value = {values.password}
                onChange = {inputChangeHandler}
              ></input>
              <p style={{ fontSize: "small" }}>
                <i className="fa fa-info-circle" style={{color:blue}}></i>Passwords must be at least
                6 characters.
              </p>
            </div>
            <br />
            <div>
              <label>Re-enter password</label>
              <input 
                type="password" 
                name ='confirmpassword'
                className="form__input"
                value = {values.confirmpassword}
                onChange = {inputChangeHandler}
              ></input>
            </div>
            <br />
            <button className="form__button" type="submit">
              Create your Amazon account
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
               
              
            </span>
            .
          </p>

          <br />

          <p style={{ fontSize: "small" }}>
            Already have an account?{" "}
            <Link to="/signin" className="goToSignUp">
              Sign In
            </Link>
          </p>
        </div>
      </div>
      <FormFooter />
    </React.Fragment>
  );
};

export default SignUp;
