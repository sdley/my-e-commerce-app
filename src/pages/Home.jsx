import { useEffect, useState } from 'react';
import Item from '../components/Item/Item';
import List from '../components/List/List';


const Home = () => {

  const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        fetch('http://localhost:3000/products')
        .then(response => response.json())
        .then(data => {
            setProducts(data);
            setError(null);
        })
        .catch(error => {
            setError(error.message);
            // Dans le cas ou il y a un permier chargement reussi et qu'en suite une erreur survienne
            // On evite d'afficher erreur et products deja chargés
            setProducts([]);
        });
    }, []);

  const [favorites, setFavorites] = useState([])
  const handleFavorite = (id) => {
    if (favorites.includes(id)) {
      const othersId = favorites.filter(idProd => idProd !== id);
      setFavorites(othersId);
    } else {
      setFavorites([...favorites, id]);
    }
  }

  // products filtered by price where user can specify the two prices
  // then then we'll show the products that are in between the two prices
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const handleMinPrice = (e) => {
    setMinPrice(e.target.value);
  }
  const handleMaxPrice = (e) => {
    setMaxPrice(e.target.value);
  }
  const filteredProducts = products.filter(prod => prod.price >= minPrice && prod.price <= maxPrice);
  // console.log(filteredProducts);
  
  return (
    <div className='flex-1 pt-20 pb-8 px-6'>
      {/* Perspectives:
            - Afficher aucun produit disponible lorsque la base de données est vide
            - Afficher uniquement 3 produits sur la page d'accueil
            - Mettre a jour la liste des produits affichés lors de la modification des prix min et max
      */}
      {products.length === 0 && !error && <p className="text-2xl text-center mt-10">Loading...</p>}

      {
          error && <p className="text-2xl text-center mt-10 text-red-500">{error}</p>
      }

      <h2 
        className='text-2xl font-bold text-left m-4'
        >Products Overview</h2>

      <List>
        {
          // Afficher uniquement 3 produits sur la page d'accueil
          products.slice(0,3).map(prod => (
            <Item 
              key={prod.id} 
              product = {prod} 
              favorite={favorites.includes(prod.id)}
              onFavorite={handleFavorite}
            />
          ))
        }
      </List>
      {/* products filtered by price where user can specify the two prices */}
      <h2 
        className='text-2xl font-bold text-left m-4'
        >Products filtered by price</h2>
      <div
        className='text-left'
        > Price (min-max): $ 
        <input
          type='number'
          min={0} 
          value={minPrice} onChange={handleMinPrice}
          className="input input-bordered input-xs max-w-xs bg-white text-black" />&nbsp;
        - $
        <input
          type='number' 
          max={10000}
          value={maxPrice} onChange={handleMaxPrice}
          className="input input-bordered input-xs max-w-xs bg-white text-black" />
      </div>
      {/* affiche sur une ligne le nom du produit et son prix */}
      <div>
        {
          filteredProducts.map(prod => (
            <div
              key={prod.id}
              className='text-left m-2'
              ><span className='text-l font-bold'>{prod.title}</span> - &nbsp;
              <span className='text-l font-bold'>Cost: </span> ${prod.price}
              <hr />
            </div>
          ))
        }
      </div>
      {/* Si on le desire, on affiche ou encore on met a jour la liste des produits affiches */}
      {/* <List>
        {
          filteredProducts.map(prod => (
            <Item 
              key={prod.id} 
              product = {prod} 
              favorite={favorites.includes(prod.id)}
              onFavorite={handleFavorite}
            />
          ))
        }
      </List> */}
    </div>
  )
}

export default Home