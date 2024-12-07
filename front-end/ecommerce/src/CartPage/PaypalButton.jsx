// import React, { useEffect } from 'react';

// let isPayPalScriptLoaded = false; // Global variable to track script load status

// const PayPalButton = ({ total }) => {
//   useEffect(() => {
//     const loadPayPalScript = () => {
//       return new Promise((resolve, reject) => {
//         if (typeof window === 'undefined' || typeof document === 'undefined') {
//           return reject(new Error('Window or document is not defined.'));
//         }

//         // If script is already flagged as loaded, resolve immediately
//         if (isPayPalScriptLoaded) {
//           return resolve();
//         }

//         const existingScript = document.getElementById('paypal-sdk');

//         // If script exists and PayPal is available, just resolve
//         if (existingScript && window.paypal) {
//           isPayPalScriptLoaded = true;
//           return resolve();
//         }

//         // If the script exists but paypal not available yet, attach listeners once
//         if (existingScript && !window.paypal) {
//           existingScript.addEventListener('load', () => {
//             isPayPalScriptLoaded = true;
//             resolve();
//           }, { once: true });

//           existingScript.addEventListener('error', () => {
//             reject(new Error('Failed to load the PayPal SDK script.'));
//           }, { once: true });
//           return;
//         }

//         // If no script exists, create and append it
//         const script = document.createElement('script');
//         script.id = 'paypal-sdk';
//         script.src = "https://www.paypal.com/sdk/js?client-id=ART50ZLUTRsApktCVHMF4i4KzbbnM7o5b80o6tpHwODyTaxZGHaxkFzoWf_P9DStGm4OmmEV9dYB0kJs&currency=USD";
//         script.async = true;
//         script.crossOrigin = 'anonymous';

//         script.onload = () => {
//           isPayPalScriptLoaded = true;
//           resolve();
//         };

//         script.onerror = () => {
//           reject(new Error('Failed to load the PayPal SDK script.'));
//         };

//         document.body.appendChild(script);
//       });
//     };

//     const initializePayPalButtons = async () => {
//       try {
//         await loadPayPalScript();

//         if (window.paypal) {
//           // Clear previous buttons to prevent duplication
//           const container = document.getElementById('paypal-button-container');
//           if (container) container.innerHTML = '';

//           window.paypal.Buttons({
//             createOrder: (data, actions) => {
//               return actions.order.create({
//                 purchase_units: [
//                   {
//                     amount: {
//                       value: total,
//                     },
//                   },
//                 ],
//               });
//             },
//             onApprove: (data, actions) => {
//               return actions.order.capture().then((details) => {
//                 alert(`Transaction completed by ${details.payer.name.given_name}`);
//                 window.location.href = `thank_you.php?orderID=${data.orderID}`;
//               });
//             },
//             onError: (err) => {
//               console.error('PayPal transaction error:', err);
//               alert('An error occurred during the PayPal transaction.');
//             },
//           }).render('#paypal-button-container');
//         } else {
//           throw new Error('PayPal SDK is not available.');
//         }
//       } catch (error) {
//         console.error('Error initializing PayPal buttons:', error);
//       }
//     };

//     initializePayPalButtons();

//     return () => {
//       const container = document.getElementById('paypal-button-container');
//       if (container) container.innerHTML = '';
//     };
//   }, [total]);

//   return <div id="paypal-button-container" className="my-4"></div>;
// };

// export default PayPalButton;
