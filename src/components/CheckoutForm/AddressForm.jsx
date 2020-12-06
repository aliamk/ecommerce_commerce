import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core'
import { useForm, FormProvider } from 'react-hook-form'

import { commerce } from '../../lib/commerce'

import FormInput from './FormInput'

const AddressForm = ({ checkoutToken, next }) => {
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

    // ==== CONVERT OBJECTS TO ARRAYS AND DESTRUCTURE REQUIRED ITEMS ==== //
    // Modify the fetched countries object: Convert to a 2D array, map + destructure to get a normal array, return a new array containing an id and label
    const countries = Object.entries(shippingCountries).map(([code, name]) => ({ id: code, label: name }))
    const subdivisions = Object.entries(shippingSubdivisions).map(([code, name]) => ({ id: code, label: name }))
    const options = shippingOptions.map((sO) => ({ id: sO.id, label: `${sO.description} - (${sO.price.formatted_with_symbol})` }))
    // console.log(shippingOptions)

    // ==== FETCH FUNCTIONS ==== //
    // Fetch countries object from Commerce.js using the checkoutToken from Checkout.jsx
    const fetchShippingCountries = async (checkoutTokenId) => {
        // const response = await commerce.services.localeListShippingCountries(checkoutTokenId)
        const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId)
        // console.log(countries)
        setShippingCountries(countries)
        setShippingCountry(Object.keys(countries)[0])
    }
    //  Fetch all the subdivisions of the country that has been fetched for the shippingCountry
    const fetchSubdivisions = async (countryCode) => {
        // const response = await commerce.services.localeListSubdivisions(countryCode)
        const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode)
        setShippingSubdivisions(subdivisions)
        setShippingSubdivision(Object.keys(subdivisions)[0])
    }
    // Fetch shippingOptions
    const fetchShippingOptions = async (checkoutTokenId, country, region = null) => {
        const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, region })
        setShippingOptions(options)
        setShippingOption(options[0].id)
    }

    // ==== USEEFFECT HOOKS ==== //
    // Call the fetchShipping function for COUNTRIES from Commerce.js and pass in the token on app load
    useEffect(() => {
        fetchShippingCountries(checkoutToken.id)
    }, [])
    // If shippingCountry is present/changes, call the fetchSubdivision function for SUBDIVISIONS from Commerce.js
    useEffect(() => {
        if (shippingCountry) fetchSubdivisions(shippingCountry)
    }, [shippingCountry])
    // If shippingSubdivision is selected/changes, call the fetchShippingOptions function for OPTIONS and pass it the token, country and subdivision
    useEffect(() => {
        if (shippingSubdivision) fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision)
    }, [shippingSubdivision])

    return (
        <>
            <Typography variant="h6" gutterBottom>Shipping Address</Typography>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit((data) => next({ ...data, shippingCountry, shippingSubdivision, shippingOption }))}>
                    <Grid container spacing={3}>
                        <FormInput name='lastName' label='Last Name' />
                        <FormInput name='address1' label='Address' />
                        <FormInput name='email' label='Email' />
                        <FormInput name='city' label='City' />
                        <FormInput name='zipPostalCode' label='Zip/Postal Code' />
                        <FormInput name='firstName' label='First Name' />

                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Country</InputLabel>
                            <Select value={shippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)}>
                                {countries.map((country) => (
                                    <MenuItem key={country.id} value={country.id}>{country.label}</MenuItem>
                                ))}
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Subdivision</InputLabel>
                            <Select value={shippingSubdivision} fullWidth onChange={(e) => setShippingSubdivision(e.target.value)}>
                                {subdivisions.map((subdivision) => (
                                    <MenuItem key={subdivision.id} value={subdivision.id}>{subdivision.label}</MenuItem>
                                ))}
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Options</InputLabel>
                            <Select value={shippingOption} fullWidth onChange={(e) => setShippingOption(e.target.value)}>
                                {options.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>{option.label}</MenuItem>
                                ))}
                            </Select>
                        </Grid>
                    </Grid>
                    <br />
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button component={Link} to="/cart" variant="outlined">Back to Cart</Button>
                        <Button type="submit" variant="contained" color="primary">Next</Button>
                    </div>
                </form>
            </FormProvider>
        </>
    )
}

export default AddressForm


// https://react-hook-form.com/ - using this for simplicity and because it performs fewer renders