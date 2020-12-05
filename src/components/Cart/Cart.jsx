import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Typography, Button, Grid } from '@material-ui/core'

import useStyles from './cart.styles'
import CartItem from './CartItem/CartItem'

// THE CART PAGE: IF THERE ARE NO ITEMS IN THE CART, SHOW THE 'EMPTYCART' MESSAGE. IF THERE ARE ITEMS, THEN SHOW THE FILLEDCART COMPONENT (INSTEAD OF THE PRODUCTS COMPONENT)

const Cart = ({ cart }) => {

    const classes = useStyles()

    const EmptyCart = () => (
        <Typography variant="subtitle1">You have no items in your shopping cart, <Link to="/" className={classes.link}>start adding some</Link>!</Typography>
    )

    const FilledCart = () => (
        <>
            <Grid container spacing={3}>
                {cart.line_items.map((item) => (
                    <Grid item xs={12} sm={4} key={item.id}>
                        <CartItem item={item} />
                        {/* <div>{item.name}</div> */}
                    </Grid>
                ))}
            </Grid>
            <div className={classes.cardDetails}>
                <Typography variant="h4">Subtotal: {cart.subtotal.formatted_with_symbol}</Typography>
                <div>
                    <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary">Empty Cart</Button>
                    <Button className={classes.checkoutButton} size="large" type="button" variant="contained" color="primary">Checkout</Button>
                </div>
            </div>
        </>
    )

    if (!cart.line_items) return 'Loading...'

    return (
        <Container>
            <div className={classes.toolbar} /> {/* This just adds space between the navbar and items below it */}
            <Typography className={classes.title} variant="h3" gutterBottom>Your Shopping Cart</Typography>
            { !cart.line_items.length ? <EmptyCart /> : <FilledCart />}
        </Container>
    )
}

export default Cart
