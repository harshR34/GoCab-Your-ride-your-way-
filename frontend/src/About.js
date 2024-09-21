import { FaGavel, FaLock, FaUsers, FaStar, FaRocket } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './Footer';
import Navbar from './Navbar';

export default function About() {
    return (<>
        <div className="bg-light">
            {/* Header Section */}
            <Navbar/>
            <main>
                <section className="text-center py-5 bg-white">
                    <div className="container">
                        <h1 className="display-4 font-weight-bold text-dark">
                            About GoCab
                        </h1>
                        <p className="lead text-secondary mt-3">
                            Your go-to solution for reliable, affordable, and convenient cab rides.
                        </p>
                        <div className="mt-4">
                            <a 
                                href="#features" 
                                className="btn btn-dark btn-lg"
                            >
                                Explore Features
                            </a>
                        </div>
                    </div>
                </section>

                {/* Platform Advantages Section */}
                <section id="features" className="py-5 bg-light">
                    <div className="container">
                        <h2 className="text-center text-secondary mb-5">What Makes Us Different?</h2>
                        <div className="row text-center">
                            {[
                                { icon: FaRocket, title: 'Fast Bookings', desc: 'Quick and seamless ride bookings in seconds.', color: 'text-danger' },
                                { icon: FaStar, title: 'Top-Rated Drivers', desc: 'Professional and vetted drivers for every ride.', color: 'text-warning' },
                                { icon: FaLock, title: 'Secure Payments', desc: 'Encrypted and secure payment methods.', color: 'text-success' }
                            ].map(({ icon: Icon, title, desc, color }, index) => (
                                <div key={index} className="col-md-4 mb-4">
                                    <div className="card shadow-sm p-4">
                                        <Icon className={`mb-3 ${color}`} size={50} />
                                        <h5 className="font-weight-bold text-dark mb-3">{title}</h5>
                                        <p className="text-muted">{desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Feature Cards Section */}
                <section className="py-5 bg-white">
                    <div className="container">
                        <h2 className="text-center text-secondary mb-5">Why Choose GoCab?</h2>
                        <p className="text-center text-muted mb-5">
                            Choose GoCab for reliable, affordable, and safe rides with a seamless booking experience and top-notch customer service.
                        </p>

                        <div className="row text-center">
                            {[
                                { icon: FaGavel, title: 'Fair Pricing', desc: 'Transparent pricing with no hidden fees.', color: 'text-primary' },
                                { icon: FaLock, title: 'Safe and Secure', desc: 'State-of-the-art safety features for riders and drivers.', color: 'text-success' },
                                { icon: FaUsers, title: 'Global Community', desc: 'Join a wide network of drivers and passengers.', color: 'text-info' }
                            ].map(({ icon: Icon, title, desc, color }, index) => (
                                <div key={index} className="col-md-4 mb-4">
                                    <div className="card shadow-sm p-4">
                                        <Icon className={`mb-3 ${color}`} size={50} />
                                        <h5 className="font-weight-bold text-dark mb-3">{title}</h5>
                                        <p className="text-muted">{desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Customer Testimonials Section */}
                <section className="py-5 bg-light">
                    <div className="container">
                        <h2 className="text-center text-secondary mb-5">What Our Customers Say</h2>
                        <div className="d-flex overflow-auto">
                            {[
                                { text: 'GoCab made getting to work easier and more affordable!', name: 'Sarah M.' },
                                { text: 'I love the quick bookings and reliable drivers. GoCab is my go-to ride service!', name: 'David W.' },
                                { text: 'Affordable fares and professional drivers, I highly recommend GoCab.', name: 'Emily T.' }
                            ].map(({ text, name }, index) => (
                                <div key={index} className="card bg-light p-3 mx-3" style={{ minWidth: '300px' }}>
                                    <p className="text-muted">"{text}"</p>
                                    <p className="font-weight-bold text-dark mt-3">- {name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </div>
        <Footer/>
        </>
    );
}
