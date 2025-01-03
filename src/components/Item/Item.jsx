import React, { useState } from 'react';
import './Item.scss';

export default function Item({product, onFavorite, favorite}) {
    const imgSize = 128;
    // const [isFavorite, setIsFavorite] = useState(false);

    
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

  return (
        <article className='Container'>
                <button
                  className='Favorite'
                  onClick={() => onFavorite(product.id)}
                  >
                  {favorite ? '❤️' : '🤍'}
                </button>
                <h2 
                  className='text-2xl font-bold m-4'
                  >{product.title}</h2>
                <p className='flex items-center justify-center'>
                  <img 
                    src={product.imageSrc}
                    alt={product.title}
                    width={imgSize}
                    height={imgSize}
                  />
                </p>
                <p className='text-lg m-4'>
                  Specification:{" "}
                  <button 
                    className='btn btn-xs bg-white text-black border-0'
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
                      <p className='m-4'>Price: ${ product.price }</p>
                      <button
                        className='btn btn-xs bg-white text-black border-0'
                        onClick={handleBuy}
                      >Acheter</button>
                    </>
                  )
                }
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