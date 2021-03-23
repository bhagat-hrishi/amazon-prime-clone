
const validateInfo = (values) =>{
    let errors = {}

    if(values.name.trim() === '' ){
        errors.name =  'Enter your name';
    }
    
    if(!values.email){
        errors.email = 'Enter your name email';
    }else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Email address is invalid';
    }

    if(!values.password){
        errors.password = 'Enter your password';
    } else if((values.password.trim()).length < 6 ){
        errors.password = 'Password At least 6 characters required'
    }
    
    

    if(!values.confirmpassword){
        errors.confirmpassword = 'ReEnter your password';
    }else if((values.confirmpassword.trim()).length < 6){
        errors.confirmpassword = 'ReEntered password At least 6 characters required'
    }else if(values.password !== values.confirmpassword){
        errors.confirmpassword = 'Password does not match'
    }

    // console.log(errors)
    return errors;
}

export default validateInfo;