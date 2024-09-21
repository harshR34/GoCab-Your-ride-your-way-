import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import checked from './images/checkedIcon.png'

const RideBooked = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { pickupLocation, dropoffLocation, selectedRide } = location.state || {};
    const handleContinue = ()=>{
        navigate('/mytrips')
    }
    return (
        <>
            <header className="bg-dark text-white mb-4">
                <div className="container d-flex justify-content-between align-items-center">
                    <h1 className="mb-0">GoCab</h1>
                    <button className="btn btn-light">Help</button>
                </div>
            </header>
            <div className="container-lg d-flex flex-column justify-content-center align-items-center" style={{marginTop:"15vh"}}>
                <div className="row text-start">
                    <div className="col">
                        <img src={checked} alt='checked' className='mt-5 mb-5' style={{width:"130px"}}/>
                        <h2>Your Ride is booked Successfully !</h2>
                        <Link to="/mytrips" className="btn btn-outline-dark mt-3 p-3" style={{borderRadius:"50px",fontSize:"20px"}}>
                            Continue 
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RideBooked;
