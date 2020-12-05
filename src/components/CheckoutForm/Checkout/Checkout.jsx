import React, { useState } from 'react'
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from '@material-ui/core'

import useStyles from './checkout.styles'
import AddressForm from '../AddressForm'
import PaymentForm from '../PaymentForm'


const steps = ['Shipping address', 'Payment details']

const Checkout = () => {
    const classes = useStyles()
    const [activeStep, setActiveStep] = useState(0)

    const Confirmation = () => (
        <div>Confirmation</div>
    )

    // If state activeStep is 0, display the AddressForm; if it's any other number, display the paymentForm
    const Form = () => activeStep === 0 ? <AddressForm /> : <PaymentForm />

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
                    {activeStep === steps.length ? <Confirmation /> : <Form />}
                </Paper>
            </main>
        </>
    )
}

export default Checkout