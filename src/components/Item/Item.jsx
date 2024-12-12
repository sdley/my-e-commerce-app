import React from 'react';
import './Item.scss';

export default function Item({product}) {
    const imgSize = 128
  return (
    // <article className='Container' style='background-color:slategray'>
    <article className='Container'>
                <button
                  className='Favorite'>
                  🤍
                </button>
                <h2>{product.title}</h2>
                <img
                  src={product.imageSrc}
                  alt={product.title}
                  width={imgSize}
                  height={imgSize}
                />
                <p>
                  Specification:{" "}
                  <button>
                    show
                  </button>
                </p>
          
                <p className='NotAvailableStatus'>Not available</p>
                    <button>Buy</button>
                    <button>Buy 2</button>
    </article>
  )
}