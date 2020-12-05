import React, { useState, useEffect } from 'react'
import { commerce } from './lib/commerce'
import { NavBar, Products, Cart } from './components'

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
        const item = await commerce.cart.add(productId, quantity)
        setCart(item.cart)
    }

    useEffect(() => {
        fetchProducts()
        fetchCart()
    }, [])

    // console.log(products)
    console.log(cart)

    return (
        <div>
            <NavBar totalItems={cart.total_items} />
            {/* <Products products={products} onAddToCart={handleAddToCart}/> */}
            <Cart cart={cart} />
        </div>
    )
}

export default App
