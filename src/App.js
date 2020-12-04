import React, { useState, useEffect } from 'react'
import { commerce } from './lib/commerce'
import { NavBar, Products } from './components'


const App = () => {

    const [products, setProducts] = useState([])

    const fetchProducts = async() => {
        // const response = await commerce.products.list()
        const { data } = await commerce.products.list()

        setProducts(data)
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    // console.log(products)

    return (
        <div>
            <NavBar />
            <Products products={products}/>
        </div>
    )
}

export default App
