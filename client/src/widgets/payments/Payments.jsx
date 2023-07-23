import React from 'react'
import { Button } from 'react-bootstrap'
import { PayPalButtons } from '@paypal/react-paypal-js'
import StripeCheckout from 'react-stripe-checkout'


//NOTE: for process.env.REACT_APP_KEYS the .env file must be placed in the root directory of the client folder not src folder

export const Payments = ({ paymethod, createHandle, approveHandle, onError, totalCost, token, stripe }) => {

     switch (paymethod) {
        case 'Paypal': return (<PayPalButtons createOrder={createHandle} onApprove={approveHandle} onError={onError} />) 
        case 'Stripe': return (<StripeCheckout disabled={stripe !== null } name={'Electro Sounds'} image={`#`} billingAddress shippingAddress description={'Order Total'} amount={totalCost} token={token}  stripeKey={process.env.REACT_APP_STRIPE} >
                                 <Button disabled={stripe !== null}>Pay with Stripe</Button>
                              </StripeCheckout>)
        case 'Google': return (<div>Google</div>)
        default: return null
     }
}
