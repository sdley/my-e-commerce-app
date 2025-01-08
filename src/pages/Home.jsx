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
    // console.log(minPrice);
  }
  const handleMaxPrice = (e) => {
    setMaxPrice(e.target.value);
    // console.log(maxPrice);
  }

  // sort products by name or price
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  const handleSort = (sortBy) => {
    setSortBy(sortBy);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  // filteres products
  // const filteredProducts = products.filter(prod => prod.price >= minPrice && prod.price <= maxPrice);
  const filteredProducts = products.filter(prod => prod.price >= minPrice && prod.price <= maxPrice).sort((a,
     b) => {
    if (sortBy === 'name') {
      return sortOrder === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
    } else {
      return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
    }
  });
  
  
  
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
          filteredProducts.length ? filteredProducts.slice(0,3).map(prod => ( 
            <Item 
              className="product-card"
              key={prod.id} 
              product = {prod} 
              favorite={favorites.includes(prod.id)}
              onFavorite={handleFavorite}
            />
          )) :
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
        className='text-left flex m-2'
        >
        <div>
          Price (min-max): $ 
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
        {/* <div className='ml-4'>
          Short By: &nbsp;
          <button
            className='btn btn-xs bg-white text-black border-0'
            onClick={() => setProducts([...products.sort((a, b) => a.title.localeCompare(b.title))])}
          >Name</button>
          <button
            className='btn btn-xs bg-white text-black border-0 ml-2'
          >Price</button>
        </div> */}
        <div className='ml-4'>
          Sort By: &nbsp;
          <button
            className={`btn btn-xs bg-white text-black border-0 ${sortBy === 'name' ? 'font-bold' : ''}`}
            onClick={() => handleSort('name')}
          >
            Name {sortBy === 'name' && sortOrder === 'asc' ? '▲' : '▼'}
          </button>
          <button
            className={`btn btn-xs bg-white text-black border-0 ml-2 ${sortBy === 'price' ? 'font-bold' : ''}`}
            onClick={() => handleSort('price')}
          >
            Price {sortBy === 'price' && sortOrder === 'asc' ? '▲' : '▼'}
          </button>
        </div>
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
    </div>
  )
}

export default Home