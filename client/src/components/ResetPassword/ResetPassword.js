// react imports
import React,{useEffect, useState,useRef} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
// scss  and image and icon
import './ResetPassword.scss'
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import formlogo from "../../assets/images/formlogo.png";
// for state and errors
import validateReset from './validateReset'
import useResetForm from './useResetForm'


const ResetPassword = (props)=>{
	const inputRef = useRef(null);
    const [islinkvalid , setlinkvalidity] = useState(true);
    const [stausofUpdate , setUpdateStatus] = useState({
        isLoading : false,
        error : false,
        updated : false
    })

    useEffect(() => {
      document.title = 'Reset password'    
      if(islinkvalid){
        inputRef.current.focus();
      }
      // console.log(props.match.params.token);
      async function isTokenValid(){
        await axios.get('https://myprimecloneserver.herokuapp.com/checktoken',{
          params:{
            resetPasswordToken : props.match.params.token
          },
        }).then(response =>{
              // console.log('response',response.data);
              if(response.data.sucess == true){
                setlinkvalidity(true)
                functiontosetUserName(response.data.user);
              }else{
                setlinkvalidity(false);
                
              }
        })
      }
      isTokenValid();
  },[])

    const {inputChangeHandler  ,values , errors,functionToSetErrors,functiontosetUserName,setValues} = useResetForm(validateReset);
    
    const submithandler =(event)=>{
      event.preventDefault();
          // set error messages
      functionToSetErrors(validateReset(values))
          let errorObject = validateReset(values);
          let countofErrors = Object.keys(errorObject).length;
          // console.log( 'count of errors',countofErrors)

			if(countofErrors==0 && islinkvalid)
      {
				setUpdateStatus({
					isLoading : true,
					error : false,
					updated : false
				})
              
        const user = {
          name : values.username,
          newpassword : values.newpassword
        }
          //   send data to BackEnd
                  axios.put('https://myprimecloneserver.herokuapp.com/updatepassword',user)
                  .then(res =>{
                      // if sucess go to login
                      if(res.data.sucess === true){
                        setUpdateStatus({
                          isLoading : false,
                          error : false,
                          updated : true
                        })
                      }else if(res.data.sucess === false){
                      setUpdateStatus({
                        isLoading : false,
                        error : true,
                        updated : false
                      })
                    }
                  }) //axios part End
      }//if end
      setValues({
        username : '',
        newpassword : '',
        confirmnewpassword : ''
      })
    }
    
    return (
        <React.Fragment>
            <Link className="formlogo" to="/">
            <img src={formlogo} alt="formlogo"></img>
            </Link>

			{/* loading while updaing password */}
			{stausofUpdate.isLoading ? <h3 style={{textAlign:'center'}}>Updating....</h3>:null}
      {/* sucess */}
			{
				stausofUpdate.updated ? 
				<div id='feedbacksucess' style={{marginBottom:'40px'}} className='animate__animated animate__bounceIn'>
				<CheckCircleIcon/>
					<h3>Password updated sucessfully</h3>
		  		</div> : null
			}
			{/* if fail */}
			{
				stausofUpdate.error ?
				<div id='feedbackfail' style={{marginBottom:'40px'}} className='animate__animated animate__bounceIn'>
				<ErrorOutlineIcon/>
				<h3>Error in password update</h3>
		  		</div> : null
			}
			{
				islinkvalid ? 
				<div className="form animate__animated animate__fadeInDown" >
            <h2 className="form__title">Change Password</h2>
            <br />
            <form onSubmit={submithandler} id='signupform'>
            
            <br />
            <div>
              <label>New Password</label>
              <input 
                type="password" 
                name="newpassword" 
                placeholder=' At least 6 characters'
                className="form__input" 
                value = {values.newpassword}
                onChange = {inputChangeHandler}
                ref={inputRef}
                autoComplete="on"
              ></input>
            </div>
            {errors.newpassword  && <p id='errormessage' className='animate__animated animate__fadeIn'> <i className="fas fa-exclamation"></i> {errors.newpassword}</p>}
            <br />
            <div>
              <label>Re-enter New password</label>
              <input 
                type="password" 
                name ='confirmnewpassword'
                className="form__input"
                value = {values.confirmnewpassword}
                onChange = {inputChangeHandler}
                autoComplete="on"
              ></input>
            </div>
            {errors.confirmnewpassword  && <p id='errormessage' className='animate__animated animate__fadeIn'> <i className="fas fa-exclamation"></i> {errors.confirmnewpassword}</p>}
            <br />
            <button className="form__button" type="submit">
                Change Password
            </button>
          </form>

          
        </div>
		 : 
		 <div id="invalidlink">
			 <h3>Invalid Password Reset Link</h3>
			  <p>This link is no longer valid . Please try resetting your password again</p>
			  <div>
				<Link to="/" id="go">Cancel</Link>
				<Link to="/forgotpassword" id="go">Reset Password</Link>
			  </div>
		 </div>
		}
    {
      islinkvalid ? <Link to='/signin' id='gotosignin'>
                      Signin
                    </Link> :null
    }
        </React.Fragment>
        
    )
}

export default ResetPassword
