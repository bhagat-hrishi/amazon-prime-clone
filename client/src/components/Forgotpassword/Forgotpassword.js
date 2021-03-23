import React,{useEffect, useState,useRef} from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
// images import and icons and scss
import formlogo from "../../assets/images/formlogo.png";
import "./Forgotpassword.scss";
// normal component import
import FormFooter from "../Form/FormFooter/FormFooter";

const Forgotpassword = () => {
    const [email,setEmail] = useState("");
    const[emailnotEnteredError,setemailnotEnteredError]=useState(false);
    const [isemailfound , setEmailFound ]  =  useState(true);
    const [isemailSend , setEmailSend]  = useState(false);
    let inputRef = useRef(null)
    useEffect(() => {
    //   To change document title
    document.title = 'Amazon Password Assistance'
  // Focus input on document load
    inputRef.current.focus();
    }, [])

    const inputChangeHandler = (event)=>{
      // console.log(event.target)
      setEmail(event.target.value);
    }
    const formSubmitHandler =(event)=>{
        event.preventDefault();
        const user = {
          email : email
        }
        if(email.trim()===''){
          setemailnotEnteredError(true);
        }else{
        setemailnotEnteredError(false);
            axios.post('https://myprimecloneserver.herokuapp.com/forgotpassword',user)
          .then(result =>{
            // console.log(result);
              let message  = result.data.message ;
              let sucess = result.data.sucess;
              if(!sucess){
                setEmailFound(false);
                setEmailSend(false);
              }
              if(sucess){
                setEmailFound(true);
                setEmailSend(true);
                setEmail('');
              }

          })
          .catch(err =>{
              console.log('Error in sending email',err);
          })
        
        }//else end
    }
  return (
    <React.Fragment>
      <div>
        <Link className='formlogo' to='/'>
          <img src={formlogo} alt='formlogo'></img>
        </Link>
        {
          isemailfound ? null :
          <div id='errordiv' style={{color:'#c40000'}} className='animate__animated animate__fadeIn'>
              Email Address is not present
          </div>  
        }
        {
          isemailSend ? <div id='sucessemail' className='animate__animated animate__bounceIn'>
              <h4>Your password reset email has sent !</h4>
              <p>
                we have send password reset email to your email address. 
                Please check your inbox and continue
              </p>
          </div> : null
        }
        <div className='form animate__animated animate__fadeInDown'>
          <h2 className='form__title'>Password assistance</h2>
          <br />
          <p>
            Enter the email address  associated with your
            Amazon account.
          </p>
          <form onSubmit={formSubmitHandler}>
            <div>
              <label>Email</label>
              <input
                type='email'
                className='form__input'
                ref={inputRef}
                name = 'email'
                value={email}
                onChange={inputChangeHandler}
              ></input>
            </div>
            {
              emailnotEnteredError ? 
              <p id='errormessage' className='animate__animated animate__fadeIn'> 
                  <i className="fas fa-exclamation"></i>Please Enter email
              </p> : null
            }
            <br />

            <br />
            <button className='form__button' type='submit'>
              Send Password Link
            </button>
          </form>
          <br />
        </div>
      </div>
      <FormFooter />
    </React.Fragment>
  );
};

export default Forgotpassword;
