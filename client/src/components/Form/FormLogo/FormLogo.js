import React from 'react'
import {Link} from 'react-router-dom'

// images import
import formlogo from '../../../assets/images/formlogo.png';

const FormLogo = ()=>{
    return (
        <>
            <Link className="formlogo" to="/">
            <img src={formlogo} alt="formlogo"></img>
            </Link>
        </>
    )
}

export default FormLogo
