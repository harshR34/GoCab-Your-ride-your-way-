import Navbar from "./Navbar";
import Footer from "./Footer";
import { Link, useNavigate } from "react-router-dom";
import './Ride.css'
import { useState } from "react";
import illustrationSafety from './images/illustration-safety.webp'
import whyDriveWithUs from './images/whyDriveWithUs_desktop.svg'
import calander from './images/calendar.svg'
import money from './images/money.svg'
import support from './images/support.svg'
import requirement from './images/requirement.svg'
import document from './images/document.svg'
import documentCheck from './images/documentCheck.svg'
import safetyCenter from './images/Safety-Center.svg'
import support24X7 from './images/24_7-Support.svg'
import CommunityGuidelines from './images/Community-Guidelines.svg'
import driverIllusta from './images/gocabDrive-illustration (3).png'

const Driver = () => {
  const [hoveredLink, setHoveredLink] = useState(null);
  const token = localStorage.getItem('authTokens');
  const navigate = useNavigate();
  const handleRedirect = () =>{
    if(token){
      navigate("/drive-confirmation");
    }
    else{
      navigate("/login");
    }
  }

  const linkStyle1 = {
    color: hoveredLink === 'link1' ? 'gray' : 'black', // Example hover 
    fontSize: "14px"
  };

  const linkStyle2 = {
    color: hoveredLink === 'link2' ? 'gray' : 'black',
    fontSize: "14px"
  };

  const linkStyle3 = {
    color: hoveredLink === 'link3' ? 'gray' : 'black',
    fontSize: "14px"
  };
  const linkStyle4 = {
    color: hoveredLink === 'link4' ? 'gray' : 'black',
    fontSize: "14px"
  };
  const account = {
    color: hoveredLink === 'account' ? '#f1f1f1' : 'white',
    textDecoration: hoveredLink === 'account' ? 'underline' : 'none',
    fontWeight: "300",
    fontFamily: "Poppins, sans-serif",
  }
  const faqItems = [
    {
      question: 'Can I drive with GoCab in my city?',
      answer: 'GoCab is available in hundreds of cities worldwide.',
    },
    {
      question: 'What are the requirements to drive with GoCab?',
      answer: 'You must meet the minimum age to drive in your city, have an eligible mode of transportation, and submit required documents, including a valid driver’s license. Drivers in the US must also pass a background screening and have at least one year of licensed driving experience.',
    },
    {
      question: 'Is the GoCab platform safe?',
      answer: 'Your safety matters to us. Uber has a Global Safety Team dedicated to doing our part to help prevent incidents. Learn more about the safety features in the app, as well as safeguards such as GPS tracking and phone anonymization.',
    },
    {
      question: 'Do I need my own car?',
      answer: 'If you want to drive with Uber but need a car, you can get a car from one of our vehicle partners or from a fleet partner in select markets. Please note that vehicle options may vary by city.',
    },
  ];
  return (
    <>
      <div className='homepage-container' style={{ backgroundColor: "white" }}>
        <Navbar />
        <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: 'white',zIndex:"inherit" }}>
          <div className="container-fluid">
            {/* Left-aligned link */}
            <Link style={{ fontSize: "25px", fontWeight: "500" }} className="navbar-brand ms-lg-5" to="/Driver" id="rideLink">
              Driver
            </Link>

            {/* Right-aligned link */}
            <div className="d-flex pl-5" id="airportLink">
              <div>
                <Link
                  style={linkStyle1}
                  className="navbar-brand"
                  name="1"
                  onMouseEnter={() => setHoveredLink('link1')}
                  onMouseLeave={() => setHoveredLink(null)}
                  to="/Driver"
                >
                  Overview
                </Link>
              </div>
              <div>
                <Link
                  style={linkStyle2}
                  className="navbar-brand"
                  name="1"
                  onMouseEnter={() => setHoveredLink('link2')}
                  onMouseLeave={() => setHoveredLink(null)}
                  to="/requirement"
                >
                  Requirement
                </Link>
              </div>
              <div>
                <Link
                  style={linkStyle3}
                  className="navbar-brand"
                  name="1"
                  onMouseEnter={() => setHoveredLink('link3')}
                  onMouseLeave={() => setHoveredLink(null)}
                  to="/safety"
                >
                  Safety
                </Link>
              </div>
              <div>
                <Link
                  style={linkStyle4}
                  className="navbar-brand"
                  name="1"
                  onMouseEnter={() => setHoveredLink('link4')}
                  onMouseLeave={() => setHoveredLink(null)}
                  to="/Contect-us"
                >
                  Contact us
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <div className="container-fluid" style={{ backgroundColor: 'black', color: 'white', padding: '50px 0' }}>
          <div className="row align-items-center justify-content-center">
            <div className="col-lg-6 col-md-12 text-lg-left" style={{ paddingLeft: "15vh" }}>
              <h1 style={{ fontFamily: "Poppins, sans-serif", fontSize: "3rem" }}>Drive when you want, make what you need</h1>
              <p style={{ fontFamily: "Poppins, sans-serif", fontWeight: "300", marginTop: "20px" }}>Earn on your own schedule.</p>
              <div className="mt-4">
                <button onClick={handleRedirect} style={{ borderRadius: "8px", fontSize: "16px", padding: "10px 20px", backgroundColor: "white", color: "black", marginRight: "20px", border: "none" }}>
                  Get started
                </button>
                <Link onMouseEnter={() => setHoveredLink('account')}
                  onMouseLeave={() => setHoveredLink(null)} onClick={handleRedirect} style={account}>Already have an account? Sign in</Link>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 text-center mt-4 mt-lg-0">
              <img src={driverIllusta} className="zoom-sensitive-image" alt="driver illustration" style={{ width: "100%", maxWidth: "400px", borderRadius: "10px" }} />
            </div>
          </div>
        </div>
        <div className="container-lg mt-5 mb-5">
          <h3 className="mb-4" style={{ color: 'black', fontWeight: "500", fontSize: "39px" }}>Why Drive with us</h3>
          <div className="row">
            <div className="col mt-5 mb-5">
              <img src={whyDriveWithUs} alt="Why drive with us illustration" />
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-md-4 mb-4">
              <div className="card h-100" style={{ backgroundColor: "#FFF", border: "none" }}>
                <div className="card-body d-flex">
                  <div className="flex-grow-1">
                    <h5 className="card-title"><img src={calander} alt="calander" /></h5>
                    <p className="card-text mt-4 mb-4" style={{ fontSize: "25px", fontWeight: "500" }}>Set your own hours</p>
                    <p className="card-text">You decide when and how often you drive.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card h-100" style={{ backgroundColor: "#FFF", border: "none" }}>
                <div className="card-body d-flex">
                  <div className="flex-grow-1">
                    <h5 className="card-title"><img src={money} alt="calander" /></h5>
                    <p className="card-text mt-4 mb-4" style={{ fontSize: "25px", fontWeight: "500" }}>Get paid fast</p>
                    <p className="card-text">Weekly payments in your bank account.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card h-100" style={{ backgroundColor: "#FFF", border: "none" }}>
                <div className="card-body d-flex">
                  <div className="flex-grow-1">
                    <h5 className="card-title"><img src={support} alt="calander" /></h5>
                    <p className="card-text mt-4 mb-4" style={{ fontSize: "25px", fontWeight: "500" }}>Get support at every turn</p>
                    <p className="card-text">If there’s anything that you need, you can reach us anytime.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-lg mt-5 mb-5">
          <h3 className="mb-4" style={{ color: 'black', fontWeight: "500", fontSize: "39px" }}>Here's What you need to sign in</h3>
          <h6 style={{ color: 'black' }}>To drive</h6>
          <div className="row mt-5">
            <div className="col-md-4 mb-4">
              <div className="card h-100" style={{ backgroundColor: "#FFF", border: "none" }}>
                <div className="card-body d-flex">
                  <div className="flex-grow-1">
                    <h5 className="card-title"><img src={requirement} alt="calander" /></h5>
                    <p className="card-text mt-4 mb-4" style={{ fontSize: "25px", fontWeight: "500" }}>Requirement</p>
                    <p className="card-text">
                      <ul>
                        <li>Be at least 18 years old</li>
                        <li>Clear a background screening</li>
                      </ul>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card h-100" style={{ backgroundColor: "#FFF", border: "none" }}>
                <div className="card-body d-flex">
                  <div className="flex-grow-1">
                    <h5 className="card-title"><img src={document} alt="calander" /></h5>
                    <p className="card-text mt-4 mb-4" style={{ fontSize: "25px", fontWeight: "500" }}>Document</p>
                    <p className="card-text">
                      <ul>
                        <li>Valid driver's license (private or commercial), if you plan to drive</li>
                        <li>Proof of residency in your city, state or province</li>
                        <li>Car documents such as commercial insurance, vehicle registration certificate, permit</li>
                      </ul>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card h-100" style={{ backgroundColor: "#FFF", border: "none" }}>
                <div className="card-body d-flex">
                  <div className="flex-grow-1">
                    <h5 className="card-title"><img src={documentCheck} alt="calander" /></h5>
                    <p className="card-text mt-4 mb-4" style={{ fontSize: "25px", fontWeight: "500" }}>Signin process</p>
                    <p className="card-text">
                      <ul>
                        <li>Visit the closest Partner Seva Kendra in your area.</li>
                        <li>Submit the required documents and photograph.</li>
                        <li>Share your details for the background verification process.</li>
                      </ul>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-lg mt-5 mb-5">
          <h3 className="mb-4" style={{ color: 'black', fontWeight: "500", fontSize: "39px" }}>Staying Safe While on the Road</h3>
          <h6 style={{ color: 'black' }}>Your well-being motivates us to consistently elevate our standards.</h6>
          <div className="row mt-5">
            <div className="col-md-4 mb-4">
              <div className="card h-100" style={{ backgroundColor: "#FFF", border: "none" }}>
                <div className="card-body d-flex">
                  <div className="flex-grow-1">
                    <h5 className="card-title"><img className="w-25" src={safetyCenter} alt="calander" /></h5>
                    <p className="card-text mt-4 mb-4" style={{ fontSize: "25px", fontWeight: "500" }}>Protection on Every Journey</p>
                    <p className="card-text">
                      Every trip you make using the Uber app is covered by insurance to safeguard both you and your rider.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card h-100" style={{ backgroundColor: "#FFF", border: "none" }}>
                <div className="card-body d-flex">
                  <div className="flex-grow-1">
                    <h5 className="card-title"><img className="w-25" src={support24X7} alt="calander" /></h5>
                    <p className="card-text mt-4 mb-4" style={{ fontSize: "25px", fontWeight: "500" }}>24/7 Support</p>
                    <p className="card-text ">
                      <ul className="list-unstyled">
                        <li>Help When You Need It</li>
                        <li>The Emergency Button connects you to 911, and the app provides your trip details for quick sharing with authorities.</li>
                      </ul>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card h-100" style={{ backgroundColor: "#FFF", border: "none" }}>
                <div className="card-body d-flex">
                  <div className="flex-grow-1">
                    <h5 className="card-title"><img className="w-25" src={CommunityGuidelines} alt="calander" /></h5>
                    <p className="card-text mt-4 mb-4" style={{ fontSize: "25px", fontWeight: "500" }}>Community Standards</p>
                    <p className="card-text">
                      <ul className="list-unstyled">
                        <li>Our guidelines foster safe connections and positive experiences for everyone. Find out how these standards apply to you.</li>
                      </ul>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-lg mt-5 mb-5" style={{ fontFamily: "Poppins,san-serif" }}>
          <h3 className="mb-4" style={{ color: 'black' }}>Frequently asked questions</h3>
          <div className="accordion" id="faqAccordion">
            {faqItems.map((item, index) => (
              <div className="accordion-item border-0" key={index}>
                <h2 className="accordion-header" id={`heading-${index}`}>
                  <button
                    className="accordion-button collapsed border-0 border-bottom"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapse-${index}`}
                    aria-expanded="false"
                    aria-controls={`collapse-${index}`}
                    style={{ borderBottom: '1px solid #ddd', borderRadius: 0 }}
                  >
                    {item.question}
                  </button>
                </h2>
                <div
                  id={`collapse-${index}`}
                  className="accordion-collapse collapse"
                  aria-labelledby={`heading-${index}`}
                  data-bs-parent="#faqAccordion"
                >
                  <div className="accordion-body">
                    {item.answer.replace(/Uber/g, 'GoCab')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div >
      <Footer /></>
  );
}
export default Driver;