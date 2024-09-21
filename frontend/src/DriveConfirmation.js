// import React, { useState, useEffect } from 'react';
// import PhoneInput from 'react-phone-input-2';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const DriveConfirmation = () => {
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [email, setEmail] = useState('');
//   const [driver, setDriver] = useState(null);
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//   };

//   const checkIfDriverExists = async (email) => {
//     try {
//       const response = await axios.get(`http://127.0.0.1:8000/api/driver-list/`, {
//         params: { email } // Sending the email as a query parameter
//       });
//       return response.data.length > 0 ? response.data[0] : null;
//     } catch (error) {
//       console.error('Error checking driver:', error);
//       return null;
//     }
//   };
//   console.log(phoneNumber)

//   const handleContinue = async (e) => {
//     e.preventDefault();

//     if (firstName && lastName && email && phoneNumber) {
//       // Check if the driver already exists
//       const existingDriver = await checkIfDriverExists(email);

//       if (existingDriver) {
//         // If driver exists, navigate directly to select vehicle page
//         alert("Driver already exists. Redirecting to vehicle selection.");
//         localStorage.setItem("driverEmail", email);
//         localStorage.setItem("driverFirstName", firstName);
//         localStorage.setItem("driverLastName", lastName);
//         localStorage.setItem("driverPhone", phoneNumber);
//         navigate('/select-vehicle');
//       } else {
//         // If driver does not exist, proceed with adding the driver
//         const formData = new FormData();
//         formData.append("first_name", firstName);
//         formData.append("last_name", lastName);
//         formData.append("email", email);
//         formData.append("phone", phoneNumber);

//         try {
//           const response = await axios.post('http://127.0.0.1:8000/api/add-driver/', formData);
//           if (response.status === 201) {
//             alert("Driver added successfully");
//             localStorage.setItem("driverEmail", email);
//             localStorage.setItem("driverFirstName", firstName);
//             localStorage.setItem("driverLastName", lastName);
//             localStorage.setItem("driverPhone", phoneNumber);
//             navigate('/select-vehicle');
//           } else {
//             alert("Failed to add driver");
//             navigate('/drive-confirmation');
//           }
//         } catch (error) {
//           console.error('Error adding driver:', error);
//         }
//       }
//     }
//   };

//   return (
//     <>
//       <div
//         className="row"
//         style={{
//           backgroundColor: 'black',
//           color: 'white',
//           paddingLeft: '10vh',
//           paddingTop: '2.5vh',
//           paddingBottom: '2.5vh',
//         }}
//       >
//         <div className="col-md-4">
//           <h1>GoCab</h1>
//         </div>
//       </div>
//       <div className="container-lg mt-5">
//         <div className="row justify-content-md-center">
//           <div className="col-md-4">
//             <h3 className="text-center mb-4 mt-4">Are You Sure You Want to Drive Cabs? Confirm Your Choice!</h3>
//             <form onSubmit={handleContinue}>
//               <div className="form-group row">
//                 <div className="col">
//                   <input
//                     type="text"
//                     name="firstName"
//                     placeholder="First Name"
//                     className="form-control mt-3 mb-1"
//                     onChange={(e) => { setFirstName(e.target.value); }}
//                     required
//                   />
//                 </div>
//                 <div className="col">
//                   <input
//                     type="text"
//                     name="lastName"
//                     placeholder="Last Name"
//                     className="form-control mt-3 mb-1"
//                     onChange={(e) => { setLastName(e.target.value); }}
//                     required
//                   />
//                 </div>
//               </div>
//               <input
//                 type="text"
//                 name="email"
//                 placeholder="Email"
//                 className="form-control mb-3"
//                 onChange={(e) => { setEmail(e.target.value); }}
//                 required
//               />
//               <PhoneInput
//                 country={'in'}
//                 value={phoneNumber}
//                 onChange={(phone) => setPhoneNumber("+" + phone)}
//                 required
//                 inputStyle={{ width: '100%' }} // Set the phone input to full width
//               />

//               <button
//                 type="submit"
//                 style={{ backgroundColor: 'black', borderColor: 'black' }}
//                 className="btn btn-dark w-100 mt-4 p-3"
//                 onClick={handleContinue}
//               >
//                 Continue
//               </button>
//             </form>
//             <hr style={{ flex: 1, margin: '0px 10px' }} className="my-4" />
//             <div style={{ display: 'flex', alignItems: 'center', margin: '5vh 0vh', textAlign: 'center' }}>
//               By proceeding, you consent to get calls, WhatsApp or SMS messages,
//               including by automated means, from Uber and its affiliates to the
//               number provided.
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default DriveConfirmation;

