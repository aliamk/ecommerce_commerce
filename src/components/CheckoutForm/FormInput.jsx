import React from 'react'
import { TextField, Grid } from '@material-ui/core'
import { useFormContext, Controller } from 'react-hook-form'

// A 'model' to base the AddressForm and PaymentForm on and means we don't need to worry about state in those components

const FormInput = ({ name, label, required }) => {

    const { control } = useFormContext()

    return (
        <Grid item xs={12} sm={6}>
            <Controller
                as={TextField}
                control={control}
                fullWidth
                name={name}
                label={label}
                required={required}
            />
        </Grid>
    )
}

export default FormInput
