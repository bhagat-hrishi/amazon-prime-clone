const validateReset = (values) =>{
    let errors = {}

    
    
    

    if(!values.newpassword){
        errors.newpassword = 'Enter your new password';
    } else if((values.newpassword.trim()).length < 6 ){
        errors.newpassword = 'Password At least 6 characters required'
    }
    
    

    if(!values.confirmnewpassword){
        errors.confirmnewpassword = 'ReEnter your new password';
    }else if((values.confirmnewpassword.trim()).length < 6){
        errors.confirmnewpassword = 'ReEntered new password At least 6 characters required'
    }else if(values.newpassword !== values.confirmnewpassword){
        errors.confirmnewpassword = 'Password does not match'
    }

    // console.log(errors)
    return errors;
}

export default validateReset;