import Navbar from "./Navbar";
import Footer from "./Footer";
import travel from './images/GoCabHome1 (1).jpg';
import { Link, useNavigate } from "react-router-dom";
import './Ride.css'
import { useState } from "react";

const Ride = () => {

    const [source, setSource] = useState(null);
    const [destination, setDestination] = useState(null);
    const navigate = useNavigate();
    const token = localStorage.getItem("authTokens");

    const handleBooking = () => {
        if (token) {
            navigate('/book-ride');
        }
        else {
            navigate('/login');
        }
    }

    const handleContinue = () => {
        if (source && destination) {
            console.log(source)
            // Redirect to the next page with the selected option as state
            navigate('/book-ride', { state: { source, destination } });
        } else {
            alert('Please select an option before continuing.');
        }
    };

    const [hoveredLink, setHoveredLink] = useState(null);

    const linkStyle = {
        color: hoveredLink === 'link1' ? 'gray' : 'black', // Example hover 
        fontSize: "13px",
        backgroundColor:"white"
    };
    
    const linkStyle2 = {
        color: hoveredLink === 'link2' ? 'gray' : 'black',
        fontSize: "13px",
        backgroundColor:"white"
    };

    const linkStyle3 = {
        color: hoveredLink === 'link3' ? 'gray' : 'black',
        fontSize: "13px"
    };
    const faqItems = [
        {
            question: 'Can I have a lost item delivered to me?',
            answer: 'Yes, you can have a lost item delivered to you by contacting GoCab support.',
        },
        {
            question: 'Can I rent a car using GoCab?',
            answer: 'Yes, GoCab offers car rental services in selected locations.',
        },
        {
            question: 'Can I request a ride that picks up friends in different locations?',
            answer: 'Yes, GoCab allows you to add multiple stops to pick up friends at different locations.',
        },
        {
            question: 'Can I request a taxi on GoCab?',
            answer: 'Yes, you can request a taxi through the GoCab app.',
        },
        {
            question: 'Is there a GoCab ride option for 5 people?',
            answer: 'Yes, GoCab offers larger vehicles for groups of up to 5 people.',
        },
    ];
    return (
        <>
            <div className='homepage-container' style={{ backgroundColor: "white" }}>
                <Navbar />
                {/* <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: 'white',zIndex:"inherit" }}>
                    <div className="container-fluid">
                        <Link style={{ fontSize: "25px", fontWeight: "500" }} className="navbar-brand ms-lg-5" to="/Ride" id="rideLink">
                            Ride
                        </Link>

                        <div className="d-flex pl-5" id="airportLink">
                            <div>
                                <Link
                                    style={linkStyle}
                                    className="navbar-brand"
                                    name="1"
                                    onMouseEnter={() => setHoveredLink('link1')}
                                    onMouseLeave={() => setHoveredLink(null)}
                                    to={()=>{
                                        if(token){
                                            return '/book-ride';
                                        }
                                        else{
                                            return '/login';
                                        }
                                    }}
                                >
                                    Request a ride
                                </Link>
                            </div>
                            <div>
                                <Link
                                    style={linkStyle2}
                                    className="navbar-brand"
                                    name="2"
                                    onMouseEnter={() => setHoveredLink('link2')}
                                    onMouseLeave={() => setHoveredLink(null)}
                                    onClick={handleBooking}
                                >
                                    Reserve a ride
                                </Link>
                            </div>
                            <div>
                                <Link
                                    style={linkStyle3}
                                    name="3"
                                    onMouseEnter={() => setHoveredLink('link3')}
                                    onMouseLeave={() => setHoveredLink(null)}
                                    className="navbar-brand"
                                    to="/AirportRide"
                                >
                                    Airport rides
                                </Link>
                            </div>
                        </div>
                    </div>
                </nav> */}
                <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: 'white',zIndex:'inherit' }}>
                    <div className="container-fluid">
                        {/* Left-aligned link */}
                        <Link style={{ fontSize: "25px", fontWeight: "500" }} className="navbar-brand ms-lg-5" to="/Ride" id="rideLink">
                            Ride
                        </Link>

                        {/* Right-aligned links */}
                        <div className="d-flex pl-5" id="airportLink">
                            <div>
                                <button
                                    style={linkStyle}
                                    className="navbar-brand"
                                    name="1"
                                    onMouseEnter={() => setHoveredLink('link1')}
                                    onMouseLeave={() => setHoveredLink(null)}
                                    onClick={handleBooking}
                                >
                                    Request a ride
                                </button>
                                {/* <Link
                                    style={linkStyle}
                                    className="navbar-brand"
                                    name="1"
                                    onMouseEnter={() => setHoveredLink('link1')}
                                    onMouseLeave={() => setHoveredLink(null)}
                                    to={() => (token ? '/book-ride' : '/login')}
                                >
                                    Request a ride
                                </Link> */}
                            </div>
                            <div>
                                <button
                                    style={linkStyle2}
                                    className="navbar-brand"
                                    name="2"
                                    onMouseEnter={() => setHoveredLink('link2')}
                                    onMouseLeave={() => setHoveredLink(null)}
                                    onClick={handleBooking}
                                >
                                    Reserve a ride
                                </button>
                            </div>
                            <div>
                                <Link
                                    style={linkStyle3}
                                    name="3"
                                    onMouseEnter={() => setHoveredLink('link3')}
                                    onMouseLeave={() => setHoveredLink(null)}
                                    className="navbar-brand"
                                    to="/AirportRide"
                                >
                                    Airport rides
                                </Link>
                            </div>
                        </div>
                    </div>
                </nav>

                <div className="container-lg text-center" style={{ border: "none", }}>

                    <div className="row align-items-center" style={{ display: "flex", flexWrap: "wrap" }}>
                        <div className="col" style={{ paddingTop: "25vh", paddingBottom: "25vh", textAlign: "left" }}>
                            <h1 style={{ fontFamily: "Poppins, sans-serif", fontSize: "45px", paddingLeft: "20px", color: "black" }}>Request a ride for now or later</h1>
                            <h6 style={{ fontFamily: "Poppins, sans-serif", paddingLeft: "20px", color: "black" }}>Add your trip details, hop in, and go.</h6>
                            <div className="container-fluid" style={{ paddingTop: "20px" }}>
                                <form>
                                    <div className="input-group">
                                        <input type="text" id="source" style={{ borderRadius: "8px" }} required placeholder='____' onChange={(e) => { setSource(e.target.value) }} />
                                        <label htmlFor="source">Source</label>
                                    </div>
                                    <div className="input-group">
                                        <input type="text" id="destination" style={{ borderRadius: "8px" }} placeholder='_____' onChange={(e) => { setDestination(e.target.value) }} />
                                        <label htmlFor="destination">Destination</label>
                                    </div>
                                    <div>
                                        <button style={{ borderRadius: "8px", fontSize: "15px", padding: "9px", marginRight: "20px" }} type="submit" onClick={handleBooking}>See prices</button>
                                        <button style={{ borderRadius: "8px", fontSize: "15px", padding: "9px", backgroundColor: "#F1F1F1", color: "black" }} type="submit" >Schedule for later</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col">
                            <img style={{ display: "block", width: "100%", height: "100%", transform: "scaleX(-1)", borderRadius: "10px", maxHeight: "100%" }} src={travel} alt='image1' />
                        </div>
                    </div>
                </div>
                <div className="container-lg mt-5 mb-5">
                    <h3 className="mb-4" style={{ color: 'black' }}>Suggestions</h3>
                    <div className="row">
                        <div className="col-md-4 mb-4">
                            <div className="card h-100" style={{ backgroundColor: "#F1F1F1", border: "none", transform: "none", transition: "none", boxShadow: "none" }}>
                                <Link to="/book-ride" className="text-decoration-none text-dark">
                                    <div className="card-body d-flex">
                                        <div className="flex-grow-1">
                                            <h5 className="card-title">Ride</h5>
                                            <p className="card-text">Go anywhere with Uber. Request a ride, hop in, and go.</p>
                                            <button className="btn btn-outline-secondary" style={{ color: "black", borderRadius: "30px" }}><Link to="/book-ride"></Link>Details</button>
                                        </div>
                                        <img
                                            src="https://mobile-content.uber.com/launch-experience/ride.png"
                                            alt="Ride"
                                            className="img-fluid"
                                            style={{ width: '100px', objectFit: 'contain' }}
                                        />
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className="col-md-4 mb-4">
                            <div className="card h-100" style={{ backgroundColor: "#F1F1F1", border: "none", transform: "none", transition: "none", boxShadow: "none" }}>
                                <Link to="/book-ride" className="text-decoration-none text-dark">
                                    <div className="card-body d-flex">
                                        <div className="flex-grow-1">
                                            <h5 className="card-title">Reserve</h5>
                                            <p className="card-text">Reserve your ride in advance so you can relax on the day of your trip.</p>
                                            <button className="btn btn-outline-secondary" style={{ color: "black", borderRadius: "30px" }}><Link to="/book-ride"></Link>Details</button>
                                        </div>
                                        <img
                                            src="https://mobile-content.uber.com/uber_reserve/reserve_clock.png"
                                            alt="Reserve"
                                            className="img-fluid"
                                            style={{ width: '100px', objectFit: 'contain' }}
                                        />
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className="col-md-4"></div>
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
            </div>
            <Footer /></>
    );
}
export default Ride;