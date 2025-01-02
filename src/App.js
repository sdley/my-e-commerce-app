import { useState } from 'react';
import './App.css';
import Item from "./components/Item/Item";
import List from './components/List/List';
import { products } from './data/products';

function App() {

  const [favorites, setFavorites] = useState([])
  const handleFavorite = (id) => {
    if (favorites.includes(id)) {
      const othersId = favorites.filter(idProd => idProd !== id);
      setFavorites(othersId);
    } else {
      setFavorites([...favorites, id]);
    }
  }


  return (
    
    <div className='App'>
      <List>
        {
          products.map(prod => (
            <Item 
              key={prod.id} 
              product = {prod} 
              favorite={favorites.includes(prod.id)}
              onFavorite={handleFavorite}
            />
          ))
        }
      </List>
    </div>
  );
}

export default App;
