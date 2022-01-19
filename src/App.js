import React, { useState, useEffect } from 'react'
import { commerce } from './lib/commerce'

import { Products, Navbar, Cart } from './components'

const App = () => {
  // initialize useState with empty array:
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState({})

  // fetchProducts async func from
  // commerce instance
  const fetchProducts = async () => {
    const { data } = await commerce.products.list()

    setProducts(data)
  }

  // fetch items that are already in cart:
  // cart is an obj returned by CommerceJS
  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve())
  }

  // item added to cart is returned by CommerceJS
  // it has CART object inside
  // we need to get that cart object and set the whole cart
  // back to useState()
  const handleAddToCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity)

    setCart(item.cart)
  }

  // fetch products only once
  // so that when useState changes, fetchProducts()
  // will not be called again
  useEffect(() => {
    fetchProducts()
    fetchCart()
  }, [])

  return (
    <div>
      <Navbar totalItems={cart.total_items} />
      {/* <Products products={products} onAddToCart={handleAddToCart} /> */}
      <Cart cart={cart} />
    </div>
  )
}

export default App
