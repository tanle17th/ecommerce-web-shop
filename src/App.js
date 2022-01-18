import React, { useState, useEffect } from 'react'
import { commerce } from './lib/commerce'

import { Products, Navbar } from './components'

const App = () => {
  // initialize useState with empty array:
  const [products, setProducts] = useState([])

  // fetchProducts async func from
  // coomerce instance
  const fetchProducts = async () => {
    const { data } = await commerce.products.list()

    setProducts(data)
  }

  // fetch products only once
  // so that when useState changes, fetchProducts()
  // will not be called again
  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <div>
      <Navbar />
      <Products products={products} />
    </div>
  )
}

export default App
