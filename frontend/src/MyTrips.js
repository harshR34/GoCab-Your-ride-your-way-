import React, { useEffect, useState } from 'react';
import './MyTrips.css'; // Optional: Add custom styles here
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faSuitcase } from '@fortawesome/free-solid-svg-icons';
import profile from './images/userProfile.webp';
import { jwtDecode } from 'jwt-decode';
import paypal from './images/paypal.svg'
import axios from 'axios';
import cardImage from './images/cardImage.svg';
import cardJPG from './images/cardImage.jpg'
import googlePay from './images/google-pay.svg';
import location from './images/location.svg';
import payment from './images/payment-method.svg';
import dateTime from './images/time-and-date.svg';
import duration from './images/duration.svg';
import distance from './images/distance.svg';
import price from './images/price-tag.svg';
import lines from './images/lines.svg';
import GoCab from './images/gocab_logo_black.png';
import jsPDF from 'jspdf';
// import Button from '@mui/material/Button';
// import DownloadIcon from '@mui/icons-material/Download';

const MyTrips = () => {
    const token = localStorage.getItem("authTokens");
    const user = jwtDecode(token);
    const name = user.full_name;
    const email = user.email;
    const [data, setData] = useState([]);
    const [downloading, setDownloading] = useState(false);

    // function generateTripPDF(trip, userName, userEmail, brandName, brandLogo) {
    //     const doc = new jsPDF({
    //         orientation: 'landscape',
    //         unit: 'mm',
    //         hotAreas: true
    //     });

    //     // Calculate scaled dimensions for half landscape (210mm x 105mm)
    //     const pageWidth = doc.internal.pageSize.getWidth();
    //     const pageHeight = doc.internal.pageSize.getHeight();
    //     const newWidth = 210;
    //     const newHeight = 105;
    //     doc.scale(newWidth / pageWidth, newHeight / pageHeight);

    //     // Header (date at right corner)
    //     doc.setFontSize(15);
    //     doc.text(`Date: ${new Date().toLocaleDateString()}`, 278, 25, { align: 'right' });

    //     // User details box
    //     const userDetailsBoxHeight = 20;
    //     const userDetailsBoxMargin = 10;
    //     doc.setDrawColor(128, 128, 128); // Adjust border color
    //     doc.rect(10, 10, doc.internal.pageSize.getWidth() - 20, userDetailsBoxHeight + 5, 'D');

    //     doc.setFontSize(35); // Adjust username font size (30-40px)
    //     doc.setFont('Times New Roman');
    //     doc.text(userName, userDetailsBoxMargin + 7, userDetailsBoxHeight + 4); // Adjust positioning

    //     doc.setFontSize(15);
    //     doc.text(`Email: ${userEmail}`, doc.internal.pageSize.getWidth() - 278, userDetailsBoxHeight + 10);

    //     // Trip details
    //     const tripDetailsY = 50; // Adjust starting Y position
    //     const tripDetailsX = 30; // Adjust starting X position
    //     const tripDetailsWidth = 150;

    //     doc.addImage(cardJPG, 'JPG', 0, tripDetailsY, 300, 65); // Adjust image dimensions

    //     doc.setFontSize(22);
    //     doc.text(`Trip Invoice`, tripDetailsX + 110, tripDetailsY - 5); // Adjusted title

    //     doc.setFontSize(17);
    //     const tripDetailsSpacing = 5; // Adjust spacing between trip details
    //     doc.text(`Pickup Location : ${trip.pickupLocation}`, tripDetailsX, tripDetailsY + 80 + tripDetailsSpacing);
    //     doc.text(`Dropoff Location : ${trip.dropoffLocation}`, tripDetailsX, tripDetailsY + 93 + tripDetailsSpacing);
    //     doc.text(`Date-Time : ${trip.dateTime}`, tripDetailsX, tripDetailsY + 105 + tripDetailsSpacing);
    //     doc.text(`Distance : ${trip.selectedRide.distance}`, tripDetailsX, tripDetailsY + 120 + tripDetailsSpacing);
    //     doc.text(`Duration : ${trip.selectedRide.duration}`, tripDetailsX + 80, tripDetailsY + 120 + tripDetailsSpacing);
    //     doc.text(`Price : ${trip.selectedRide.price} Rs.`, tripDetailsX, tripDetailsY + 135 + tripDetailsSpacing);

    //     // Payment details
    //     const paymentDetailsY = tripDetailsY + 140; // Adjust starting Y position for payment details
    //     doc.text(`Payment: ${trip.paymentMethod}`, tripDetailsX + 80, paymentDetailsY);

    //     // Footer
    //     const footerY = doc.internal.pageSize.getHeight() - 10;
    //     doc.setFontSize(10);
    //     doc.text(brandName, 10, footerY);
    //     doc.addImage(brandLogo, 'PNG', doc.internal.pageSize.getWidth() - 45, footerY - 5, 40, 10); // Adjust logo dimensions

    //     // Save the PDF
    //     doc.save(`trip_${trip.pickupLocation}_to_${trip.dropoffLocation}.pdf`);
    // }
    function generateTripPDF(trip, userName, userEmail, brandName, brandLogo) {
        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });
    
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
    
        // Add Invoice Title (Header)
        doc.setFontSize(22);
        doc.setFont('Helvetica', 'bold');
        doc.setTextColor(255, 255, 255);
        doc.setFillColor(71, 60, 175);
        doc.rect(0, 0, pageWidth, 25, 'F');
        doc.text('Taxi Invoice', pageWidth / 2, 15, { align: 'center' });
    
        // Add Greetings and Thanks
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(12);
        doc.text(`Hi ${userName},`, 10, 35);
        doc.text('Thanks for riding with us', pageWidth - 60, 35);
    
        // Add Invoice Date
        doc.text('Invoice Date:', 10, 45);
        doc.text(new Date().toLocaleDateString(), 40, 45);
    
        // Add Ride Details Table
        const tableTop = 60;
        doc.setFillColor(71, 60, 175);
        doc.rect(10, tableTop, pageWidth - 20, 8, 'F');
        doc.setFontSize(12);
        doc.setTextColor(255, 255, 255);
        doc.text('Ride From', 12, tableTop + 5);
        doc.text('Ride To', pageWidth / 2 - 15, tableTop + 5);
    
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(11);
        doc.text(trip.pickupLocation, 12, tableTop + 15);
        doc.text(trip.dropoffLocation, pageWidth / 2 - 15, tableTop + 15);
    
        // Add Date-Time and Payment Method
        doc.text('Date-Time : ', 12, tableTop + 35);
        doc.text(trip.dateTime, 40, tableTop + 35);
        doc.text('Payment Method : ', pageWidth / 2 - 15, tableTop + 25);
        doc.text(trip.paymentMethod, pageWidth / 2 + 20, tableTop + 25);
    
        // Ride Details Table Headers
        const descriptionTableTop = tableTop + 50;
        doc.setFillColor(71, 60, 175);
        doc.rect(10, descriptionTableTop, pageWidth - 20, 8, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(12);
        doc.text('Distance (Km)', 12, descriptionTableTop + 5);
        doc.text('Duration (Min)', pageWidth / 2 - 40, descriptionTableTop + 5);
        doc.text('Price (Rs)', pageWidth - 45, descriptionTableTop + 5);
    
        // Ride Details Table Row
        doc.setTextColor(0, 0, 0);
        const rowHeight = 10;
        let currentRow = descriptionTableTop + 15;
    
        doc.text(trip.selectedRide.distance, 12, currentRow);
        doc.text(trip.selectedRide.duration, pageWidth / 2 - 40, currentRow);
        doc.text(trip.selectedRide.price, pageWidth - 45, currentRow);
    
        // Total Fare
        currentRow += rowHeight;
        doc.text('Total Fare Payable:', 12, currentRow + 10);
        doc.text(`${trip.selectedRide.price} Rs.`, pageWidth - 45, currentRow + 10);
    
        // Footer
        doc.setFontSize(10);
        doc.text(`Amount in words: ${trip.amountInWords || ''}`, 12, currentRow + 20);
        doc.text('Notes:', 12, currentRow + 30);
    
        // Seal & Signature
        doc.text('Seal & Signature', pageWidth - 45, currentRow + 45);
    
        // Add JPG Image after Seal & Signature
        const jpgImageY = currentRow + 55; // Adjust the Y position for the JPG image
        doc.addImage(cardJPG, 'JPG', 10, jpgImageY, 190, 65); // Adjust width/height based on image
    
        // Add Brand Logo and Name in Footer
        const footerY = pageHeight - 20;
        doc.setFontSize(10);
        doc.text(brandName, 10, footerY);
        doc.addImage(brandLogo, 'PNG', pageWidth - 45, footerY - 10, 40, 10);
    
        // Save the PDF
        doc.save(`trip_${trip.pickupLocation}_to_${trip.dropoffLocation}.pdf`);
    }
    
    

    function generateTripPDFPast(trip, userName, userEmail, brandName, brandLogo) {
        const doc = new jsPDF({
            orientation: 'landscape',
            unit: 'mm',
            hotAreas: true
        });

        // Calculate scaled dimensions for half landscape (210mm x 105mm)
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const newWidth = 210;
        const newHeight = 105;
        doc.scale(newWidth / pageWidth, newHeight / pageHeight);

        // Header (date at right corner)
        doc.setFontSize(15);
        doc.text(`Date: ${new Date().toLocaleDateString()}`, 278, 25, { align: 'right' });

        // User details box
        const userDetailsBoxHeight = 20;
        const userDetailsBoxMargin = 10;
        doc.setDrawColor(128, 128, 128); // Adjust border color
        doc.rect(10, 10, doc.internal.pageSize.getWidth() - 20, userDetailsBoxHeight + 5, 'D');

        doc.setFontSize(35); // Adjust username font size (30-40px)
        doc.setFont('Times New Roman');
        doc.text(userName, userDetailsBoxMargin + 7, userDetailsBoxHeight + 4); // Adjust positioning

        doc.setFontSize(15);
        doc.text(`Email: ${userEmail}`, doc.internal.pageSize.getWidth() - 278, userDetailsBoxHeight + 10);

        // Trip details
        const tripDetailsY = 50; // Adjust starting Y position
        const tripDetailsX = 30; // Adjust starting X position
        const tripDetailsWidth = 150;

        doc.addImage(cardJPG, 'JPG', 0, tripDetailsY, 300, 65); // Adjust image dimensions

        doc.setFontSize(22);
        doc.text(`Trip Details`, tripDetailsX + 110, tripDetailsY - 5); // Adjusted title

        doc.setFontSize(17);
        const tripDetailsSpacing = 5; // Adjust spacing between trip details
        doc.text(`Pickup Location : ${trip.pickup}`, tripDetailsX, tripDetailsY + 80 + tripDetailsSpacing);
        doc.text(`Dropoff Location : ${trip.dropoff}`, tripDetailsX + 80, tripDetailsY + 80 + tripDetailsSpacing);
        doc.text(`Date-Time : ${trip.dateTime}`, tripDetailsX, tripDetailsY + 95 + tripDetailsSpacing);
        doc.text(`Distance : ${trip.distance}`, tripDetailsX, tripDetailsY + 110 + tripDetailsSpacing);
        doc.text(`Duration : ${trip.duration}`, tripDetailsX + 80, tripDetailsY + 110 + tripDetailsSpacing);
        doc.text(`Price : ${trip.price} Rs.`, tripDetailsX, tripDetailsY + 125 + tripDetailsSpacing);

        // Payment details
        const paymentDetailsY = tripDetailsY + 130; // Adjust starting Y position for payment details
        doc.text(`Payment: ${trip.paymentMethod}`, tripDetailsX + 80, paymentDetailsY);

        // Footer
        const footerY = doc.internal.pageSize.getHeight() - 10;
        doc.setFontSize(10);
        doc.text(brandName, 10, footerY);
        doc.addImage(brandLogo, 'PNG', doc.internal.pageSize.getWidth() - 45, footerY - 5, 40, 10); // Adjust logo dimensions

        // Save the PDF
        doc.save(`trip_${trip.pickup}_to_${trip.dropoff}.pdf`);
    }



    const fetchData = () => {
        axios.get('http://127.0.0.1:8000/api/mytrips-list/')
            .then((response) => {
                setData(response.data);
            }).catch((error) => { console.log(error) });
    }

    function capitalizeFirstLetter(string) {
        var st = string.charAt(0).toUpperCase() + string.slice(1);
        return st.split(" ")[0]
    }
    const trips = JSON.parse(localStorage.getItem(`${capitalizeFirstLetter(name)}Trips`))

    const handleTrips = () => {
        if (trips) {
            fetchData();
            console.log(data)
        }
        else {
            console.log("no data")
        }
    }
    useEffect(() => {
        fetchData();
    }, [])
    function renderPaypal(method) {
        if (method === "Paypal") {
            return <img src={paypal} alt="paypal" style={{ width: "100px" }} />
        }
        else if (method === 'GooglePay') {
            return <img src={googlePay} alt="Google Pay" style={{ width: "135px" }} />
        }
    }
    return (
        <div>
            <header className="d-flex align-items-center justify-content-between px-4 py-2 bg-white border-bottom">
                <div className="d-flex align-items-center">
                    <h2 className="mb-0 font-weight-bold">GoCab</h2>
                    <nav className="ml-4" style={{ display: "flex", flexDirection: "row" }}>
                        <Link to="/book-ride" className="text-dark d-flex align-items-center mx-3 hover-link">
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
            {/* {console.log(trips)} */}
            <div className="container-lg mt-5 mb-5">
                <div style={{ display: "flex", justifyContent: "space-between" }}>

                    <h1 className='border p-4 w-50' style={{ borderRadius: "15px" }}>Welcome , {capitalizeFirstLetter(name)}
                        <p style={{ fontSize: "15px" }}>Email : <span>{email}</span></p>
                    </h1>
                    <div>
                        <a href='#currentTrips' className='btn btn-outline-dark ms-2'>Current Trips</a>
                        <a className='btn btn-outline-dark ms-2' href='#pastTrips'>Past Trips</a>
                    </div>
                </div>

                <div className='mt-5'>
                    <h1 id='currentTrips'>Current trips</h1>
                    {trips.length > 0 && (<>
                        {/* {trips.map((trip, index) => {
                            return <>
                                <div className="card mt-3 mb-3 mt-5" style={{ borderRadius: "20px" }}>
                                    <div className="card-body">
                                        <img className='card-img-top mb-2' src={cardImage} alt='card images' />
                                        <h5 className="card-title">Trip {(index + 1)}</h5>
                                        <div style={{ display: "flex" }}>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <div style={{ marginLeft: "20px", display: 'flex', flexDirection: "column", fontWeight: "500" }}>
                                                    <span>
                                                        <img src={location} alt='Pickup location' style={{ width: "33px" }} />
                                                    </span>
                                                    <span style={{ marginTop: "10px", fontSize: "30px" }}>
                                                        {trip.pickupLocation}
                                                    </span>
                                                </div>

                                                <div style={{ flexGrow: 1, margin: '0 20px', display: 'flex', justifyContent: 'center' }}>
                                                    <img src={lines} alt='source---destination' />
                                                </div>

                                                <div style={{ marginLeft: "20px", display: 'flex', flexDirection: "column", fontWeight: "500" }}>
                                                    <span>
                                                        <img src={location} alt='Dropoff location' style={{ width: "33px" }} />
                                                    </span>
                                                    <span style={{ marginTop: "10px", fontSize: "30px" }}>
                                                        {trip.dropoffLocation}
                                                    </span>
                                                </div>
                                            </div>


                                            <div style={{ display: "flex" }}>
                                                <p style={{ marginLeft: "20px", display: 'flex', flexDirection: "column", fontWeight: "500" }}>
                                                    <span>
                                                        <img src={payment} alt='payment method' style={{ width: "33px" }} />
                                                    </span> </p>
                                                {renderPaypal(trip.paymentMethod)}
                                            </div>

                                            <p style={{ marginLeft: "20px", display: 'flex', flexDirection: "column", fontWeight: "500" }}><span>Booking
                                                <img src={dateTime} alt='Dropoff location' className='mx-2' style={{ width: "33px" }} />
                                            </span><span style={{ marginLeft: "50px", fontSize: "30px" }}>{trip.dateTime}</span></p>

                                        </div>
                                        <div className='d-flex'>
                                            <p style={{ marginLeft: "20px", display: 'flex', flexDirection: "column", fontWeight: "500" }}><span>
                                                <img src={distance} alt='payment method' style={{ width: "33px" }} />
                                            </span> <span style={{ marginLeft: "50px", fontSize: "30px" }}>{trip.selectedRide.distance}</span></p>

                                            <p style={{ marginLeft: "20px", display: 'flex', flexDirection: "column", fontWeight: "500" }}><span>
                                                <img src={duration} alt='payment method' style={{ width: "33px" }} />
                                            </span> <span style={{ marginLeft: "50px", fontSize: "30px" }}>{trip.selectedRide.duration}</span></p>

                                            <p style={{ marginLeft: "20px", display: 'flex', flexDirection: "column", fontWeight: "500" }}><span>
                                                <img src={price} alt='payment method' style={{ width: "33px" }} />
                                            </span> <span style={{ marginLeft: "50px", fontSize: "30px" }}>{trip.selectedRide.price} Rs.</span></p>

                                            <p style={{ marginLeft: "20px", display: 'flex', flexDirection: "column", fontWeight: "500" }}>
                                                <span>Driver Name : </span>
                                                <span style={{ marginLeft: "50px", fontSize: "30px" }}>{trip.driverName}</span></p>
                                            
                                            <p style={{ marginLeft: "20px", display: 'flex', flexDirection: "column", fontWeight: "500" }}>
                                            <span>Driver Phone Number : </span>
                                            <span style={{ marginLeft: "50px", fontSize: "30px" }}>{trip.phone}</span></p>

                                        </div>
                                        <div style={{ display: "flex", alignItems: "end", justifyContent: "end" }}>
                                            <button className='btn btn-outline-dark' style={{ border: "1px solid black" }}
                                                onClick={() => {
                                                    if (!downloading) {
                                                        setDownloading(true);
                                                        generateTripPDF(trip, name, email, 'GoCab Technologies LTD.', GoCab);
                                                        setDownloading(false);
                                                    }
                                                }}
                                                disabled={downloading}
                                            >Download</button>
                                        </div>
                                    </div>
                                </div>
                            </>
                        })} */}
                    </>)}
                    {trips.length > 0 && (
                        <>
                            {trips
                                .sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime)) // Sort by dateTime, most recent first
                                .map((trip, index) => (
                                    <div className="card mt-3 mb-3 mt-5" style={{ borderRadius: "20px" }} key={index}>
                                        <div className="card-body">
                                            <img className='card-img-top mb-2' src={cardImage} alt='card images' />
                                            <h5 className="card-title">Trip {(index + 1)}</h5>
                                            <div style={{ display: "flex" }}>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <div style={{ marginLeft: "20px", display: 'flex', flexDirection: "column", fontWeight: "500" }}>
                                                        <span>
                                                            Pickup : 
                                                        </span>
                                                        <span style={{ marginTop: "10px", fontSize: "30px" }}>
                                                            {trip.pickupLocation}
                                                        </span>
                                                    </div>

                                                    <div style={{ flexGrow: 1, margin: '0 20px', display: 'flex', justifyContent: 'center' }}>
                                                        <img src={lines} alt='source---destination' />
                                                    </div>

                                                    <div style={{ marginLeft: "20px", display: 'flex', flexDirection: "column", fontWeight: "500" }}>
                                                        <span>
                                                            DropOff :
                                                        </span>
                                                        <span style={{ marginTop: "10px", fontSize: "30px" }}>
                                                            {trip.dropoffLocation}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div style={{ display: "flex" }}>
                                                    <p style={{ marginLeft: "20px", display: 'flex', flexDirection: "column", fontWeight: "500" }}>
                                                        <span>
                                                           Payment Method :
                                                        </span>
                                                    </p>
                                                    {renderPaypal(trip.paymentMethod)}
                                                </div>

                                                <p style={{ marginLeft: "20px", display: 'flex', flexDirection: "column", fontWeight: "500" }}>
                                                    <span>Booking
                                                        Date-Time : 
                                                    </span>
                                                    <span style={{ marginLeft: "50px", fontSize: "30px" }}>{trip.dateTime}</span>
                                                </p>
                                            </div>

                                            <div className='d-flex'>
                                                <p style={{ marginLeft: "20px", display: 'flex', flexDirection: "column", fontWeight: "500" }}>
                                                    <span>
                                                        Distance : 
                                                    </span>
                                                    <span style={{ marginLeft: "50px", fontSize: "30px" }}>{trip.selectedRide.distance}</span>
                                                </p>

                                                <p style={{ marginLeft: "20px", display: 'flex', flexDirection: "column", fontWeight: "500" }}>
                                                    <span>
                                                       Duration : 
                                                    </span>
                                                    <span style={{ marginLeft: "50px", fontSize: "30px" }}>{trip.selectedRide.duration}</span>
                                                </p>

                                                <p style={{ marginLeft: "20px", display: 'flex', flexDirection: "column", fontWeight: "500" }}>
                                                    <span>
                                                       Price :
                                                    </span>
                                                    <span style={{ marginLeft: "50px", fontSize: "30px" }}>{trip.selectedRide.price} Rs.</span>
                                                </p>

                                                <p style={{ marginLeft: "20px", display: 'flex', flexDirection: "column", fontWeight: "500" }}>
                                                    <span>Driver Name:</span>
                                                    <span style={{ marginLeft: "50px", fontSize: "30px" }}>{trip.driverName}</span>
                                                </p>

                                                <p style={{ marginLeft: "20px", display: 'flex', flexDirection: "column", fontWeight: "500" }}>
                                                    <span>Driver Phone Number:</span>
                                                    <span style={{ marginLeft: "50px", fontSize: "30px" }}>{trip.driverPhone}</span>
                                                </p>
                                            </div>

                                            <div style={{ display: "flex", alignItems: "end", justifyContent: "end" }}>
                                                <button className='btn btn-outline-dark' style={{ border: "1px solid black" }}
                                                    onClick={() => {
                                                        if (!downloading) {
                                                            setDownloading(true);
                                                            generateTripPDF(trip, name, email, 'GoCab Technologies LTD.', GoCab);
                                                            setDownloading(false);
                                                        }
                                                    }}
                                                    disabled={downloading}
                                                >Download</button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </>
                    )}

                </div>
            </div>

            <div className="container-lg mt-5 mb-5">
                <div className='mt-5'>
                    <div style={{ display: "flex", justifyContent: "space-between" }} >
                        <h1 id='pastTrips'>Past trips</h1>
                        <a href='#currentTrips' className='btn btn-outline-dark pt-3'>Current Trips</a>
                    </div>
                    {data.length > 0 && (<>
                        {data.map((dt, index) => {
                            if (dt.email === email) {
                                return <>
                                    <div className="card mt-3 mb-3 mt-5" style={{ borderRadius: "20px" }}>
                                        <div className="card-body">
                                            <img className='card-img-top mb-2' src={cardImage} alt='card images' />
                                            <h5 className="card-title">Trip {(index + 1)}</h5>
                                            <div style={{ display: "flex" }}>
                                                <p style={{ marginLeft: "20px", display: 'flex', flexDirection: "column", fontWeight: "500" }}>From : <span style={{ marginLeft: "50px", fontSize: "30px" }}>{dt.pickup}</span></p>

                                                <p style={{ marginLeft: "20px", display: 'flex', flexDirection: "column", fontWeight: "500" }}>To : <span style={{ marginLeft: "50px", fontSize: "30px" }}>{dt.dropoff}</span></p>

                                                <div style={{ display: "flex" }}>
                                                    <p style={{ marginLeft: "20px", display: 'flex', flexDirection: "column", fontWeight: "500" }}>Payment Method : </p>
                                                    {renderPaypal(dt.paymentMethod)}
                                                </div>

                                                <p style={{ marginLeft: "20px", display: 'flex', flexDirection: "column", fontWeight: "500" }}>Booking Date & Time : <span style={{ marginLeft: "50px", fontSize: "30px" }}>{dt.dateTime}</span></p>

                                            </div>
                                            <div className='d-flex'>
                                                <p style={{ marginLeft: "20px", display: 'flex', flexDirection: "column", fontWeight: "500" }}>Distance : <span style={{ marginLeft: "50px", fontSize: "30px" }}>{dt.distance}</span></p>

                                                <p style={{ marginLeft: "20px", display: 'flex', flexDirection: "column", fontWeight: "500" }}>Duration : <span style={{ marginLeft: "50px", fontSize: "30px" }}>{dt.duration}</span></p>

                                                <p style={{ marginLeft: "20px", display: 'flex', flexDirection: "column", fontWeight: "500" }}>Price : <span style={{ marginLeft: "50px", fontSize: "30px" }}>{dt.price} Rs.</span></p>
                                            </div>
                                            <div style={{ display: "flex", alignItems: "end", justifyContent: "end" }}>

                                                <button className='btn btn-outline-dark' style={{ border: "1px solid black" }}
                                                    onClick={() => {
                                                        if (!downloading) {
                                                            setDownloading(true);
                                                            generateTripPDFPast(dt, name, email, 'GoCab Technologies LTD.', GoCab);
                                                            setDownloading(false);
                                                        }
                                                    }}
                                                    disabled={downloading}>Download</button>
                                                {/* <Button
                                                    className='btn btn-outline-dark'
                                                    variant="outlined"
                                                    sx={{ color: "black", border: "1px solid black" }}
                                                    startIcon={<DownloadIcon />}
                                                    onClick={() => {
                                                        if (!downloading) {
                                                            setDownloading(true);
                                                            generateTripPDFPast(dt, name, email, 'GoCab Technologies LTD.', GoCab);
                                                            setDownloading(false);
                                                        }
                                                    }}
                                                    disabled={downloading}
                                                >
                                                    Download
                                                </Button> */}
                                            </div>
                                        </div>
                                    </div>
                                </>
                            }
                        })}
                    </>)}
                </div>
            </div>
        </div>
    );
};

export default MyTrips;