import React, { useState, useEffect } from 'react';
import PhoneInput from 'react-phone-input-2';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const DriveConfirmation = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [driver, setDriver] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const checkIfDriverExists = async (email) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/driver-list/`, {
        params: { email } // Sending the email as a query parameter
      });
      // Check if the driver exists and return the exact matching driver
      return response.data.length > 0 ? response.data.find(driver => driver.email === email) : null;
    } catch (error) {
      console.error('Error checking driver:', error);
      return null;
    }
  };

  const handleContinue = async (e) => {
    e.preventDefault();

    if (firstName && lastName && email && phoneNumber) {
      // Check if the driver already exists
      const existingDriver = await checkIfDriverExists(email);

      if (existingDriver) {
        // Check document status if driver exists
        if (existingDriver.documentStatus === true) {
          alert("Driver already exists and has uploaded documents. Redirecting to driver page.");
          navigate('/driver');
        } else {
          // If driver exists but documentStatus is false, allow the normal flow
          alert("Driver exists, but document not uploaded. Redirecting to vehicle selection.");
          localStorage.setItem("driverEmail", email);
          localStorage.setItem("driverFirstName", firstName);
          localStorage.setItem("driverLastName", lastName);
          localStorage.setItem("driverPhone", phoneNumber);
          navigate('/select-vehicle');
        }
      } else {
        // If driver does not exist, proceed with adding the driver
        const formData = new FormData();
        formData.append("first_name", firstName);
        formData.append("last_name", lastName);
        formData.append("email", email);
        formData.append("phone", phoneNumber);

        try {
          const response = await axios.post('http://127.0.0.1:8000/api/add-driver/', formData);
          if (response.status === 201) {
            alert("Driver added successfully");
            localStorage.setItem("driverEmail", email);
            localStorage.setItem("driverFirstName", firstName);
            localStorage.setItem("driverLastName", lastName);
            localStorage.setItem("driverPhone", phoneNumber);
            navigate('/select-vehicle');
          } else {
            alert("Failed to add driver");
            navigate('/drive-confirmation');
          }
        } catch (error) {
          console.error('Error adding driver:', error);
        }
      }
    }
  };

  return (
    <>
      <div
        className="row"
        style={{
          backgroundColor: 'black',
          color: 'white',
          paddingLeft: '10vh',
          paddingTop: '2.5vh',
          paddingBottom: '2.5vh',
        }}
      >
        <div className="col-md-4">
          <h1>GoCab</h1>
        </div>
      </div>
      <div className="container-lg mt-5">
        <div className="row justify-content-md-center">
          <div className="col-md-4">
            <h3 className="text-center mb-4 mt-4">Are You Sure You Want to Drive Cabs? Confirm Your Choice!</h3>
            <form onSubmit={handleContinue}>
              <div className="form-group row">
                <div className="col">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    className="form-control mt-3 mb-1"
                    onChange={(e) => { setFirstName(e.target.value); }}
                    required
                  />
                </div>
                <div className="col">
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    className="form-control mt-3 mb-1"
                    onChange={(e) => { setLastName(e.target.value); }}
                    required
                  />
                </div>
              </div>
              <input
                type="text"
                name="email"
                placeholder="Email"
                className="form-control mb-3"
                onChange={(e) => { setEmail(e.target.value); }}
                required
              />
              <PhoneInput
                country={'in'}
                value={phoneNumber}
                onChange={(phone) => setPhoneNumber("+" + phone)}
                required
                inputStyle={{ width: '100%' }} // Set the phone input to full width
              />

              <button
                type="submit"
                style={{ backgroundColor: 'black', borderColor: 'black' }}
                className="btn btn-dark w-100 mt-4 p-3"
                onClick={handleContinue}
              >
                Continue
              </button>
            </form>
            <hr style={{ flex: 1, margin: '0px 10px' }} className="my-4" />
            <div style={{ display: 'flex', alignItems: 'center', margin: '5vh 0vh', textAlign: 'center' }}>
              By proceeding, you consent to get calls, WhatsApp or SMS messages,
              including by automated means, from Uber and its affiliates to the
              number provided.
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DriveConfirmation;
