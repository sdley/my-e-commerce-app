import React from 'react'
import './index.css';


function ProductList(props) {
  return (
    <>
      <h2>Products</h2>
      <div className="List">{props.children}</div>
    </>
  )
}

export default ProductList