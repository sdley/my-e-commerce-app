import './App.css';
import Item from "./components/Item/Item";
import List from './components/List/List';
import { products } from './data/products';

function App() {
  // Desctructuration en JS
  const tab = ['sdley', 'DIALLO', 2024];
  const prenom = tab[0];
  const nom = tab[1];
  const annee = tab[2];

  // ou encore
  const [prenom_, nom_, annee_] = tab;
  const [prenom__, ...autres] = tab; // autres = tout ce qui reste (nom & annee)
  
  // How about object? absolutely, same!
  const myObj = {
    prenom: "Souleymane",
    nom: "DIALLO",
    annee: 2024

    /*
     NB :
      - en JS, "prenom": "sdley" est equivalent a prenom: "sdley"
      - en JSON, il faudra absolument les cotes comme ceci:
        "prenom": "sdley"
    */
  }
  const {prenom___} = myObj;
  console.log(`My name's ${prenom} ${nom}. Copyright ${annee}`);


  return (
    
    <div className='App'>
      <List>
        {
          products.map(prod => (
            <Item product = {prod} />
          ))
        }
      </List>
    </div>
  );
}

export default App;
