import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GoCabX from './images/GoCabX.webp';
import driverWhoWantsMoney from './images/driverWhoWantsToEarn.webp'

const SelectVehicle = () => {
  // State to keep track of the selected option
  const [selectedOption, setSelectedOption] = useState(null);
  const navigate = useNavigate();

  // Function to handle the selection of an option
  const handleSelect = (option) => {
    setSelectedOption(option);
  };

  // Function to handle the "Continue" button click
  const handleContinue = () => {
    if (selectedOption) {
      // Redirect to the next page with the selected option as state
      navigate('/driver-details', { state: { selectedOption } });
    } else {
      alert('Please select an option before continuing.');
    }
  };

  return (<>
    <header className="bg-dark text-white mb-4">
      <div className="container d-flex justify-content-between align-items-center">
        <h1 className="mb-0">GoCab</h1>
        <button className="btn btn-light">Help</button>
      </div>
    </header>
    <div className="container-lg">
      <div className="card mx-auto" style={{ maxWidth: '500px', transition: "none", transform: "none", boxShadow: "none" }}>
        <div className="card-header text-center bg-dark text-white">
          <h5 style={{ display: "flex", alignItems: "start" }}>GoCab</h5>
        </div>
        <div className="card-body">
          <div className="list-group">
            <button
              className={`list-group-item list-group-item-action ${selectedOption === 'car-owner' ? 'active border border-dark bg-light border-2 text-dark' : ''}`}
              onClick={() => handleSelect('car-owner')}
            >
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex flex-column">
                  <span className="badge badge-primary mb-2 w-25">Rides</span>
                  <h5 className="mb-3">Car owner</h5>
                  <p className="mb-1">Vehicle: You have a car that you wish to drive or employ others to drive</p>
                </div>
                <div className="d-flex justify-content-end align-items-center">
                  <img src={GoCabX} style={{ width: "120px", marginLeft: "15px" }} alt="Car" />
                </div>
              </div>
            </button>

            <button
              className={`list-group-item list-group-item-action ${selectedOption === 'driver-only' ? 'active border border-dark bg-light border-2 text-dark' : ''}`}
              onClick={() => handleSelect('driver-only')}
            >
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex flex-column">
                  <span className="badge badge-success mb-2 w-25">Drive</span>
                  <h5 className="mb-3">Driver Only</h5>
                  <p className="mb-1">You do not own a car, but want to drive a car and earn money</p>
                </div>
                <div className="d-flex justify-content-end align-items-center">
                  <img src={driverWhoWantsMoney} style={{ width: "100px", marginLeft: "15px", borderRadius: "20px" }} alt="Car" />
                </div>
              </div>
            </button>
          </div>
          <button
            className="btn btn-dark btn-block mt-4"
            onClick={handleContinue}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  </>
  );
};

export default SelectVehicle;


/*<button
              className={`list-group-item list-group-item-action ${
                selectedOption === 'motorbike' ? 'active' : ''
              }`}
              onClick={() => handleSelect('motorbike')}
            >
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">Motorbike (2 wheeler)</h5>
                <span className="badge badge-primary badge-pill">Rides</span>
              </div>
              <p className="mb-1">Vehicle: You wish to drive a motorcycle or scooter</p>
            </button>

            <button
              className={`list-group-item list-group-item-action ${
                selectedOption === 'commercial-motorbike' ? 'active' : ''
              }`}
              onClick={() => handleSelect('commercial-motorbike')}
            >
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">Commercial motorbike</h5>
                <span className="badge badge-primary badge-pill">Rides</span>
              </div>
              <p className="mb-1">Vehicle: You wish to drive a yellow plate motorcycle or scooter</p>
            </button>

            <button
              className={`list-group-item list-group-item-action ${
                selectedOption === 'auto-rickshaw' ? 'active' : ''
              }`}
              onClick={() => handleSelect('auto-rickshaw')}
            >
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">Auto rickshaw</h5>
                <span className="badge badge-primary badge-pill">Rides</span>
              </div>
              <p className="mb-1">Vehicle: You wish to drive an Auto Rickshaw</p>
            </button>*/