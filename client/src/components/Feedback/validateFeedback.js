
const validteFeedback = (values) =>{
    let errors = {}

    if(values.message.trim() === '' ){
        errors.message =  'Enter your message';
    }
    

    // console.log(errors)
    return errors;
}

export default validteFeedback;