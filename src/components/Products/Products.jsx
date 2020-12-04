import React from 'react'
import { Grid } from '@material-ui/core'

import Product from './Product/Product'
import useStyles from './products.styles'

const products = [
    { id: 1, name: 'Shoes', description: 'Running Shoes', price: '$5', image: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/cushion-shoes-7659-1584132587.jpg' },
    { id: 2, name: 'Macbook', description: 'Apple Macbook', price: '$10', image: 'https://zdnet4.cbsistatic.com/hub/i/r/2020/11/16/37e33024-2892-4bb7-9d21-6ac6f7544def/thumbnail/770x433/5f1b7f881bfb80a9f2bbe02bc6d64b49/apple-macbook-pro-m1-2020-5.jpg' }
]

const Products = () => {

    const classes = useStyles()

    return (
        <main className={classes.content}>
            <div className={classes.toolbar} />
            <Grid container justify="center" spacing={4}>
                {products.map((product) => (
                    <Grid item key={product.id} xs={12} sm={6} lg={3}>
                        <Product product={product} />
                    </Grid>
                ))}
            </Grid>
        </main>
    )
}

export default Products
