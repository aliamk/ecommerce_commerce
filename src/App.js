import React, { useState, useEffect } from 'react'
import { commerce } from './lib/commerce'
import { NavBar, Products } from './components'


const App = () => {

    const [products, setProducts] = useState([])
    const [cart, setCart] = useState({})

    const fetchProducts = async() => {
        // const response = await commerce.products.list()
        const { data } = await commerce.products.list()

        setProducts(data)
    }

    const fetchCart = async () => {
        // const response = await commerce.cart.retrieve()
        // const cart = await commerce.cart.retrieve()
        // setCart(cart)
        setCart(await commerce.cart.retrieve())
    }

    useEffect(() => {
        fetchProducts()
        fetchCart()
    }, [])

    // console.log(products)
    console.log(cart)

    return (
        <div>
            <NavBar />
            <Products products={products}/>
        </div>
    )
}

export default App
