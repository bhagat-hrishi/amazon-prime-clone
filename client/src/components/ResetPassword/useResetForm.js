// custom hook for react 

import {useState } from 'react'


const useResetForm = ()=>{
    const [values,setValues] = useState({
        username : '',
        newpassword : '',
        confirmnewpassword : ''
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

    const functiontosetUserName =(name =>{
        setValues({
            ...values,
            username : name
        })
        // console.log(values)
    })

    return { inputChangeHandler , values  , errors,functionToSetErrors,functiontosetUserName,setValues}
}


export default  useResetForm;