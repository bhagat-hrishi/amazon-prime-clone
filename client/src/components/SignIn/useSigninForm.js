// custom hook for react 
import {useState } from 'react'


const useSigninForm = (validate)=>{
    const [values,setValues] = useState({
        email : '',
        password : ''
    });

    const [errors ,  setErrors] = useState({});

    // on change to update values
    const inputChangeHandler = (event)=>{
        // console.log('changed',event.target.name)
        const {name , value } = event.target
        setValues({
            ...values,
            [name] : value
        });

    }

    const functionToSetErrors = (errorArgument)=>{
        setErrors(errorArgument)
    }


    return { inputChangeHandler , values  , errors,functionToSetErrors}
}


export default  useSigninForm;