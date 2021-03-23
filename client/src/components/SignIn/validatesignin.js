const validatesignin = (values) =>{
    let errors = {}
    
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
    
    // console.log(errors)
    return errors;
}

export default validatesignin;