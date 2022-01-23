import React, { useState, useEffect } from 'react'
import { commerce } from './lib/commerce'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { Products, Navbar, Cart, Checkout } from './components'

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

  /** [ADD] */
  const handleAddToCart = async (productId, quantity) => {
    // item added to cart is returned by CommerceJS
    // it has CART object inside
    // we need to get that cart object and set the whole cart
    // back to useState()
    const { cart } = await commerce.cart.add(productId, quantity)

    setCart(cart)
  }

  /** [UPDATE] */
  const handleUpdateCartQty = async (productId, quantity) => {
    // we are updating the whole CART
    // there are multiple fields to update in the obj but we want only quantity
    const { cart } = await commerce.cart.update(productId, { quantity })

    setCart(cart)
  }

  /** [REMOVE ONE] */
  const handleRemoveFromCart = async (productId) => {
    const { cart } = await commerce.cart.remove(productId)

    setCart(cart)
  }

  /** [EMPTY] */
  const handleEmptyCart = async () => {
    const { cart } = await commerce.cart.empty()

    setCart(cart)
  }

  // fetch products only once
  // so that when useState changes, fetchProducts()
  // will not be called again
  useEffect(() => {
    fetchProducts()
    fetchCart()
  }, [])

  return (
    <Router>
      <div>
        {/* Navbar will always be displayed */}
        <Navbar totalItems={cart.total_items} />
        {/* Routes is to define which route between these routes
        you want to switch into */}
        <Routes>
          <Route
            path="/"
            element={
              <Products products={products} handleAddToCart={handleAddToCart} />
            }
          ></Route>
          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                handleUpdateCartQty={handleUpdateCartQty}
                handleRemoveFromCart={handleRemoveFromCart}
                handleEmptyCart={handleEmptyCart}
              />
            }
          ></Route>
          <Route path="/checkout" element={<Checkout cart={cart} />}></Route>
        </Routes>
      </div>
    </Router>
  )
}

export default App
