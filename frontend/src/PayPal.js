import React, { useEffect } from 'react';

const PayPal = () => {
    useEffect(() => {
        // Load the PayPal script dynamically
        const script = document.createElement('script');
        script.src = "https://www.paypal.com/sdk/js?client-id=YOUR_CLIENT_ID";
        script.async = true;
        script.onload = () => {
            if (window.paypal) {
                window.paypal.Buttons({
                    createOrder: (data, actions) => {
                        return actions.order.create({
                            purchase_units: [{
                                amount: {
                                    value: '10.00' // Replace with the amount you want to charge
                                }
                            }]
                        });
                    },
                    onApprove: (data, actions) => {
                        return actions.order.capture().then((details) => {
                            alert('Transaction completed by ' + details.payer.name.given_name);
                            // Handle successful payment here (e.g., update your backend)
                        });
                    },
                    onError: (err) => {
                        console.error('PayPal error:', err);
                    }
                }).render('#paypal-button-container'); // Render PayPal button into #paypal-button-container
            }
        };
        document.body.appendChild(script);
    }, []);

    return (
        <div>
            <div id="paypal-button-container"></div>
        </div>
    );
};

export default PayPal;
