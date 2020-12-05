import React, { useState, useEffect } from 'react'
import { commerce } from './lib/commerce'
import { NavBar, Products, Cart, Checkout } from './components'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

const App = () => {

    const [products, setProducts] = useState([])
    const [cart, setCart] = useState({})

    // Connect to Commerse.js' api to see products list in our database
    const fetchProducts = async() => {
        // const response = await commerce.products.list()
        const { data } = await commerce.products.list()
        setProducts(data)
    }
    
    // Connect to the Commerce.js' api to check whats in the cart 
    const fetchCart = async () => {
        // const response = await commerce.cart.retrieve()
        // const cart = await commerce.cart.retrieve()
        // setCart(cart)
        setCart(await commerce.cart.retrieve())
    }

    // Add items to the cart (send as prop to product.js component)
    const handleAddToCart = async (productId, quantity) => {
        // const item = await commerce.cart.add(productId, quantity)
        const { cart } = await commerce.cart.add(productId, quantity)
        setCart(cart)
    }

    const handleUpdateCartQty = async (productId, quantity) => {
        // const response = await commerce.cart.update(productId, { quantity })
        const { cart } = await commerce.cart.update(productId, { quantity })
        setCart(cart)
    }

    const handleRemoveFromCart = async (productId) => {
        const { cart } = await commerce.cart.remove(productId)
        setCart(cart)
    }

    const handleEmptyCart = async () => {
        const { cart } = await commerce.cart.empty()
        setCart(cart)
    }

    useEffect(() => {
        fetchProducts()
        fetchCart()
    }, [])

    // console.log(products)
    console.log(cart)

    return (
        <Router>
            <div>
                <NavBar totalItems={cart.total_items} />
                <Switch>
                    <Route exact path="/">
                        <Products products={products} onAddToCart={handleAddToCart}/>
                    </Route>
                    <Route exact path="/cart">
                        <Cart cart={cart} 
                        handleUpdateCartQty={ handleUpdateCartQty }
                        handleRemoveFromCart={ handleRemoveFromCart }
                        handleEmptyCart={ handleEmptyCart }
                    />
                    </Route>
                    <Route exact path="/checkout">
                        <Checkout cart={cart} />
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}

export default App
