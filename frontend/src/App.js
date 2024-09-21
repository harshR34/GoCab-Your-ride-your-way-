// import logo from './logo.svg';
import './App.css';
import GoCabHome from './GoCabHome';
import GoCabLogin from './GoCabLogin';
// import Login from './Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Ride from './Ride';
import AirportRide from './AirportRide';
import OnAirport from './OnAirport'
import FromAirport from './FromAirport';
import Driver from './Driver';
import Requirement from './Requirement';
import Safety from './Safety';
import DriverSignup from './DriverSignup';
import SelectVehicle from './SelectVehicle';
import DriverDetails from './DriverDetails';
import BookRide from './BookRide';
import UploadDetails from './UploadDetails';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
// import Signup from './Signup';
import ProtectedRoute from './utils/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ConfirmationPage from './ConfirmationPage';
import MyTrips from './MyTrips';
import RideBooked from './RideBooked'
import VerifyPhone from './VerifyPhone';
import DriveConfirmation from './DriveConfirmation';
import About from './About';
import ContectUs from './ContectUs';


function App() {
  return (<>
    <Router>
      <AuthProvider>
        <Routes>
          <Route path='/aboutus' element={<About/>}/>
          <Route path='/' element={<GoCabHome />}></Route>
          <Route path='/GoCabLogin' element={<GoCabLogin />}></Route>
          {/* <Route path='/login' element={<Login/>}></Route> */}
          <Route path='/ride' element={<Ride />}></Route>
          <Route path="/AirportRide" element={<AirportRide />} />
          <Route path="/airport/:code" element={<OnAirport />} />
          <Route path="/airportPickup/:code" element={<FromAirport />} />
          <Route path='/Driver' element={<Driver />} />
          <Route path='/Requirement' element={<Requirement />} />
          <Route path='/Safety' element={<Safety />} />
          <Route path='/driver-sign' element={<DriverSignup />} />
          <Route path='/select-vehicle' element={<SelectVehicle />} />
          <Route path='/driver-details' element={<DriverDetails />} />
          <Route path='/book-ride' element={<BookRide />} />
          <Route path='/:documentType' element={<UploadDetails />} />
          <Route path='/dashboard' element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }/>
        <Route  path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/home' exact element={<Home/>}/>
        <Route path='/confirmation' element={<ConfirmationPage/>}/>
        <Route path='/ride-booked' element={<RideBooked/>}/>
        <Route path='/mytrips' element={<MyTrips/>}/>
        <Route path='/verify-phone-number' element={<VerifyPhone/>}/>
        <Route path='/drive-confirmation' element={<DriveConfirmation/>}/>
        <Route path='/Contect-us' element={<ContectUs/>}/>
        </Routes>
      </AuthProvider>
    </Router>
  </>);
}

export default App;
