import React, { useState, useEffect } from 'react';
import './GoCabHome.css';
import "./Navbar.css";
import img1 from "./images/1.png";
import Navbar from './Navbar';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import earner from './images/earner-illustra.webp'
import { useNavigate } from 'react-router-dom';
import Home from './images/GocabRide (3).jpg'
import earnerIllustation from './images/gocabEarner-illustraion (3).jpg'
import './Fonts/UberMoveBold.otf'
import './Fonts/UberMoveMedium.otf'

const GoCabHome = () => {
    const navigate = useNavigate()
    const token = localStorage.getItem("authTokens");

    const [source, setSource] = useState('');
    const [destination, setDestination] = useState('');

    useEffect(() => {
        initializeAutocomplete('source', setSource);
        initializeAutocomplete('destination', setDestination);
    }, []);

    const handleBooking = () => {
        if (token) {
            navigate('/book-ride');
        }
        else {
            navigate('/login');
        }
    }

    function initializeAutocomplete(inputId, setInputValue) {
        const inputElement = document.getElementById(inputId);
        const datalistElement = document.getElementById(`${inputId}Suggestions`);

        const autocomplete = new window.google.maps.places.Autocomplete(inputElement);

        autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace();

            if (place.geometry) {
                setInputValue(place.formatted_address);
                datalistElement.innerHTML = '';
                datalistElement.appendChild(createOptionElement(place.formatted_address));
            }
        });
    }

    function createOptionElement(value) {
        const optionElement = document.createElement('option');
        optionElement.value = value;
        return optionElement;
    }

    const handleDrive = () => {
        if (token) {
            navigate('/drive-confirmation');
        }
        else {
            navigate('/login');
        }
    }
    return (<>
        <div className='homepage-container'>
            <Navbar />
            <div className="container text-center">
                <div className="row align-items-center" style={{ display: "flex", flexWrap: "wrap" }}>
                    <div className="col" style={{ paddingTop: "25vh", paddingBottom: "25vh", textAlign: "left" }}>
                        <h1 style={{
                            fontFamily: 'Uber Move',
                            fontWeight: "bold", fontSize: "45px", paddingLeft: "20px", color: "beige"
                        }}>Go anywhere with GoCab.</h1>
                        <h6 style={{ fontFamily: "Poppins, sans-serif", paddingLeft: "20px", color: "beige" }}>Request a ride, hop in, and go.</h6>

                        {/* <div className="container">
                            <form>
                                <div className="input-group">
                                    <input type="text" id="source" style={{ borderRadius: "8px" }} required placeholder='____' />
                                    <label htmlFor="source">Source</label>
                                </div>
                                <div className="input-group">
                                    <input type="text" id="destination" style={{ borderRadius: "8px" }} placeholder='_____' />
                                    <label htmlFor="destination">Destination</label>
                                </div>
                                <button type="submit" onClick={handleBooking}>See Prices</button>
                            </form>
                        </div> */}

                        <div className="container">
                            <form>
                                <div className="input-group">
                                    <input
                                        type="text"
                                        id="source"
                                        value={source}
                                        onChange={(e) => setSource(e.target.value)}
                                        placeholder="____"
                                        style={{borderRadius: "8px"}}
                                        className='w-75'
                                    />
                                    <label htmlFor="source" style={{borderRadius:"8px",backgroundColor:"black",color:"white"}}>Source</label>
                                    <datalist id="sourceSuggestions"></datalist>
                                </div>
                                <div className="input-group">
                                    <input
                                        type="text"
                                        id="destination"
                                        value={destination}
                                        onChange={(e) => setDestination(e.target.value)}
                                        placeholder='____'
                                        style={{borderRadius: "8px"}}
                                        className='w-75'
                                    />
                                    <label htmlFor="destination" style={{borderRadius:"8px",backgroundColor:"black",color:"white"}}>Destination</label>
                                    <datalist id="destinationSuggestions"></datalist>
                                </div>
                                <button type="submit" onClick={handleBooking} disabled={!source && !destination}>See Prices</button>
                            </form>
                        </div>
                    </div>
                    <div className="col">
                        <img style={{ display: "block", width: "100%", height: "100%", transform: "scaleX(1)", borderRadius: "10px" }} className='zoom-sensitive-image' src={Home} alt='image1' />
                    </div>
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
                                    <p className="card-text">Go anywhere with GoCab. Request a ride, hop in, and go.</p>
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
        <div className="container-lg text-center" style={{ border: "none", marginTop: "50px" }}>
            <div className="row align-items-center" style={{ display: "flex", flexWrap: "wrap" }}>
                <div className="col" style={{ marginRight: "8.5%" }}>
                    <img style={{ display: "block", width: "100%", height: "100%", transform: "scaleX(1)", borderRadius: "10px", maxHeight: "100%" }} src={earnerIllustation} alt='image1' />
                </div>
                <div className="col" style={{ paddingTop: "25vh", paddingBottom: "25vh", textAlign: "left" }}>
                    <h1 style={{ fontFamily: "Poppins, sans-serif", fontSize: "60px", paddingLeft: "20px", color: "black" }}>Drive when you want, make what you need</h1>
                    <h6 style={{ fontFamily: "Poppins, sans-serif", paddingLeft: "20px", color: "black", fontWeight: "300", marginTop: "60px" }}>Make money on your schedule with deliveries or rides—or both. You can use your own car or choose a rental through GoCab.</h6>
                    <div className="container-fluid" style={{ paddingTop: "20px" }}>

                        <div>
                            <button onClick={handleDrive} style={{ borderRadius: "8px", fontSize: "15px", padding: "13px", marginRight: "20px" }} type="submit">Get started</button>
                            <Link onClick={handleDrive} className='hover-link' >Already have an account? Sign in</Link>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <Footer /></>
    );
}

export default GoCabHome;
