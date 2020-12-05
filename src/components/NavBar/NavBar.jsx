import React from 'react'
import { AppBar, Toolbar, IconButton, InputBase, Badge, MenuItem, Menu, Typography } from '@material-ui/core';
import logo from '../../assets/store.png'
// import MenuIcon from '@material-ui/icons/Menu';
// import SearchIcon from '@material-ui/icons/Search';
// import AccountCircle from '@material-ui/icons/AccountCircle';
// import MoreIcon from '@material-ui/icons/MoreVert';
// import FavoriteIcon from '@material-ui/icons/Favorite';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Link, useLocation } from 'react-router-dom'

import useStyles from './navbar.styles'


const NavBar = ({ totalItems }) => {

    const classes = useStyles()
    const location = useLocation()

    return (
        <>
            <AppBar position="fixed" className={classes.appBar} color="inherit" >
                <Toolbar>
                    <Typography component={Link} to="/" variant="h6" className={classes.title} color="inherit">
                        <img src={logo} alt="Commerce.js" height="25px" className={classes.image} />
                        Commerce.js
                    </Typography>
                    <div className={classes.grow} />
                    {location.pathname === '/' && (
                        <div className={classes.button}>
                            <IconButton component={Link} to="/cart" aria-label="Show Cart Items" color="inherit">
                                <Badge badgeContent={totalItems} color="secondary">
                                    <ShoppingCartIcon />
                                </Badge>
                            </IconButton>
                        </div>
                    )}
                </Toolbar>
            </AppBar>

        </>
    )
}

export default NavBar
