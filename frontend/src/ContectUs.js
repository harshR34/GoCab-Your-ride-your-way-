import React from 'react';

const ContactUs=()=> {
  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', color: 'black' }}>GoCab - Contact Us</h1>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <form>
              <div className="mb-3">
                {/* <label htmlFor="name" className="form-label">Name</label> */}
                <input type="text" className="form-control" id="name" placeholder="Your name" />
              </div>
              <div className="mb-3">
                {/* <label htmlFor="email" className="form-label">Email</label> */}
                <input type="email" className="form-control" id="email" placeholder="Your email" />
              </div>
              <div className="mb-3">
                {/* <label htmlFor="message" className="form-label">Message</label> */}
                <textarea className="form-control" id="message" rows="5" placeholder="Your message"></textarea>
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-dark">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
