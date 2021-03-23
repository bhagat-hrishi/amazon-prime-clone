// react import
import React from "react";
import { Link } from "react-router-dom";

// scss import
import "./FormFooter.scss";

const FormFooter = () => {
  return (
    <div className="form-footer">
        {/* for footer line */}
      <hr className="form-footer__line" />
      {/* for footer links */}
      <div className="form-footer__links">
        <Link to="/conditions" className='form-footer__link-item'>Conditions of Use</Link>
        <Link to="/privacy" className='form-footer__link-item'> Privacy Notice </Link>
        <Link to="/help" className='form-footer__link-item'>Help</Link>
      </div>
    </div>
  );
};

export default FormFooter;
