import React, { useState, useEffect } from 'react'
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button, CssBaseline } from '@material-ui/core'
import { Link /*useHistory*/ } from 'react-router-dom'

import { commerce } from '../../../lib/commerce'
import useStyles from './checkout.styles'
import AddressForm from '../AddressForm'
import PaymentForm from '../PaymentForm'

// For the Stepper, initialise it to show two scenarios: shipping address section or the payment details section
const steps = ['Shipping address', 'Payment details']

const Checkout = ({ cart, order, onCaptureCheckout, error }) => {
    const [isFinished, setIsFinished] = useState(false)
    const [activeStep, setActiveStep] = useState(0)                 // For the stepper
    const [checkoutToken, setCheckoutToken] = useState(null)       // Received from Commerce.js
    const [shippingData, setShippingData] = useState({})           // data from AddressForm initially empty object
    const classes = useStyles()
    // const history = useHistory()

    // Get tokens from commerce.js and set its state
    useEffect(() => {
        const generateToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' })
                // console.log(token)
                setCheckoutToken(token)
            } catch (error) {
                // history.pushState('/')
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

    const timeout = () => {
        setTimeout(() => {
            setIsFinished(true)
        }, 3000)
    }

    let Confirmation = () => (order.customer ? (
        <>
            <div>
                <Typography variant="h5">Thank you for your purchase, {order.customer.firstname} {order.customer.lastname}!</Typography>
                <Divider className={classes.divider} />
                <Typography variant="subtitle2">Order ref: {order.customer_reference}</Typography>
            </div>
            <br />
            <Button component={Link} to="/" variant="outlined" type="button">Back to home</Button>
        </>
    ) : isFinished ? (
        <>
            <div>
                <Typography variant="h5">Thank you for your purchase!</Typography>
                <Divider className={classes.divider} />
            </div>
            <br />
            <Button component={Link} to="/" variant="outlined" type="button">Back to home</Button>
        </>
    ) : (
                <div className={classes.spinner}>
                    <CircularProgress />
                </div>
            ));

    if (error) {
        Confirmation = () => (
            <>
                <Typography variant="h5">Error: {error}</Typography>
                <br />
                <Button component={Link} to="/" variant="outlined" type="button">Back to home</Button>
            </>
        );
    }

    // If activeStep's state is 0, display the AddressForm; if it's any other number, display the paymentForm
    // Pass checkoutToken and Next and ShippingData as props to the AddressForm and PaymentForm
    const Form = () => activeStep === 0
        ? <AddressForm checkoutToken={checkoutToken} setShippingData={setShippingData} next={next} />
        : <PaymentForm checkoutToken={checkoutToken} shippingData={shippingData} nextStep={nextStep} backStep={backStep} onCaptureCheckout={onCaptureCheckout} timeout={timeout} />

    return (
        <>
            <CssBaseline />
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
