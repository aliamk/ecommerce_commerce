import React, { useState, useEffect } from 'react'
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core'
import { useForm, FormProvider } from 'react-hook-form'

import { commerce } from '../../lib/commerce'

import FormInput from './FormInput'


const AddressForm = ({ checkoutToken }) => {
    // These hooks are needed to set the shipping options that correspond to the ones in Commerce.js' dashboard
    // Each option depends on another: option => subdivision => country
    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState('');
    const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
    const [shippingSubdivision, setShippingSubdivision] = useState('');
    const [shippingOptions, setShippingOptions] = useState([]);
    const [shippingOption, setShippingOption] = useState('');
    // Hook from react-hook-form which is spread into FormProvider below
    const methods = useForm()

    // Modify the fetched countries object: Convert to a 2D array, map + destructure to get a normal array, return a new array containing an id and label
    const countries = Object.entries(shippingCountries).map(([code, name]) => ({ id: code, label: name }))
    console.log(countries)

    // Setup token in Checkout.jsx
    const fetchShippingCountries = async (checkoutTokenId) => {
        // const response = await commerce.services.localeListShippingCountries(checkoutTokenId)
        const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId)
        // console.log(countries)
        setShippingCountries(countries)
        setShippingCountry(Object.keys(countries)[0])
    }

    useEffect(() => {
        fetchShippingCountries(checkoutToken.id)

    }, [])

    return (
        <>
            <Typography variant="h6" gutterBottom>Shipping Address</Typography>
            <FormProvider {...methods}>
                <form onSubmit=''>
                    <Grid container spacing={3}>
                        <FormInput required name='firstName' label='First Name' />
                        <FormInput required name='lastName' label='Last Name' />
                        <FormInput required name='address1' label='Address' />
                        <FormInput required name='email' label='Email' />
                        <FormInput required name='city' label='City' />
                        <FormInput required name='zipPostalCode' label='Zip/Postal Code' />

                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Country</InputLabel>
                            <Select value={shippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)}>
                                {countries.map((country) => (
                                    <MenuItem key={country.id} value={country.id}>{country.label}</MenuItem>
                                ))}
                            </Select>
                        </Grid>
                        {/* <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Subdivision</InputLabel>
                            <Select value={ } fullWidth onChange={ }>
                                <MenuItem key={ } value={ }>Select Me</MenuItem>
                            </Select>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Options</InputLabel>
                            <Select value={ } fullWidth onChange={ }>
                                <MenuItem key={ } value={ }>Select Me</MenuItem>
                            </Select>
                        </Grid> */}
                    </Grid>
                </form>
            </FormProvider>
        </>
    )
}

export default AddressForm


// https://react-hook-form.com/ - using this for simplicity and because it performs fewer renders