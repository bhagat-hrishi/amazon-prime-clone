import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './PageNotFound.scss'
import error404 from '../../assets/gif/error404.gif'

const PageNotFound = () => {
  useEffect(() => {
    document.title = 'Prime Video: Page Not Found';
  }, []);

  return (
    <div className="pagenotfound-container">
      <div className="pagenotfound-bg-accent"></div>
      
      <div className="pagenotfound-visual animate__animated animate__zoomIn">
        <img src={error404} alt="404 Lost in Space" />
      </div>

      <div className="pagenotfound-content animate__animated animate__fadeInUp">
        <h1>404</h1>
        <h2>Oops! We can't find that page.</h2>
        <p>
          We're sorry, but the page you are looking for doesn't exist or has been moved. 
          Don't worry, you can get back to the action by clicking below.
        </p>

        <div className="pagenotfound-actions">
          <Link to="/" className="home-button">
            Go to Home
          </Link>
          <Link to="/movies" className="browse-link">
            Browse Movies
          </Link>
          <Link to="/tvshows" className="browse-link">
            TV Shows
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PageNotFound
