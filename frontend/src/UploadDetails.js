import React, { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import driverLicense from './images/ind_drivers_license.png'
import profilePicture from './images/profile picture.webp'
import AdhaarSVG from './images/AdhaarSVG.svg'
import PanSVG from './images/india_pan_card_sample_image.png'
import { useNavigate } from 'react-router-dom';
import { Container, Form, Row, Col, Button, Alert } from 'react-bootstrap';
import file_upload from './images/file-upload.svg';
const UploadDetails = () => {
    const { documentType } = useParams();
    const fileInputRef = useRef(null);
    const [licenseNumber, setLicenseNumber] = useState('');
    const [maskedLicense, setMaskedLicense] = useState('');
    const [isValid, setIsValid] = useState(true);
    const [image, setImage] = useState();
    const [adhaar, setAdhaarCard] = useState('')
    const [pan, setPanCard] = useState('')
    const [lcplate, setLicensePlateNumber] = useState();
    const [photo, setPhoto] = useState(null);
    const [isDragOver, setIsDragOver] = useState(false);

    const navigate = useNavigate();

    const handleBackClick = () => {
        window.history.back(); // Go to the previous page
    };

    const handleHelpClick = () => {
        alert('Help button clicked'); // Placeholder for help functionality
    };

    const handleClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setImage(file);
        if (file) {
            console.log('File selected:', file.name);
            // You can handle the file upload logic here
        }
    };

    const handleLicenseNumberChange = (event) => {
        const input = event.target.value.toUpperCase(); // Convert to uppercase
        const regex = /^[A-Z0-9]*$/; // Only alphanumeric characters are allowed

        if (input.length <= 15 && regex.test(input)) {
            setLicenseNumber(input);
            setIsValid(true);

            // Mask the license number for privacy (e.g., show only the last 4 characters)
            const masked = input.length > 4 ? '*'.repeat(input.length - 4) + input.slice(-4) : input;
            setMaskedLicense(masked);
        } else {
            setIsValid(false); // Invalid input
        }
    };
    const handleAdhaarCard = (event) => {
        const input = event.target.value;
        const regex = /^[0-9]*$/; // Only numeric characters are allowed
        if (input.length <= 12 && regex.test(input)) {
            setAdhaarCard(input);
            setIsValid(true);

            const masked = input.length > 4 ? '*'.repeat(input.length - 4) + input.slice(-4) : input;
            setMaskedLicense(masked);
        }
        else {
            setIsValid(false); // Invalid input
        }
    }
    const handlePanCard = (event) => {
        const input = event.target.value.toUpperCase();
        const regex = /^[A-Z0-9]*$/; // Only numeric characters are allowed
        if (input.length <= 10 && regex.test(input)) {
            setPanCard(input);
            setIsValid(true);

            const masked = input.length > 4 ? '*'.repeat(input.length - 4) + input.slice(-4) : input;
            setMaskedLicense(masked);
        }
        else {
            setIsValid(false); // Invalid input
        }
    }

    const handleLicensePlateNumber = (event) => {
        const input = event.target.value.toUpperCase();
        const regex = /^[A-Z0-9]*$/; // Only alphanumeric characters are allowed
        if (input.length <= 10 && regex.test(input)) {
            setLicensePlateNumber(input);
            setIsValid(true);

            const masked = input.length > 4 ? '*'.repeat(input.length - 4) + input.slice(-4) : input;
            setMaskedLicense(masked);
        }
        else {
            setIsValid(false); // Invalid input
        }
    }
    const [hover, setHover] = useState(null);
    const linkStyle = {
        textDecoration: hover === 'upload' ? "underline" : "none",
        color: "black",
    }
    const handleSubmit = () => {
        if (documentType === 'driving-license-front') {
            // Save the license number to localStorage
            localStorage.setItem('drivingLicense', licenseNumber);
            handleBackClick();
        }
        else if (documentType === 'profile-photo') {
            // Save the license number to localStorage
            localStorage.setItem('profilePhoto', photo.file);
            handleBackClick();
        }
        else if (documentType === 'aadhaar-card') {
            // Save the license number to localStorage
            localStorage.setItem('adhaarNumber', adhaar);
            handleBackClick();
        }
        else if (documentType === 'pan-card') {
            // Save the license number to localStorage
            localStorage.setItem('panNumber', pan);
            handleBackClick();
        }
        else if (documentType === 'registration-certificate') {
            // Save the license number to localStorage
            localStorage.setItem('lcpPlate', lcplate);
            handleBackClick();
        }
        // Perform other submit actions if necessary
    };



    // const fileInputRef = useRef(null);

    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file) {
            handleFileUpload(file);
        }
        setIsDragOver(false);
    };

    const handleFileUpload = (file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setPhoto(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const removePhoto = () => {
        setPhoto(null);
    };

    if (documentType === 'driving-license-front') {
        return (
            <>
                <div className="bg-dark text-light vh-100 d-flex flex-column align-items-center">
                    <div className="container-lg d-flex flex-column align-items-center mt-4" >

                        <div className="card shadow-sm" style={{ width: '100%', maxWidth: '400px' }}>
                            <div className="w-100 bg-black text-white py-2 d-flex align-items-center justify-content-between">
                                <button className="btn btn-link text-white" onClick={handleBackClick}>
                                    <i className="bi bi-arrow-left"></i>
                                </button>
                                <h5 className="mb-0">GoCab</h5>
                                <button className="btn btn-link text-white" onClick={handleHelpClick}>
                                    Help <i className="bi bi-question-circle"></i>
                                </button>
                            </div>
                            <h3 className="mt-3 mb-4">Enter your licence number and date of birth</h3>
                            <img
                                src={driverLicense}
                                alt="Driver's License"
                                className="img-fluid mb-3"
                                style={{ borderRadius: '8px' }}
                            />
                            <div className="card-body">
                                <div className="form-group mb-3">
                                    License Number
                                    <input
                                        type="text"
                                        className={`form-control ${isValid ? '' : 'is-invalid'}`}
                                        placeholder="DL0000000000000"
                                        value={licenseNumber}
                                        onChange={handleLicenseNumberChange}
                                    />
                                    <div className="form-text text-muted">
                                        {maskedLicense}
                                    </div>
                                    {!isValid && <div className="invalid-feedback">Invalid license number format.</div>}
                                </div>
                                <div className="form-group mb-3">
                                    Date-Of-Birth
                                    <input type="date" className="form-control" />
                                </div>
                                <div className="form-group mb-4 text-center">
                                    <a href="#upload" onClick={handleClick} onMouseEnter={() => { setHover("upload") }} onMouseLeave={() => { setHover(null) }} style={linkStyle}>
                                        Upload document
                                    </a>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        style={{ display: 'none' }}
                                        onChange={handleFileChange}
                                        accept="image/*"
                                    />
                                </div>
                                <button className="btn btn-dark  w-100" onClick={handleSubmit} disabled={!licenseNumber || !isValid}>
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
    else if (documentType === 'profile-photo') {
        return (
            <>
                <div className="bg-dark text-light vh-100 d-flex flex-column align-items-center" style={{ transform: 'none', transition: "none", boxShadow: "none" }}>
                    <div className="container-lg d-flex flex-column align-items-center mt-4" >
                        <div className="card shadow-sm" style={{ width: '100%', maxWidth: '400px' }}>
                            <div className="w-100 bg-black text-white py-2 d-flex align-items-center justify-content-between">
                                <button className="btn btn-link text-white" onClick={handleBackClick}>
                                    <i className="bi bi-arrow-left"></i>
                                </button>
                                <h5 className="mb-0">GoCab</h5>
                                <button className="btn btn-link text-white" onClick={handleHelpClick}>
                                    Help <i className="bi bi-question-circle"></i>
                                </button>
                            </div>
                            <h5 className="mt-3 mb-1 text-center">Upload profile Photo</h5>
                            <div className="card-body">
                                <div className="d-flex justify-content-center align-items-center flex-grow-1 mb-3" style={{border:"1px dashed black"}}>
                                    <div className="d-flex justify-content-center align-items-center" style={{ width: '100%', height: '100%' }}>
                                        <div
                                            className={`border-2 rounded p-4 d-flex flex-column align-items-center justify-content-center position-relative ${isDragOver ? 'border-dark' : 'border-light'}`}
                                            style={{ border: '2px dashed lightgray', width: '500px', height: '300px', backgroundColor: '#f8f9fa' }}
                                            onDragOver={(e) => {
                                                e.preventDefault();
                                                setIsDragOver(true);
                                            }}
                                            onDragLeave={() => setIsDragOver(false)}
                                            onDrop={handleDrop}
                                            onClick={() => fileInputRef.current.click()} // Click to upload
                                        >
                                            {!photo ? (
                                                <>
                                                    <img src={file_upload} alt='Fileupload svg'/>
                                                    <p>SVG , PNG , JPG</p>
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        ref={fileInputRef}
                                                        className="position-absolute w-100 h-100 opacity-0"
                                                        onChange={(e) => handleFileUpload(e.target.files[0])}
                                                        style={{ cursor: 'pointer' }}
                                                    />
                                                </>
                                            ) : (
                                                <div id="uploaded-photo" className="position-relative" style={{padding:"30px"}}>
                                                    <img
                                                        src={photo}
                                                        alt="uploaded"
                                                        className="w-100 h-100 object-cover rounded"
                                                        style={{ maxHeight: '200px',marginTop:"5vh" }} // Adjust the max height
                                                    />
                                                    <p className="text-center text-muted mt-2">Click or drop photo to replace</p>
                                                    <button
                                                        className="btn btn-dark" style={{position:"absolute",top:"21px",left:"283px"}}
                                                        onClick={(e) => {
                                                            e.stopPropagation(); // Prevent triggering the div's onClick
                                                            removePhoto();
                                                        }}
                                                    >
                                                        &times;
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <button onClick={handleSubmit} className="btn btn-dark  w-100" >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>



            </>
        );
    }
    else if (documentType === 'aadhaar-card') {
        return (
            <>
                <div className="bg-dark text-light vh-100 d-flex flex-column align-items-center">
                    <div className="container-lg d-flex flex-column align-items-center mt-4" >

                        <div className="card shadow-sm" style={{ width: '100%', maxWidth: '400px' }}>
                            <div className="w-100 bg-black text-white py-2 d-flex align-items-center justify-content-between">
                                <button className="btn btn-link text-white" onClick={handleBackClick}>
                                    <i className="bi bi-arrow-left"></i>
                                </button>
                                <h5 className="mb-0">GoCab</h5>
                                <button className="btn btn-link text-white" onClick={handleHelpClick}>
                                    Help <i className="bi bi-question-circle"></i>
                                </button>
                            </div>
                            <h3 className="mt-3 mb-4">Enter your Adhaar card</h3>
                            <div className='d-flex justify-content-center align-items-center'><img
                                src={AdhaarSVG}
                                alt="Adhaar Card"
                                className="img-fluid mb-3 w-75"

                            /></div>
                            <div className="card-body">
                                <div className="form-group mb-3">
                                    Adhaar Number
                                    <input
                                        type="text"
                                        className={`form-control ${isValid ? '' : 'is-invalid'}`}
                                        placeholder="0000 0000 0000"
                                        value={adhaar}
                                        onChange={handleAdhaarCard}
                                    />
                                    <div className="form-text text-muted">
                                        {maskedLicense}
                                    </div>
                                    {!isValid && <div className="invalid-feedback">Invalid Adhaar card number format.</div>}
                                </div>
                                <div className="form-group mb-4 text-center">
                                    <a href="#upload" onClick={handleClick} onMouseEnter={() => { setHover("upload") }} onMouseLeave={() => { setHover(null) }} style={linkStyle}>
                                        Upload document
                                    </a>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        style={{ display: 'none' }}
                                        onChange={handleFileChange}
                                        accept="image/*"
                                    />
                                </div>
                                <button
                                    onClick={handleSubmit}
                                    className="btn btn-dark  w-100" disabled={!adhaar || !isValid}>
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
    else if (documentType === 'pan-card') {
        return (
            <>
                <div className="bg-dark text-light vh-100 d-flex flex-column align-items-center">
                    <div className="container-lg d-flex flex-column align-items-center mt-4" >

                        <div className="card shadow-sm" style={{ width: '100%', maxWidth: '400px' }}>
                            <div className="w-100 bg-black text-white py-2 d-flex align-items-center justify-content-between">
                                <button className="btn btn-link text-white" onClick={handleBackClick}>
                                    <i className="bi bi-arrow-left"></i>
                                </button>
                                <h5 className="mb-0">GoCab</h5>
                                <button className="btn btn-link text-white" onClick={handleHelpClick}>
                                    Help <i className="bi bi-question-circle"></i>
                                </button>
                            </div>
                            <h3 className="mt-3 mb-4">Enter your PAN card</h3>
                            <div className='d-flex justify-content-center align-items-center'><img
                                src={PanSVG}
                                alt="PAN Card"
                                className="img-fluid mb-3"
                            /></div>
                            <div className="card-body">
                                <div className="form-group mb-3">
                                    PAN Number
                                    <input
                                        type="text"
                                        className={`form-control ${isValid ? '' : 'is-invalid'}`}
                                        placeholder="ABCCD1234Z"
                                        value={pan}
                                        onChange={handlePanCard}
                                    />
                                    <div className="form-text text-muted">
                                        {maskedLicense}
                                    </div>
                                    {!isValid && <div className="invalid-feedback">Invalid PAN card number format.</div>}
                                </div>
                                <div className="form-group mb-4 text-center">
                                    <a href="#upload" onClick={handleClick} onMouseEnter={() => { setHover("upload") }} onMouseLeave={() => { setHover(null) }} style={linkStyle}>
                                        Upload document
                                    </a>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        style={{ display: 'none' }}
                                        onChange={handleFileChange}
                                        accept="image/*"
                                    />
                                </div>
                                <button onClick={handleSubmit} className="btn btn-dark  w-100" disabled={!pan || !isValid}>
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
    else if (documentType === 'registration-certificate') {
        return (
            <>
                <div className="bg-dark text-light vh-100 d-flex flex-column align-items-center">
                    <div className="container-lg d-flex flex-column align-items-center mt-4" >

                        <div className="card shadow-sm" style={{ width: '100%', maxWidth: '400px' }}>
                            <div className="w-100 bg-black text-white py-2 d-flex align-items-center justify-content-between">
                                <button className="btn btn-link text-white" onClick={handleBackClick}>
                                    <i className="bi bi-arrow-left"></i>
                                </button>
                                <h5 className="mb-0">GoCab</h5>
                                <button className="btn btn-link text-white" onClick={handleHelpClick}>
                                    Help <i className="bi bi-question-circle"></i>
                                </button>
                            </div>
                            <h5 className="mt-3 mb-1 ml-2" style={{ fontWeight: "600" }}>Registration-Certificate (RC)</h5>
                            <p className="ml-2">Enter your License plate number and upload it's image</p>
                            <div className="card-body">
                                <div className="form-group mb-3">
                                    License plate number
                                    <input
                                        type="text"
                                        className={`form-control ${isValid ? '' : 'is-invalid'}`}
                                        placeholder="DL00TC0000"
                                        value={lcplate}
                                        onChange={handleLicensePlateNumber}
                                    />
                                    <div className="form-text text-muted">
                                        {maskedLicense}
                                    </div>
                                    {!isValid && <div className="invalid-feedback">Invalid License plate number format.</div>}
                                </div>
                                <div className="form-group mb-4 text-center">
                                    <a href="#upload" onClick={handleClick} onMouseEnter={() => { setHover("upload") }} onMouseLeave={() => { setHover(null) }} style={linkStyle}>
                                        Upload document
                                    </a>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        style={{ display: 'none' }}
                                        onChange={handleFileChange}
                                        accept="image/*"
                                    />
                                </div>
                                <button
                                    onClick={handleSubmit} className="btn btn-dark  w-100" disabled={!lcplate || !isValid}>
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

}
export default UploadDetails;

