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

    // Etat du stock initial
    const [stock, setStock] = useState(product.stockCount);
    // gestion d'achats
    const handleBuy = () => {
      if (stock){
        // stock est disponible
        // decremente le stock de 1
        setStock(stock - 1);
        // console.log(stock - 1);

      } 
      // else{
      //   console.log('Stock epuise !')
      // }
    }

    // Achat par 2
    const handleBuy2 = () => {
      if (stock){
        setStock(stock - 2);
        console.log(stock - 2);
      }
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
          
                <Status stockCount = {stock} />
                {
                  stock > 0 && (
                    <>
                      <p>Price: ${ product.price }</p>
                      <button
                        onClick={handleBuy}
                      >Buy</button>
                    </>
                  )
                }
                { stock > 1 && (
                  <button
                    onClick={handleBuy2}
                  >Buy 2</button>
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