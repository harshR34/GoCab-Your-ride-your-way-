import React, { useContext, useState, useEffect } from 'react';
import GoCab from './images/GoCab_logo.png';
import './Navbar.css';
import toggle from './images/toggle.svg'; // Hamburger icon
import close from './images/close.svg'; // Close icon
import { Link, useAsyncError } from 'react-router-dom'
import navigation from './images/navigation.svg'
import { BiChevronDown, BiChevronUp } from 'react-icons/bi'; // Import arrow 
import { jwtDecode } from 'jwt-decode';
import AuthContext from './context/AuthContext';
import driveDeliver from './images/drive-deliver.svg'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [full_name, setFullName] = useState("")
  const [isOpen1, setIsOpen1] = useState(false);

  const toggleDropdown = () => {
    setIsOpen1(!isOpen1);
  };

  const { user, logoutUser } = useContext(AuthContext);
  const token = localStorage.getItem("authTokens");

  

  useEffect(() => {
    if (user) {
      const decoded = jwtDecode(token);
      setFullName(decoded.full_name);
    }
  }, [user, token]);

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          localStorage.setItem('ride_lat',position.coords.latitude)
          localStorage.setItem('ride_long',position.coords.longitude)
          setError(null);
        },
        (error) => {
          setError(error.message);
          setLocation(null);
        }
      );
    } else {
      setError('Geolocation is not supported by your browser.');
    }
  };


  const handleToggleClick = () => {
    setIsOpen(!isOpen);
  };
  const [isHovered, setIsHovered] = useState(false);

  const style = {
    backgroundColor: isHovered ? "black" : "black",
  }
  function capitalizeFirstLetter(string) {
    var st = string.charAt(0).toUpperCase() + string.slice(1);
    return st.split(" ")[0]
  }

  const [hover, setHover] = useState(null);

  const styleLink = {
    fontSize: '25px',
    padding: '10px 0',
    color: hover === 'link' ? "gray" : '#000000',
    textDecoration: 'none',
  }
  const styleLink1 = {
    fontSize: '25px',
    padding: '10px 0',
    color: hover === 'link1' ? "gray" : '#000000',
    textDecoration: 'none',
  }
  const styleLink2 = {
    fontSize: '25px',
    padding: '10px 0',
    color: hover === 'link2' ? "gray" : '#000000',
    textDecoration: 'none',
  }
  const styleLink3 = {
    fontSize: '25px',
    padding: '10px 0',
    color: hover === 'link3' ? "gray" : '#000000',
    textDecoration: 'none',
  }
  const styleLink4 = {
    fontSize: '25px',
    padding: '10px 0',
    color: hover === 'link4' ? "gray" : '#000000',
    textDecoration: 'none',
  }

  return (
    < >
      {user ?
        <>
          <div className='navbarDiv'>
            <nav style={{ fontFamily: "Poppins ,sans-serif", backgroundColor: "black" }} className="navbar navbar-expand-lg navbar-light">
              <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                  <img src={GoCab} alt="GoCab Logo" style={{ height: "37px" }} className="d-inline-block align-text-top" />
                </Link>
                <button
                  className={`navbar-toggler ${isOpen ? 'open' : ''}`}
                  type="button"
                  onClick={handleToggleClick}
                  aria-controls="navbarSupportedContent"
                  aria-expanded={isOpen}
                  aria-label="Toggle navigation"
                >
                  <img src={isOpen ? close : toggle} alt="toggle button" />
                </button>
                <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarSupportedContent" style={{ backgroundColor: "black", borderRadius: "5px", padding: "15px" }}>
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                      <Link id='navlinks' to="/Ride" className="nav-link text-white active">Ride</Link>
                    </li>
                    <li className="nav-item">
                      <Link id='navlinks' to="/Driver" className="nav-link text-white active">Drive</Link>
                    </li>
                    <li className="nav-item dropdown">
                      <Link id='navlinks' to="/aboutus" className="nav-link text-white active">About</Link>
                    </li>
                  </ul>
                  <div className="auth-links">
                    <button onClick={handleGetLocation} style={style}
                      onMouseEnter={() => { setIsHovered(true) }} onMouseLeave={() => { setIsHovered(false) }}><img width={20} src={navigation} alt='navigation'></img></button>
                    {/* <div className="d-flex justify-content-end align-items-center">
                      <div className="dropdown">
                        <button
                          className="btn btn-secondary dropdown-toggle"
                          type="button"
                          id="dropdownMenuButton"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                          style={{
                            backgroundColor: '#f8f9fa',
                            color: '#343a40',
                            border: 'none',
                            padding: '6px 12px',
                            borderRadius: '50px',
                          }}
                        >
                          <span style={{fontWeight:"600"}}>{capitalizeFirstLetter(full_name)}</span>
                        </button>
                        <ul style={{ backgroundColor: "black", paddingRight: "25px"}} className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
                          <li>
                            <Link className="dropdown-item d-flex justify-content-between align-items-center" to="/driver" style={{ fontSize: "25px" }}>
                              <span >Drive & deliver</span>
                              <img src={driveDeliver} alt='DriveDeliver'/>
                            </Link>
                          </li>
                          <li>
                            <Link style={{ fontSize: "25px" }} className="dropdown-item d-flex justify-content-between align-items-center" to="/ride">
                              <span >Ride</span>
                              <i  className="bi bi-bicycle"></i>
                            </Link>
                          </li>
                          <li>
                            <Link style={{ fontSize: "25px" }} className="dropdown-item d-flex justify-content-between align-items-center" to="/Gocab Foods">
                              <span >Uber Eats</span>
                              <i className="bi bi-bag"></i>
                            </Link>
                          </li>
                          <li><Link style={{ fontSize: "25px" }} className="dropdown-item d-flex justify-content-between align-items-center" to="/dashboard">
                            <span >Manage account</span>
                            <i className="bi bi-person"></i>
                          </Link>
                          </li>
                          <li>
                            <Link style={{ fontSize: "25px" }} className="dropdown-item d-flex justify-content-between align-items-center" onClick={logoutUser}>
                              <span >Log out</span>
                              <i className="bi bi-box-arrow-right"></i>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div> */}
                    <div className="d-flex justify-content-end align-items-center">
                      <button
                        className="btn"
                        type="button"
                        onClick={toggleDropdown}
                        style={{
                          backgroundColor: '#f8f9fa',
                          color: '#343a40',
                          border: 'none',
                          padding: '6px 12px',
                          borderRadius: '50px',
                          fontWeight: '600',
                          zIndex: 1000,
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <span>{capitalizeFirstLetter(full_name)}</span>
                        {isOpen1 ? <BiChevronUp style={{ marginLeft: '8px' }} /> : <BiChevronDown style={{ marginLeft: '8px' }} />}
                      </button>

                      {isOpen1 && (
                        <div
                          className="custom-dropdown-box"
                          style={{
                            position: 'fixed', // Use fixed to position the dropdown relative to the viewport
                            top: '60px', // Adjust based on the height of the main navbar
                            right: '20px', // Adjust based on the layout
                            backgroundColor: '#ffffff',
                            color: '#000000',
                            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.15)',
                            borderRadius: '10px',
                            padding: '10px',
                            minWidth: '250px',
                            zIndex: 1001, // Ensure this is higher than the second navbar's z-index
                          }}
                        >
                          <ul className="list-unstyled">
                            <li>
                              <Link
                                className="d-flex justify-content-between align-items-center link"
                                to="/driver"
                                style={styleLink}
                                onMouseEnter={() => { setHover('link') }}
                                onMouseLeave={() => { setHover(null) }}
                              >
                                <span>Drive & deliver</span>
                                <img src={driveDeliver} alt='DriveDeliver'      style={styleLink}
                                  onMouseEnter={() => { setHover('link') }}
                                  onMouseLeave={() => { setHover(null) }}
                                />
                              </Link>
                            </li>
                            <li>
                              <Link
                                className="d-flex justify-content-between align-items-center link"
                                to="/ride"
                                style={styleLink1}
                                  onMouseEnter={() => { setHover('link1') }}
                                  onMouseLeave={() => { setHover(null) }}
                              >
                                <span>Ride</span>
                                <i className="bi bi-bicycle" style={{ fontSize: '25px',color:'black'  }}></i>
                              </Link>
                            </li>
                            <li>
                              <Link
                                className="d-flex justify-content-between align-items-center link"
                                to="/Gocab Foods"
                                style={styleLink2}
                                  onMouseEnter={() => { setHover('link2') }}
                                  onMouseLeave={() => { setHover(null) }}
                              >
                                <span>GoCab Eats</span>
                                <i className="bi bi-bag" style={{ fontSize: '25px',color:'black'  }}></i>
                              </Link>
                            </li>
                            <li>
                              <Link
                                className="d-flex justify-content-between align-items-center link"
                                to="/dashboard"
                                style={styleLink3}
                                  onMouseEnter={() => { setHover('link3') }}
                                  onMouseLeave={() => { setHover(null) }}
                              >
                                <span style={{ marginRight: "5vh" }}>Manage account</span>
                                <i className="bi bi-person" style={{ fontSize: '25px',color:'black' }}></i>
                              </Link>
                            </li>
                            <li>
                              <Link
                                className="d-flex justify-content-between align-items-center link"
                                onClick={logoutUser}
                                style={styleLink4}
                                  onMouseEnter={() => { setHover('link4') }}
                                  onMouseLeave={() => { setHover(null) }}
                              >
                                <span>Sign out</span>
                                <i className="bi bi-box-arrow-right" style={{ fontSize: '25px',color:'black'  }}></i>
                              </Link>
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </>
        :
        <>
          <div className='navbarDiv'>
            <nav style={{ fontFamily: "Poppins ,sans-serif", backgroundColor: "black" }} className="navbar navbar-expand-lg navbar-light">
              <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                  <img src={GoCab} alt="GoCab Logo" style={{ height: "37px" }} className="d-inline-block align-text-top" />
                </Link>
                <button
                  className={`navbar-toggler ${isOpen ? 'open' : ''}`}
                  type="button"
                  onClick={handleToggleClick}
                  aria-controls="navbarSupportedContent"
                  aria-expanded={isOpen}
                  aria-label="Toggle navigation"
                >
                  <img src={isOpen ? close : toggle} alt="toggle button" />
                </button>
                <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarSupportedContent" style={{ backgroundColor: "black", borderRadius: "5px", padding: "15px" }}>
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                      <Link id='navlinks' to="/Ride" className="nav-link text-white active">Ride</Link>
                    </li>
                    <li className="nav-item">
                      <Link id='navlinks' to="/Driver" className="nav-link text-white active">Drive</Link>
                    </li>
                    <li className="nav-item">
                      <Link id='navlinks' to="/GoCab_foods" className="nav-link text-white active">GoCab foods</Link>
                    </li>
                    <li className="nav-item dropdown">
                      <Link id='navlinks' to="/About" className="nav-link text-white active">About</Link>
                    </li>
                  </ul>
                  <div className="auth-links">
                    <button onClick={handleGetLocation} style={style}
                      onMouseEnter={() => { setIsHovered(true) }} onMouseLeave={() => { setIsHovered(false) }}><img width={20} src={navigation} alt='navigation'></img></button>
                    <Link to="/login"><button className="login-button">Log in</button></Link>
                    <Link style={{ color: "black", fontWeight: "500" }} to="/signup"><button className="signup-button">Sign up</button></Link>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </>}
    </>
  );
};

export default Navbar;
