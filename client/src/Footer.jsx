import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import PageRouter from './PageRouter';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
        <div className="footer-left">
          {/* Picture on the right */}
          <a href="https://www.cornell.edu/" target="_blank" rel="noopener noreferrer">
            <img src="cornell.png" alt="Footer Picture" className="styled-image" />
          </a>
          <a href="https://esw.engineering.cornell.edu/" target="_blank" rel="noopener noreferrer">
            <img src="esw.png" alt="Footer Picture" className="styled-image2" />
          </a>
          {/* Add more links as needed */}
        </div>
        <div className="footer-right">
          {/* Contact section */}
          <h2>Contact Us</h2>
          <p>Email: foodsolutions@cornell.edu</p>
          <div className="copyright">
            {`Copyright © ESW ${year}`}
          </div>
        </div>

    </footer>
  );
};

export default Footer;