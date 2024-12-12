import './ProductItem.css';
import { useState } from 'react';

import React from 'react'

function ProductItem({product}) {
  const [isFavorite, setIsFavorite] = useState(true);
  return (
    <div>
        <article className='Container' style={{backgroundColor:'slategray'}}>
          <button 
          className="Favorite"
          onClick={() => setIsFavorite(!isFavorite)}
          >
            {isFavorite ? '❤️' : '🤍'}
          </button>
          <h2>{ product.title }</h2>
          <img 
            src={product.imageSrc} 
            alt={product.title}
            width={128}
            height={128}
            />
            <p>
              Specification: {''}
              <button>show</button>
            </p>
            <Status stockCount = {product.stockCount} />
            {product.stockCount > 0 && (
              <>
                <p>Price: ${ product.price }</p>
                <button>Buy</button>
              </>
            )}
            {2 > 1 && (
              <button>Buy 2</button>
            )}
        </article>
    </div>
  );
}

export default ProductItem;

function Status({ stockCount }){
  const notAvailableTemplate = (
    <p className='NotAvailableStatus'>Not available</p>
  );

  const availableTemplate = (
    <p className='AvailableStatus'>{ stockCount} items available</p>
  );

  return stockCount === 0 ? notAvailableTemplate : availableTemplate;
}