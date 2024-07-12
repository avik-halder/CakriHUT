import React from 'react'
import { Link } from 'react-router-dom';
import './FooterDiv.css'
const FooterDiv = () => {

    const getHomeLink = () => {
        const currentPath = window.location.pathname;
        if (currentPath === "/") {
          return "/";
        } else if (currentPath === "/User" || currentPath === "/PostJob") {
          return "/User";
        } else if (currentPath === "/Contact") {
          return null;
        } else if (currentPath === "/Admin") return "/Admin";
        return "/";
      };

  return (
    <>
    <div className="Footer">
      <div className='container'>
        <div className="row">
            <div className="col-md-6 col-lg-5 col-12 ft-1">
                <h2><span>Cakri</span>HUT</h2>
                <p>Empowering careers, one click at a time.</p>
                <div className="social-icons">
                    <Link to="#"><i className="fa-brands fa-facebook"></i></Link>
                    <Link to="#"><i className="fa-brands fa-twitter"></i></Link>
                    <Link to="#"><i className="fa-brands fa-instagram"></i></Link>
                    <Link to="#"><i className="fa-brands fa-linkedin-in"></i></Link>
                    <Link to="#"><i className="fab fa-youtube"></i></Link>
                </div>
            </div>
            <div className="col-md-6 col-lg-3 col-12 ft-2">
                <h5>Quick Links</h5>
                <ul>
                    <li className="foot-item">
                        <Link className="foot-link" to={getHomeLink()}> Home</Link>
                    </li>
                    <li className="foot-item">
                        <Link className="foot-link" to="#"> Blog</Link>
                    </li>
                    <li className="foot-item">
                        <Link className="foot-link" to="#"> About</Link>
                    </li>
                    <li className="foot-item">
                        <Link className="foot-link" to="#"> FAQ</Link>
                    </li>
                    <li className="foot-item">
                        <Link className="foot-link" to="#"> Contact</Link>
                    </li>
                </ul>
            </div>
            <div className="col-md-6 col-lg-4 col-12 ft-3">
                <h5>Contact Info</h5>
                <p><i className="fa-solid fa-phone-volume"></i> +8801798709761</p>
                <p><i className="fa-solid fa-envelope"></i> cakrihut@gmail.com</p>
                <p><i className="fa-solid fa-paper-plane"></i> Kaliakoir, Gazipur</p>
            </div>
        </div>
      </div>
      
    </div>
    <div className="last-footer">
    <p>Cakri_HUT © 2024</p>
</div>
</>
  )
}

export default FooterDiv
