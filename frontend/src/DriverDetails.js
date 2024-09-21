import { jwtDecode } from 'jwt-decode';
import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import check from './images/check.svg'
import AuthContext from './context/AuthContext';
import axios from 'axios' 
const swal = require("sweetalert2");

const DriverDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { selectedOption } = location.state || {};
    const driverEmail = localStorage.getItem('driverEmail');
    const driverFirstName = localStorage.getItem('driverFirstName');
    const driverLastName = localStorage.getItem('driverLastName');
    const driverPhone = localStorage.getItem('driverPhone');
    console.log(driverFirstName,driverLastName,driverPhone)
    // const { uploadDocuments} = useContext(AuthContext);

    const [drivingLicenseNum, setDrivingLicenseNum] = useState(localStorage.getItem('drivingLicense') || '');
    const [profile, setProfile] = useState(localStorage.getItem('profilePhoto') || '');
    const [adhaar, setAdhaarNum] = useState(localStorage.getItem('adhaarNumber') || '');
    const [pan, setPanNumber] = useState(localStorage.getItem('panNumber') || '');
    const [licensePlate, setLicensePlate] = useState(localStorage.getItem('lcpPlate') || '');

    const token = localStorage.getItem("authTokens");
    const user = jwtDecode(token);
    const name = user.full_name;
    const email = user.email;

    const resetAllFields = () => {
        localStorage.removeItem("drivingLicense");
        localStorage.removeItem("profilePhoto");
        localStorage.removeItem("adhaarNumber");
        localStorage.removeItem("panNumber");
        localStorage.removeItem("lcpPlate");
    
        // Refresh the page
        window.location.reload();
    }


    const updateDriverDocumentStatus=()=>{
        const form  = new FormData();
        form.append('first_name',driverFirstName);
        form.append('last_name',driverLastName);
        form.append('email',driverEmail);
        form.append('phone',driverPhone);
        form.append('documentStatus',true);

        axios.put(`http://127.0.0.1:8000/api/driver-update/${driverEmail}/`,form).then(()=>{
            alert("Document Uploaded Successfully and document are in verification process !!")
            navigate("/driver");
        }).catch((error)=>{
            console.log(error);
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        
        formData.append("email",driverEmail);
        formData.append("driving_license_num",drivingLicenseNum);
        formData.append("adhaar_num",adhaar);
        formData.append('pan_number',pan);
        formData.append('license_plate',licensePlate);

        if (profile?.file) {
            formData.append('profilePhoto', profile.file); // Append the image file to the FormData
        }

        axios.post('http://127.0.0.1:8000/api/document/',formData).then((res)=>{
            console.log('Data uploaded successfully');
                updateDriverDocumentStatus();
                navigate('/confirmation');
                if (res.status === 201) {
                    swal.fire({
                        title: "Document uploaded Successfully !",
                        icon: "success",
                        toast: true,
                        timer: 6000,
                        position: 'top-right',
                        timerProgressBar: true,
                        showConfirmButton: false
                    });
                } else {
                    console.log(res.status);
                    console.log("An Error Occurred");
                    swal.fire({
                        title: "There was a server error during creating a post",
                        icon: "error",
                        toast: true,
                        timer: 6000,
                        position: 'top-right',
                        timerProgressBar: true,
                        showConfirmButton: false
                    });
                }
        })
        
    }

    function capitalizeFirstLetter(string) {
        var st = string.charAt(0).toUpperCase() + string.slice(1);
        return st.split(" ")[0]
    }

    if (selectedOption === 'car-owner') {
        console.log(drivingLicenseNum)
        console.log(profile)
        console.log(adhaar)
        console.log(pan)
        console.log(licensePlate)
        return (
            <>
                <div>
                    {/* Header Section */}
                    <header className="bg-dark text-white mb-4">
                        <div className="container d-flex justify-content-between align-items-center">
                            <h1 className="mb-0">GoCab</h1>
                            <button className="btn btn-light">Help</button>
                        </div>
                    </header>

                    {/* Main Content */}
                    <div className="container-fluid mt-5">
                        <div style={{ display: "flex",justifyContent:"space-between", flexDirection: "row", }}>
                            <div>
                                <h2 className="mb-3 text-start" style={{ marginLeft: "12vh", fontWeight: "600" }}>Welcome,{capitalizeFirstLetter(driverFirstName)} </h2>
                                <p className="text-muted mb-5 text-start" style={{ marginLeft: "12vh" }}>Here's what you need to do to set up your account.</p>
                            </div>
                            <button style={{height:"50px",marginRight:"75px"}} onClick={resetAllFields}>Reset Fields</button>
                        </div>
                        <div className='conatiner-lg ml-5 mr-5'>
                            <ul className="list-group" style={{ border: "none", padding: 0 }}>
                                {
                                    drivingLicenseNum ? <>
                                        <li className="list-group-item d-flex justify-content-between align-items-center pl-5 pr-5" style={{ border: "none", borderBottom: "1px solid #dee2e6", padding: "10px 0" }}>
                                            <Link to="/driving-license-front" className="text-decoration-none text-dark d-flex flex-column w-100">
                                                <div className="d-flex justify-content-between align-items-center w-100" style={{ fontSize: "25px" }}>
                                                    Driving License - Front
                                                    <img src={check} alt='check' style={{ width: "30px" }}></img>
                                                </div>
                                                <small className="text-primary">Recommended next step</small>
                                            </Link>
                                        </li>

                                    </> :
                                        <>
                                            <li className="list-group-item d-flex justify-content-between align-items-center pl-5 pr-5" style={{ border: "none", borderBottom: "1px solid #dee2e6", padding: "10px 0" }}>
                                                <Link to="/driving-license-front" className="text-decoration-none text-dark d-flex flex-column w-100">
                                                    <div className="d-flex justify-content-between align-items-center w-100" style={{ fontSize: "25px" }}>
                                                        Driving License - Front
                                                        <span className="text-dark">&gt;</span>
                                                    </div>
                                                    <small className="text-primary">Recommended next step</small>
                                                </Link>
                                            </li>


                                        </>
                                }
                                {
                                    profile ? <><li className="list-group-item d-flex justify-content-between align-items-center pl-5 pr-5" style={{ border: "none", borderBottom: "1px solid #dee2e6", padding: "10px 0" }}>
                                        <Link to="/profile-photo" className="text-decoration-none text-dark d-flex justify-content-between align-items-center w-100" style={{ fontSize: "25px" }}>
                                            Profile Photo
                                            <img src={check} alt='check' style={{ width: "30px" }}></img>
                                        </Link>
                                    </li></> : <><li className="list-group-item d-flex justify-content-between align-items-center pl-5 pr-5" style={{ border: "none", borderBottom: "1px solid #dee2e6", padding: "10px 0" }}>
                                        <Link to="/profile-photo" className="text-decoration-none text-dark d-flex justify-content-between align-items-center w-100" style={{ fontSize: "25px" }}>
                                            Profile Photo
                                            <span className="text-dark">&gt;</span>
                                        </Link>
                                    </li></>
                                }
                                {
                                    adhaar ?
                                        <>
                                            <li className="list-group-item d-flex justify-content-between align-items-center pl-5 pr-5" style={{ border: "none", borderBottom: "1px solid #dee2e6", padding: "10px 0" }}>
                                                <Link to="/aadhaar-card" className="text-decoration-none text-dark d-flex justify-content-between align-items-center w-100" style={{ fontSize: "25px" }}>
                                                    Aadhaar Card
                                                    <img src={check} alt='check' style={{ width: "30px" }}></img>

                                                </Link>
                                            </li>
                                        </>
                                        :
                                        <>
                                            <li className="list-group-item d-flex justify-content-between align-items-center pl-5 pr-5" style={{ border: "none", borderBottom: "1px solid #dee2e6", padding: "10px 0" }}>
                                                <Link to="/aadhaar-card" className="text-decoration-none text-dark d-flex justify-content-between align-items-center w-100" style={{ fontSize: "25px" }}>
                                                    Aadhaar Card
                                                    <span className="text-dark">&gt;</span>
                                                </Link>
                                            </li>
                                        </>
                                }
                                {
                                    pan ?
                                        <>
                                            <li className="list-group-item d-flex justify-content-between align-items-center pl-5 pr-5" style={{ border: "none", borderBottom: "1px solid #dee2e6", padding: "10px 0" }}>
                                                <Link to="/pan-card" className="text-decoration-none text-dark d-flex justify-content-between align-items-center w-100" style={{ fontSize: "25px" }}>
                                                    PAN Card
                                                    <img src={check} alt='check' style={{ width: "30px" }}></img>
                                                </Link>
                                            </li>
                                        </>
                                        :
                                        <>
                                            <li className="list-group-item d-flex justify-content-between align-items-center pl-5 pr-5" style={{ border: "none", borderBottom: "1px solid #dee2e6", padding: "10px 0" }}>
                                                <Link to="/pan-card" className="text-decoration-none text-dark d-flex justify-content-between align-items-center w-100" style={{ fontSize: "25px" }}>
                                                    PAN Card
                                                    <span className="text-dark">&gt;</span>
                                                </Link>
                                            </li>
                                        </>
                                }


                                {
                                    licensePlate ?
                                        <>
                                            <li className="list-group-item d-flex justify-content-between align-items-center pl-5 pr-5" style={{ border: "none", borderBottom: "1px solid #dee2e6", padding: "10px 0" }}>
                                                <Link to="/registration-certificate" className="text-decoration-none text-dark d-flex justify-content-between align-items-center w-100" style={{ fontSize: "25px" }}>
                                                    Registration Certificate (RC)
                                                    <img src={check} alt='check' style={{ width: "30px" }}></img>
                                                </Link>
                                            </li>
                                        </>
                                        :
                                        <>
                                            <li className="list-group-item d-flex justify-content-between align-items-center pl-5 pr-5" style={{ border: "none", borderBottom: "1px solid #dee2e6", padding: "10px 0" }}>
                                                <Link to="/registration-certificate" className="text-decoration-none text-dark d-flex justify-content-between align-items-center w-100" style={{ fontSize: "25px" }}>
                                                    Registration Certificate (RC)
                                                    <span className="text-dark">&gt;</span>
                                                </Link>
                                            </li>
                                        </>
                                }
                            </ul>
                        </div>
                        <div className='d-flex justify-content-center align-items-center mt-5 mb-5'>
                            {
                                drivingLicenseNum && adhaar && pan && licensePlate ?
                                    <>
                                        <button
                                            type="submit"
                                            className="btn btn-dark custom-btn w-75"
                                            onClick={handleSubmit}
                                        >
                                            Submit
                                        </button>
                                    </>
                                    :
                                    <>
                                        <button
                                            type="submit"
                                            className="btn btn-dark custom-btn w-75"
                                            disabled
                                        >
                                            Submit
                                        </button>
                                    </>
                            }</div>
                    </div>
                </div>
            </>
        );
    }
    else if (selectedOption === 'driver-only') {
        return (
            <>
                <div>
                    {/* Header Section */}
                    <header className="bg-dark text-white mb-4">
                        <div className="container d-flex justify-content-between align-items-center">
                            <h1 className="mb-0">GoCab</h1>
                            <button className="btn btn-light">Help</button>
                        </div>
                    </header>

                    {/* Main Content */}
                    <div className="container-fluid mt-5">
                        <h2 className="mb-3 text-start" style={{ marginLeft: "12vh", fontWeight: "600" }}>Welcome, [User Name]</h2>
                        <p className="text-muted mb-5 text-start" style={{ marginLeft: "12vh" }}>Here's what you need to do to set up your account.</p>
                        <div className='conatiner-lg ml-5 mr-5'>
                            <ul className="list-group" style={{ border: "none", padding: 0 }}>
                                <li className="list-group-item d-flex justify-content-between align-items-center pl-5 pr-5" style={{ border: "none", borderBottom: "1px solid #dee2e6", padding: "10px 0" }}>
                                    <Link to="/driving-license-front" className="text-decoration-none text-dark d-flex flex-column w-100">
                                        <div className="d-flex justify-content-between align-items-center w-100" style={{ fontSize: "25px" }}>
                                            Driving License - Front
                                            <span className="text-dark">&gt;</span>
                                        </div>
                                        <small className="text-primary">Recommended next step</small>
                                    </Link>
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center pl-5 pr-5" style={{ border: "none", borderBottom: "1px solid #dee2e6", padding: "10px 0" }}>
                                    <Link to="/profile-photo" className="text-decoration-none text-dark d-flex justify-content-between align-items-center w-100" style={{ fontSize: "25px" }}>
                                        Profile Photo
                                        <span className="text-dark">&gt;</span>
                                    </Link>
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center pl-5 pr-5" style={{ border: "none", borderBottom: "1px solid #dee2e6", padding: "10px 0" }}>
                                    <Link to="/aadhaar-card" className="text-decoration-none text-dark d-flex justify-content-between align-items-center w-100" style={{ fontSize: "25px" }}>
                                        Aadhaar Card
                                        <span className="text-dark">&gt;</span>
                                    </Link>
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center pl-5 pr-5" style={{ border: "none", borderBottom: "1px solid #dee2e6", padding: "10px 0" }}>
                                    <Link to="/pan-card" className="text-decoration-none text-dark d-flex justify-content-between align-items-center w-100" style={{ fontSize: "25px" }}>
                                        PAN Card
                                        <span className="text-dark">&gt;</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className='d-flex justify-content-center align-items-center mt-5 mb-5'>
                            {
                                drivingLicenseNum && adhaar && pan && licensePlate ?
                                    <>
                                        <button
                                            type="submit"
                                            className="btn btn-dark custom-btn w-75"
                                            onClick={handleSubmit}
                                        >
                                            Submit
                                        </button>
                                    </>
                                    :
                                    <>
                                        <button
                                            type="submit"
                                            className="btn btn-dark custom-btn w-75"
                                            disabled
                                        >
                                            Submit
                                        </button>
                                    </>
                            }</div>
                    </div>
                </div>
            </>
        );
    }
};

export default DriverDetails;

