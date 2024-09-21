import React, { useState, useRef, useEffect, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLoadScript, GoogleMap, Marker, DirectionsService, DirectionsRenderer, InfoWindow } from '@react-google-maps/api';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './BookRide.css';
import { RiCloseCircleFill } from "react-icons/ri";
import Loader from './Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faSuitcase, faTimes } from '@fortawesome/free-solid-svg-icons';
import profile from './images/userProfile.webp';
import sedan from './images/carwithstar.png';
import suv from './images/GoCanXL.webp';
import X from './images/GoCabX.webp';
import person from './images/person.svg';
import discount from './images/discount.svg';
import PayPal from './PayPal';
import paypal from './images/paypal.svg';
import { jwtDecode } from 'jwt-decode';
import AuthContext from './context/AuthContext';
import googlePay from './images/google-pay.svg';
import axios from 'axios';
// import { TextField, ThemeProvider } from '@mui/material';
// import { createTheme } from '@mui/material/styles';

const mapContainerStyle = {
    width: '100%',
    height: '100%',
};

const center = {
    lat: 23.0225,
    lng: 72.5714,
};

const libraries = ['places'];
const storedTrips = []

const baseFare = 50; // Base fare in currency units
const costPerKm = 10; // Cost per kilometer in currency units

const BookRide = () => {
    const location = useLocation();
    const { myTrips } = useContext(AuthContext);
    const { source, destination } = location.state || {};
    const [pickupLocation, setPickupLocation] = useState(source);
    const [dropoffLocation, setDropoffLocation] = useState(destination);
    const [isSearchEnabled, setIsSearchEnabled] = useState(false);
    const [availableRides, setAvailableRides] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showSecondModal, setShowSecondModal] = useState(false);
    const [showThirdModal, setShowThridModal] = useState(false);
    const [selectedRide, setSelectedRide] = useState(null);
    const [directionsResponse, setDirectionsResponse] = useState(null);
    const [hoveredRide, setHoveredRide] = useState(null);
    const [infoPosition, setInfoPosition] = useState(null);
    const [infoContent, setInfoContent] = useState("");
    const pickupInputRef = useRef(null);
    const dropoffInputRef = useRef(null);
    const [autocompletePickup, setAutocompletePickup] = useState(null);
    const [autocompleteDropoff, setAutocompleteDropoff] = useState(null);
    const navigate = useNavigate();
    const [drivers, setDrivers] = useState([]);

    const token = localStorage.getItem("authTokens");
    const user = jwtDecode(token);
    const name = user.full_name;
    const email = user.email;

    // const theme = createTheme({
    //     typography: {
    //         fontFamily: ['Poppins', 'sans-serif'].join(','),
    //     },
    // });

    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // Radius of the Earth in kilometers
        const dLat = deg2rad(lat2 - lat1);
        const dLon = deg2rad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // Distance in kilometers
    };

    const deg2rad = (deg) => {
        return deg * (Math.PI / 180);
    };

    // const findNearestDrivers = (drivers, rideLat, rideLong) => {
    //     const maxResults = 5;
    //     const availableDrivers = drivers.filter(driver => driver.availabilityStatus);

    //     availableDrivers.forEach(driver => {
    //         const distance = calculateDistance(rideLat, rideLong, driver.latitude, driver.longitude);
    //         driver.distance = distance;
    //     });

    //     // Sort by nearest distance and return the top 5 drivers
    //     return availableDrivers.sort((a, b) => a.distance - b.distance).slice(0, maxResults);
    // };

    const findNearestDrivers = (drivers, rideLat, rideLong) => {
        const maxResults = 5;
        const availableDrivers = drivers.filter(driver => driver.availabilityStatus);
    
        // Log available drivers for debugging
        console.log("Available Drivers:", availableDrivers);
    
        // Calculate distance for each available driver
        availableDrivers.forEach(driver => {
            const distance = calculateDistance(rideLat, rideLong, driver.latitude, driver.longitude);
            driver.distance = distance;
        });
    
        // Log drivers with their distances for debugging
        console.log("Drivers with Distances:", availableDrivers);
    
        // Sort by nearest distance and return the top 5 drivers
        return availableDrivers.sort((a, b) => a.distance - b.distance).slice(0, maxResults);
    };
    

    const fetchAvaliableDriver = () => {
        axios.get('http://127.0.0.1:8000/api/driver-status-list/').then((response) => {
            setDrivers(response.data);
        }).catch((error) => { console.log(error) })
    }

    useEffect(() => {
        fetchAvaliableDriver();
    }, []);
    // console.log(drivers);
    const rideLat = localStorage.getItem('ride_lat');
    const rideLong = localStorage.getItem('ride_long');
    const rideLocation = { latitude: rideLat, longitude: rideLong }
    // console.log(rideLocation)

    function capitalizeFirstLetter(string) {
        var st = string.charAt(0).toUpperCase() + string.slice(1);
        return st.split(" ")[0]
    }
    const resetFields = () => {
        setPickupLocation('');
        setDropoffLocation('');
    };

    const handlePaymentMethodSelection = () => {
        setShowModal(false);
        setShowSecondModal(true);
    };

    const handleGooglePaySelection = () => {
        setShowModal(false);
        setShowThridModal(true);
    }

    const handleBackToFirstModal = () => {
        if (paymentMethod === 'Paypal') {
            setShowSecondModal(false);
            setShowModal(true);
        }
        else if (paymentMethod === 'GooglePay') {
            setShowThridModal(false);
            setShowModal(true);
        }

    };

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: 'Your google maps api key',
        libraries,
    });

    const handleInputChange = () => {
        setIsSearchEnabled(pickupLocation !== '' && dropoffLocation !== '');
    };

    const handleSearch = () => {
        if (!pickupLocation || !dropoffLocation) return;

        const directionsService = new window.google.maps.DirectionsService();

        directionsService.route(
            {
                origin: pickupLocation,
                destination: dropoffLocation,
                travelMode: window.google.maps.TravelMode.DRIVING,
            },
            (result, status) => {
                if (status === window.google.maps.DirectionsStatus.OK) {
                    setDirectionsResponse(result);

                    const route = result.routes[0];
                    const distance = result.routes[0].legs[0].distance.text;
                    const duration = result.routes[0].legs[0].duration.text;
                    const cost = calculateCost(distance);
                    // Example ride data with additional price attribute

                    const rides = [
                        { id: 1, name: 'GoCab Go', price: cost.toFixed(2), eta: '5 mins', image: X, person: "4", distance, duration, priceMultiplier: 1 },
                        { id: 2, name: 'Go Sedan', price: (cost).toFixed(2), eta: '7 mins', image: sedan, person: "4", distance, duration, priceMultiplier: 1.1 },
                        { id: 3, name: 'GoCab SUV', price: (cost).toFixed(2), eta: '3 mins', image: suv, person: "7", distance, duration, priceMultiplier: 1.3 },
                    ];

                    setInfoPosition(route.overview_path[Math.floor(route.overview_path.length / 2)]);
                    setInfoContent(`<div style="background-color:'blue';color:'black'"><b>DEFAULT ROUTE</b><br/>Distance: ${distance}<br/>Duration: ${duration}</div>`);
                    setAvailableRides(rides);
                } else {
                    console.error(`error fetching directions ${result}`);
                }
            }
        );

    };
    const calculateCost = (distance) => {
        // Convert distance to kilometers if necessary
        const distanceInKm = parseFloat(distance.replace(' km', '')); // Assuming distance is in km
        return baseFare + (costPerKm * distanceInKm);
    };

    useEffect(() => {
        if (isLoaded) {
            const autocompletePickup = new window.google.maps.places.Autocomplete(pickupInputRef.current, {
                fields: ["place_id", "formatted_address"],
                types: ["address"]
            });
            const autocompleteDropoff = new window.google.maps.places.Autocomplete(dropoffInputRef.current, {
                fields: ["place_id", "formatted_address"],
                types: ["address"]
            });

            autocompletePickup.addListener("place_changed", () => {
                const place = autocompletePickup.getPlace();
                if (place.formatted_address) {
                    setPickupLocation(place.formatted_address);
                    handleInputChange();
                }
            });

            autocompleteDropoff.addListener("place_changed", () => {
                const place = autocompleteDropoff.getPlace();
                if (place.formatted_address) {
                    setDropoffLocation(place.formatted_address);
                    handleInputChange();
                }
            });

            setAutocompletePickup(autocompletePickup);
            setAutocompleteDropoff(autocompleteDropoff);
        }
    }, [isLoaded]);

    const PaypalPayment = () => {
        setPaymentMethod('Paypal');
        handleBackToFirstModal();
    }

    const GooglePay = () => {
        setPaymentMethod('GooglePay');
        handleBackToFirstModal();
    }
    const handleDirectionsCallback = (response) => {
        if (!pickupLocation || !dropoffLocation) return;

        const directionsService = new window.google.maps.DirectionsService();

        directionsService.route(
            {
                origin: pickupLocation,
                destination: dropoffLocation,
                travelMode: window.google.maps.TravelMode.DRIVING,
            },
            (result, status) => {
                if (status === window.google.maps.DirectionsStatus.OK) {
                    setDirectionsResponse(result);

                    const route = result.routes[0];
                    const distance = result.routes[0].legs[0].distance.text;
                    const duration = result.routes[0].legs[0].duration.text;
                    const cost = calculateCost(distance);
                    // Example ride data with additional price attribute

                    const rides = [
                        { id: 1, name: 'GoCab Go', price: cost, eta: '5 mins', image: X, person: "4", distance, duration, priceMultiplier: 1 },
                        { id: 2, name: 'Go Sedan', price: (cost * 1.1).toFixed(2), eta: '7 mins', image: sedan, person: "4", distance, duration, priceMultiplier: 1.1 },
                        { id: 3, name: 'GoCab SUV', price: (cost * 1.3).toFixed(2), eta: '3 mins', image: suv, person: "7", distance, duration, priceMultiplier: 1.3 },
                    ];

                    setInfoPosition(route.overview_path[Math.floor(route.overview_path.length / 2)]);
                    setInfoContent(`<div style="background-color:'blue';color:'black'"><b>DEFAULT ROUTE</b><br/>Distance: ${distance}<br/>Duration: ${duration}</div>`);
                    setAvailableRides(rides);
                } else {
                    console.error(`error fetching directions ${result}`);
                }
            }
        );
    };

    // const handlePaymentMethodSelection = () => {
    //     setPaymentMethod('PayPal');
    //     setShowModal(false);
    //     return <><PayPal /></>
    // };


    const handleCardSelect = (ride) => {
        setSelectedRide(ride);
    };


    const getCurrentDateTime = () => {
        const now = new Date();

        // Format date as MM/DD/YYYY
        const date = now.toLocaleDateString('en-US', {
            weekday: 'long', // 'Monday'
            year: 'numeric', // '2024'
            month: 'long', // 'August'
            day: 'numeric' // '26'
        });

        // Format time as HH:MM AM/PM
        const time = now.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        });

        return `${date}, ${time}`;
    };


    // const handleRequestRide = async (e) => {
    //     e.preventDefault();
    //     if (!pickupLocation || !dropoffLocation || !selectedRide || !paymentMethod) {
    //         // You could show an error message here if required
    //         console.error("Please complete all fields before requesting a ride.");
    //         return;
    //     }
    //     // If all fields are complete, you can proceed with the ride request
    //     // console.log("pickup location : ",pickupLocation)
    //     // console.log("Dropoff location : ",dropoffLocation)
    //     // console.log("Requesting ride:", selectedRide);
    //     let dateTime = getCurrentDateTime()

    //     const nearestDrivers = findNearestDrivers(drivers, rideLat, rideLong);

    //     if (nearestDrivers.length === 0) {
    //         console.error("No available drivers nearby.");
    //         return;
    //     }

    //     // Select the nearest driver (can be top 5 based on preference)
    //     const selectedDriver = nearestDrivers[0]; // or any logic to select from the top 5

    //     const driverName = selectedDriver.name;
    //     const driverPhone = selectedDriver.phone;

    //     console.log(driverName,driverPhone)

    //     const form  = new FormData();
    //     form.append('name',driverName);
    //     form.append('phone',driverPhone);
    //     form.append('lat',selectedDriver.lat);
    //     form.append('lon',selectedDriver.lon);
    //     form.append('availabilityStatus',false);
    //     axios.put(`http://127.0.0.1:8000/api/driver-availability/${driverName}/`,form).then((res)=>{    
    //         console.log("Driver on ride !!!!!")
    //     }).catch((error)=>{console.log(error)});

    //     const newTrip = { pickupLocation, dropoffLocation, selectedRide, dateTime, paymentMethod,driverName,driverPhone};
    //     console.log("New Trips : ",newTrip);
    //     storedTrips.push(newTrip);
    //     localStorage.setItem(`${capitalizeFirstLetter(name)}Trips`, JSON.stringify(storedTrips));
    //     myTrips(email, pickupLocation, dropoffLocation, paymentMethod, dateTime, selectedRide.distance, selectedRide.duration, selectedRide.price,driverName,driverPhone);
    //     navigate("/ride-booked");
    //     // Implement your ride request logic here, such as navigating to a confirmation page or making an API call.
    // };

    const handleRequestRide = async (e) => {
        e.preventDefault();
        if (!pickupLocation || !dropoffLocation || !selectedRide || !paymentMethod) {
            console.error("Please complete all fields before requesting a ride.");
            return;
        }
    
        let dateTime = getCurrentDateTime();
    
        const nearestDrivers = findNearestDrivers(drivers, rideLat, rideLong);
    
        if (nearestDrivers.length === 0) {
            console.error("No available drivers nearby.");
            return;
        }
    
        const selectedDriver = nearestDrivers[0]; 
        const driverId = selectedDriver.id;
        const driverName = selectedDriver.name;
        const driverPhone = selectedDriver.phone;
    
        console.log(driverName, driverPhone);
    
        // Prepare the payload as a JSON object
        const payload = {
            name: driverName,
            phone: driverPhone,
            lat: selectedDriver.lat,
            lon: selectedDriver.lon,
            availabilityStatus: false,
        };
    
        try {
            await axios.put(`http://127.0.0.1:8000/api/driver-availability/${driverId}/`, payload);
            console.log("Driver availability updated to false.");
        } catch (error) {
            console.error("Error updating driver availability:", error.response.data); // Log the error response for more info
            return; 
        }
    
        const newTrip = {
            pickupLocation,
            dropoffLocation,
            selectedRide,
            dateTime,
            paymentMethod,
            driverName,
            driverPhone,
        };
        console.log("New Trips:", newTrip);
        storedTrips.push(newTrip);
        localStorage.setItem(`${capitalizeFirstLetter(name)}Trips`,JSON.stringify(storedTrips));
        
        myTrips(email, pickupLocation, dropoffLocation, paymentMethod, dateTime, selectedRide.distance, selectedRide.duration, selectedRide.price, driverName, driverPhone);
        navigate("/ride-booked");
    };
    
    
    
    
    function getFormattedTime() {
        const now = new Date();
        let hours = now.getHours();
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        const formattedHours = hours.toString().padStart(2, '0');
        return `${formattedHours}:${minutes} ${ampm}`;
    }

    if (loadError) return <>Error Occurs....</>;
    if (!isLoaded) return <div><Loader /></div>;

    return (
        <div>
            <header className="d-flex align-items-center justify-content-between px-4 py-2 bg-white border-bottom">
                <div className="d-flex align-items-center">
                    <Link to='/' className="mb-0 font-weight-bold" style={{ fontSize: "40px", textDecoration: "none", color: "black", fontFamily: "Uber Move, sans-serif", fontWeight: "bold" }}>GoCab</Link>
                    <nav className="ml-4" style={{ display: "flex", flexDirection: "row" }}>
                        <Link to="/ride" className="text-dark d-flex align-items-center mx-3 hover-link">
                            <FontAwesomeIcon icon={faCar} className="mr-2" />
                            Ride
                        </Link>
                    </nav>
                </div>
                <div className="d-flex align-items-center">
                    <Link to="/mytrips" className="text-dark d-flex align-items-center mx-3 hover-link">
                        <FontAwesomeIcon icon={faSuitcase} className="mr-2" />
                        My trips
                    </Link>
                    <div className="dropdown">
                        <button
                            className="btn btn-white dropdown-toggle d-flex align-items-center"
                            type="button"
                            id="dropdownMenuButton"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            <img
                                src={profile}
                                alt="Profile"
                                className="rounded-circle mr-2" style={{ width: "50px" }}
                            />
                        </button>
                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                            <Link className="dropdown-item" to="/dashboard">Profile</Link>
                        </div>
                    </div>
                </div>
            </header>

            <div className="d-flex" style={{ height: 'calc(100vh - 56px)' }}>
                <div className='d-flex' style={{ flexDirection: "row" }}>
                    <div className='mx-auto'>
                        <div className="booking-container p-3 bg-white rounded shadow" style={{ width: '300px' }}>
                            <div className='d-flex justify-content-between align-items-center'>
                                <h5>Get a ride</h5>
                                <button type="button" onClick={resetFields} style={{ border: "none", background: "none" }}>
                                    <FontAwesomeIcon icon={faTimes} className="text-dark" style={{ fontSize: "20px" }} />
                                </button>
                            </div>
                            <div>
                                <input
                                    id="pickup"
                                    type="text"
                                    className="mt-3 mb-2"
                                    placeholder="Pickup location"
                                    value={pickupLocation}
                                    ref={pickupInputRef}
                                    onChange={(e) => {
                                        setPickupLocation(e.target.value);
                                        handleInputChange();
                                    }}
                                />
                                <input
                                    type="text"
                                    className="mt-3 mb-2"
                                    placeholder="Dropoff location"
                                    ref={dropoffInputRef}
                                    value={dropoffLocation}
                                    onChange={(e) => {
                                        setDropoffLocation(e.target.value);
                                        handleInputChange();
                                    }}
                                />
                                {/* <ThemeProvider theme={theme}>
                                    <TextField
                                        id="pickup"
                                        label="Pickup Location"
                                        variant="outlined"
                                        className='w-100 mt-3'
                                        value={pickupLocation}
                                        inputRef={pickupInputRef}
                                        onChange={(event) => {
                                            setPickupLocation(event.target.value);
                                            handleInputChange();
                                        }}
                                    />
                                </ThemeProvider>

                                <ThemeProvider theme={theme}>
                                    <TextField
                                        id="dropoff"
                                        label="Dropoff Location"
                                        variant="outlined"
                                        className='w-100 mt-3'
                                        value={dropoffLocation}
                                        inputRef={dropoffInputRef}
                                        onChange={(event) => {
                                            setDropoffLocation(event.target.value);
                                            handleInputChange();
                                        }}
                                    />
                                </ThemeProvider> */}
                            </div>
                            <button
                                className="mt-5 btn btn-dark w-100"
                                onClick={handleSearch}
                                disabled={!isSearchEnabled}
                            >
                                Search
                            </button>
                        </div>
                    </div>
                    <div className='mx-5'>
                        {availableRides.length > 0 && (
                            <div className="ride-cards p-3 mt-5" style={{ backgroundColor: "white", width: "700px" }}>
                                <h5 style={{ fontWeight: "bold", fontSize: "35px" }}>Choose a ride</h5>
                                {availableRides.map(ride => (
                                    <div
                                        key={ride.id}
                                        className={`card mb-3 ${selectedRide?.id === ride.id ? 'border-dark border-4 w-100' : ''}`}
                                        style={{ cursor: 'pointer', display: "flex", flexDirection: "row" }}
                                        onClick={() => handleCardSelect(ride)}
                                    >
                                        <img src={ride.image} className="card-img-top mt-5 mb-5 w-25 h-25" alt={ride.name} />
                                        <div className="card-body mt-5" style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                            <div style={{ display: "flex", flexDirection: "column" }}>
                                                <h5 className="card-title" style={{ fontSize: "30px", fontWeight: "700", display: "flex" }}>{ride.name}
                                                    <div style={{ display: "flex", marginLeft: "10px" }}>
                                                        <img src={person} style={{ width: "20px" }} alt='person' /> <p style={{ fontSize: "15px", marginTop: "15px" }}>{ride.person}</p></div>
                                                </h5>
                                                <p style={{ fontSize: "20px" }}>{ride.eta} away {getFormattedTime()}</p>
                                                <p style={{ fontSize: "20px" }}>Affortable compact rides</p>
                                            </div>
                                            <div>
                                                <p style={{ color: 'green', fontWeight: "500" }}><img src={discount} alt='discount' style={{ width: "25px" }} /> 125 % off </p>
                                                <p className="card-text mt-3" style={{ fontSize: "25px", fontWeight: "600" }}>₹{ride.price}</p>
                                                <p style={{ marginLeft: "2vh", fontSize: "20px", textDecoration: "line-through" }}>₹{(parseFloat(ride.price) + parseFloat(ride.price * 0.25))}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <div>
                                        {paymentMethod ?
                                            <>
                                                {paymentMethod === 'GooglePay' ?
                                                    <>
                                                        <img src={googlePay} alt='Google Pay' className='w-75' />
                                                    </>
                                                    :
                                                    <>
                                                        <img src={paypal} alt='paypal' style={{ width: "10vh" }} />
                                                    </>}

                                            </>
                                            :
                                            <>
                                                <div>
                                                    <Link
                                                        className="mt-4 hover-link"
                                                        style={{ fontWeight: "500", fontSize: "21px" }}
                                                        onClick={() => setShowModal(true)}>
                                                        Add Payment Method
                                                    </Link>
                                                </div>
                                            </>
                                        }
                                    </div>
                                    <div className='w-75'>
                                        <button
                                            type='button'
                                            className="button-request-ride mt-3"
                                            onClick={handleRequestRide}
                                            disabled={!selectedRide || !pickupLocation || !dropoffLocation || !paymentMethod}
                                            style={{ marginLeft: "15vh" }}
                                        >
                                            Request a Ride
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div id="map" className="flex-grow-1" style={{ width: "80%", height: "80%", margin: "10vh" }}>
                    <GoogleMap
                        mapContainerStyle={mapContainerStyle}
                        zoom={12}
                        center={center}
                    >
                        {pickupLocation && dropoffLocation && (
                            <DirectionsService
                                options={{
                                    destination: dropoffLocation,
                                    origin: pickupLocation,
                                    travelMode: 'DRIVING',
                                }}
                                callback={handleDirectionsCallback}
                            />
                        )}
                        {/* {directionsResponse && (
                            <div>
                                <DirectionsRenderer
                                    options={{
                                        directions: directionsResponse,
                                    }}
                                />
                                <InfoWindow
                                    position={infoPosition}
                                    options={{ content: infoContent }}
                                />
                            </div>
                        )} */}
                        {directionsResponse && (
                            <DirectionsRenderer
                                options={{
                                    directions: directionsResponse,
                                }}
                            />
                        )}
                        {infoPosition && (
                            <InfoWindow position={infoPosition}>
                                <div dangerouslySetInnerHTML={{ __html: infoContent }} />
                            </InfoWindow>
                        )}
                    </GoogleMap>
                </div>
            </div>
            <div>
                {/* Payment Method Modal */}
                <div className={`modal fade ${showModal ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: showModal ? 'block' : 'none' }}>
                    <div className="modal-dialog" role="document" style={{ width: "500px", border: "none" }}>
                        <div className="modal-content">
                            <div className="modal-header" style={{ border: "none" }}>
                                <h5 className="modal-title" style={{ fontSize: "30px", color: "black", fontWeight: "600" }}>Add payment method</h5>
                                <button type="button" style={{ backgroundColor: "white" }} onClick={() => setShowModal(false)}>
                                    <span aria-hidden="true" style={{ color: "black", fontSize: "40px" }}>&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <ul className="list-group" style={{ border: "none", padding: 0 }}>
                                    <li className="list-group-item d-flex justify-content-between align-items-center pl-5 pr-5" style={{ border: "none", borderBottom: "1px solid #dee2e6", padding: "10px 0" }}>
                                        <Link onClick={handlePaymentMethodSelection} className="text-decoration-none text-dark d-flex justify-content-between align-items-center w-100" style={{ fontSize: "25px" }}>
                                            <img src={paypal} alt='PayPal' style={{ width: "130px" }} />
                                            <span className="text-dark">&gt;</span>
                                        </Link>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center pl-5 pr-5" style={{ border: "none", borderBottom: "1px solid #dee2e6", padding: "10px 0" }}>
                                        <Link onClick={handleGooglePaySelection} className="text-decoration-none text-dark d-flex justify-content-between align-items-center w-100" style={{ fontSize: "25px" }}>
                                            <img src={googlePay} alt='Google Pay' style={{ width: "130px" }} />
                                            <span className="text-dark">&gt;</span>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="modal-footer" style={{ border: "none" }}>
                                <button type="button" className="btn btn-dark" onClick={() => setShowModal(false)}>
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Second Modal for Further Process */}
                <div className={`modal fade ${showSecondModal ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: showSecondModal ? 'block' : 'none' }}>
                    <div className="modal-dialog" role="document" style={{ width: "500px", border: "none" }}>
                        <div className="modal-content">
                            <div className="modal-header" style={{ border: "none" }}>
                                <h5 className="modal-title" style={{ fontSize: "30px", color: "black", fontWeight: "600" }}><img src={paypal} alt='paypal' style={{ width: "130px" }} /></h5>
                                <button type="button" style={{ backgroundColor: "white" }} onClick={handleBackToFirstModal}>
                                    <span aria-hidden="true" style={{ color: "black", fontSize: "40px" }}>&larr;</span>
                                </button>
                            </div>
                            <div className="modal-body" style={{ marginBottom: "20vh" }}>
                                <p>Here you can add further payment processing options or instructions.</p>
                                {/* Add any further process content here */}
                            </div>
                            <div className="mx-auto w-100" style={{ border: "none" }}>
                                <button onClick={PaypalPayment} className='w-100' style={{ backgroundColor: "#FFD500", color: "black", fontSize: "30px", fontWeight: "600", padding: "0px", borderRadius: "0px" }} >Pay with <img src={paypal} alt='paypal' style={{ width: "100px" }} /></button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`modal fade ${showThirdModal ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: showThirdModal ? 'block' : 'none' }}>
                    <div className="modal-dialog" role="document" style={{ width: "500px", border: "none" }}>
                        <div className="modal-content">
                            <div className="modal-header" style={{ border: "none" }}>
                                <h5 className="modal-title" style={{ fontSize: "30px", color: "black", fontWeight: "600" }}><img src={googlePay} alt='Google Pay' style={{ width: "130px" }} /></h5>
                                <button type="button" style={{ backgroundColor: "white" }} onClick={handleBackToFirstModal}>
                                    <span aria-hidden="true" style={{ color: "black", fontSize: "40px" }}>&larr;</span>
                                </button>
                            </div>
                            <div className="modal-body" style={{ marginBottom: "20vh" }}>
                                <p>Here you can add further payment processing options or instructions.</p>
                                {/* Add any further process content here */}
                            </div>
                            <div className="mx-auto w-100" style={{ border: "none" }}>
                                <button onClick={GooglePay} className='w-100' style={{ backgroundColor: "#000", color: "white", fontSize: "30px", fontWeight: "600", padding: "0px", borderRadius: "0px" }} >Pay with <img src={googlePay} alt='Google Pay' style={{ width: "100px" }} /></button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default BookRide;
