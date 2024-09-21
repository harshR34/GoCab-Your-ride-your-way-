import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-5">
      <div className="container">
        <div className="row">
          <div style={{display:"flex",flexDirection:"column"}}>
          <div>
          {/* GoCab logo and Help Center */}
          <div className="col-md-3 mb-4">
            <h4>GoCab</h4>
            <a href="#" className="text-white text-decoration-none">Visit Help Center</a>
          </div>
          </div>


          <div style={{display:"flex",flexDirection:"row",marginTop:"5vh"}}>
          {/* Company Links */}
          <div className="col-md-2 mb-4">
            <h5>Company</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-white text-decoration-none">About us</a></li>
              <li><a href="#" className="text-white text-decoration-none">Our offerings</a></li>
              <li><a href="#" className="text-white text-decoration-none">Newsroom</a></li>
              <li><a href="#" className="text-white text-decoration-none">Investors</a></li>
              <li><a href="#" className="text-white text-decoration-none">Blog</a></li>
              <li><a href="#" className="text-white text-decoration-none">Careers</a></li>
              <li><a href="#" className="text-white text-decoration-none">Autonomous</a></li>
              <li><a href="#" className="text-white text-decoration-none">GoCab AI</a></li>
              <li><a href="#" className="text-white text-decoration-none">Gift cards</a></li>
            </ul>
          </div>

          {/* Products Links */}
          <div className="col-md-2 mb-4">
            <h5>Products</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-white text-decoration-none">Ride</a></li>
              <li><a href="#" className="text-white text-decoration-none">Drive</a></li>
              <li><a href="#" className="text-white text-decoration-none">Deliver</a></li>
              <li><a href="#" className="text-white text-decoration-none">Eat</a></li>
              <li><a href="#" className="text-white text-decoration-none">GoCab for Business</a></li>
              <li><a href="#" className="text-white text-decoration-none">GoCab Freight</a></li>
            </ul>
          </div>

          {/* Global citizenship Links */}
          <div className="col-md-3 mb-4">
            <h5>Global citizenship</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-white text-decoration-none">Safety</a></li>
              <li><a href="#" className="text-white text-decoration-none">Diversity and Inclusion</a></li>
              <li><a href="#" className="text-white text-decoration-none">Sustainability</a></li>
            </ul>
          </div>

          {/* Travel Links */}
          <div className="col-md-2 mb-4">
            <h5>Travel</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-white text-decoration-none">Reserve</a></li>
              <li><a href="#" className="text-white text-decoration-none">Airports</a></li>
              <li><a href="#" className="text-white text-decoration-none">Cities</a></li>
            </ul>
          </div>
        </div>
        </div>
        </div>

        {/* Social Media Icons */}
        <div className="row text-center mb-4">
          <div className="col">
            <a href="#" className="text-white mx-2">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="text-white mx-2">
              <i className="fab fa-x-twitter"></i>
            </a>
            <a href="#" className="text-white mx-2">
              <i className="fab fa-youtube"></i>
            </a>
            <a href="#" className="text-white mx-2">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="#" className="text-white mx-2">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>

        {/* App Store Buttons */}
        <div className="row text-center mb-4">
          <div className="col">
            <a href="#" className="btn btn-outline-light btn-sm mx-2">
              <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" style={{ width: '120px' }} />
            </a>
            <a href="#" className="btn btn-outline-light btn-sm mx-2">
              <img src="https://developer.apple.com/app-store/marketing/guidelines/images/badge-example-preferred_2x.png" alt="App Store" style={{ width: '120px' }} />
            </a>
          </div>
        </div>

        {/* Language and Location Links */}
        <div className="row text-center mb-4">
          <div className="col">
            <a href="#" className="text-white text-decoration-none mx-3">
              <i className="fas fa-globe"></i> English
            </a>
            <a href="#" className="text-white text-decoration-none mx-3">
              <i className="fas fa-map-marker-alt"></i> Kochi
            </a>
          </div>
        </div>

        {/* Copyright and Policies */}
        <div className="row text-center">
          <div className="col">
            <p className="mb-1">© 2024 GoCab Technologies Inc.</p>
            <a href="#" className="text-white text-decoration-none mx-2">Privacy</a>
            <a href="#" className="text-white text-decoration-none mx-2">Accessibility</a>
            <a href="#" className="text-white text-decoration-none mx-2">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
