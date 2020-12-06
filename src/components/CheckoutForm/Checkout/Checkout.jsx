import React, { useState, useEffect } from 'react'
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from '@material-ui/core'

import { commerce } from '../../../lib/commerce'
import useStyles from './checkout.styles'
import AddressForm from '../AddressForm'
import PaymentForm from '../PaymentForm'

// For the Stepper, initialise it to show two scenarios: shipping address section or the payment details section
const steps = ['Shipping address', 'Payment details']

const Checkout = ({ cart, order, onCaptureCheckout, error }) => {
    const classes = useStyles()
    const [activeStep, setActiveStep] = useState(0)                 // For the stepper
    const [checkoutToken, setCheckoutToken] = useState(null)       // Received from Commerce.js
    const [shippingData, setShippingData] = useState({})           // data from AddressForm initially empty object

    // Get tokens from commerce.js and set its state
    useEffect(() => {
        const generateToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' })
                // console.log(token)
                setCheckoutToken(token)
            } catch (error) {
                console.log(error)
            }
        }
        generateToken()
    }, [cart])

    // When the next function is called (button in AddressForm), update the stepper
    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1)
    // When the back function is called (button in AddressForm), update the stepper
    const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1)

    // Next Button in AddressForm.jsx: data from the form is set in state by this function and the stepper is updated
    const next = (data) => {
        setShippingData(data)
        nextStep()
    }

    const Confirmation = () => (
        <div>Confirmation</div>
    )

    // If activeStep's state is 0, display the AddressForm; if it's any other number, display the paymentForm
    // Pass checkoutToken and Next and ShippingData as props to the AddressForm and PaymentForm
    const Form = () => activeStep === 0
        ? <AddressForm checkoutToken={checkoutToken} next={next} />
        : <PaymentForm checkoutToken={checkoutToken} shippingData={shippingData} nextStep={nextStep} backStep={backStep} onCaptureCheckout={onCaptureCheckout} />

    return (
        <>
            <div className={classes.toolbar} />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant="h4" align="center">Checkout</Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map((step) => (
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {/* If there are no more steps left, display confirmation; else display the default form */}
                    {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}
                </Paper>
            </main>
        </>
    )
}

export default Checkout
