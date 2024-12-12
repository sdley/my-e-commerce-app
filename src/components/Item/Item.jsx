import React, { useState } from 'react';
import './Item.scss';

export default function Item({product}) {
    const imgSize = 128;
    const [isFavorite, setIsFavorite] = useState(false);

    
    // declaration d'un etat pour la gestion du clic pour la description
    const [isVisible, setIsVisible] = useState(false);

    // fonction pour gerer le clic sur le bouton
    const handleClic = () => {
      // inverse l'etat de la visibilite
      setIsVisible(!isVisible); 
    }

    

  return (
        <article className='Container'>
                <button
                  className='Favorite'
                  onClick={() => setIsFavorite(!isFavorite)}
                  >
                  {isFavorite ? '❤️' : '🤍'}
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
                  <button
                    onClick={handleClic}
                  >
                    { isVisible ? 'hide' : 'show'}
                  </button>
                  {isVisible && 
                    <div>
                      {product.specification.map((description) => (
                        <div className='descriptionItem'>{description}</div>
                      ))}
                    </div>
                  }
                </p>
          
                <Status stockCount = {product.stockCount} />
                {
                  product.stockCount > 0 && (
                    <>
                      <p>Price: ${ product.price }</p>
                      <button
                        // onClick={handleBuy}
                      >Buy</button>
                    </>
                  )
                }
                { product.stockCount > 1 && (
                  <button>Buy 2</button>
                )}
    </article>
  );
}

function Status({ stockCount }){
  const notAvailableTemplate = (
    <p className='NotAvailableStatus'>Not Available</p>
  );

  const AvailableTemplate = (
    <p className='AvailableStatus'>{ stockCount } items availables</p>
  );

  return stockCount === 0 ? notAvailableTemplate : AvailableTemplate;
}