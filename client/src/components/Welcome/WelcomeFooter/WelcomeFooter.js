// react imports
import React from "react";
import { Link } from "react-router-dom";
import footerlogo from "../../../assets/images/welcome/footerlogo.png";

// scss imports
import './WelcomeFooter.scss'

function WelcomeFooter() {
  return (
    <div className="welcomefooter">
      {/* logo of footer */}
      <div className="welcomefooter__logo">
        <Link to="/">
          <img src={footerlogo} alt="footerlogo"></img>
        </Link>
      </div>
      {/* links for footer */}
      <div className="welcomefooter__links">
        <Link className="welcomefooter__links__link-item" to="/privacy">
          Amazon Terms and Privacy Notice
        </Link>
        <Link className="welcomefooter__links__link-item" to="/feedback">
          Send Us feedback/Suggestion
        </Link>
        <Link className="welcomefooter__links__link-item" to="/help">
          Help
        </Link>
      </div>
      {/* Extra 😜*/}
      <div className="welcomefooter__last">
        No Copyright © issue Feel Free to Copy 😜
      </div>
    </div>
  );
}

export default WelcomeFooter;
