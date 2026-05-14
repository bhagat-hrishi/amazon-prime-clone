import React from 'react'
import {Link} from 'react-router-dom'

// images import
import formlogo from '../../../assets/images/formlogo.png';

const FormLogo = ()=>{
    return (
        <div className="form-logo-container">
            <Link to="/">
                <img src={formlogo} alt="Amazon Prime Video" />
            </Link>
        </div>
    )
}

export default FormLogo
