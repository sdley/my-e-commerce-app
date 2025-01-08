import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateProduct() {
  const [title, setTitle] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState();
  const [price, setPrice] = useState();

  // Regular expression for URL validation
  const urlRegex = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d{1,5})?(\/[^\s]*)?$/;
  const [errorImgURL, setErrorImgURL] = useState('');


  const navigate = useNavigate();


  const handleInputURL = (e) => {
    const inputValue = e.target.value; // Récupère la valeur de l'input
  
    // Vérifions si l'URL est valide
    if (!urlRegex.test(inputValue)) {
      setErrorImgURL('Please enter a valid URL.');
    } else {
      setErrorImgURL(''); // On efface le message d'erreur s'il n'y a pas d'erreur
    }
    
    // Met à jour l'état imageURL avec la valeur actuelle de l'input
    setImageURL(inputValue);
    // console.log(inputValue); 
  };
  



  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !description || !imageURL || !quantity || !price) {
      return; // On ne fait rien si les champs ne sont pas remplis
    }

    const newProduct = {
      title,
      imageSrc: imageURL,
      // convert specification to a list of array
      specification: description.split('\n'),
      // convert quantity and price to number
      stockCount: Number(quantity),
      price: Number(price),
      created_at: new Date().toLocaleDateString()
    }
    // send newProduct to server
    fetch('http://localhost:3000/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newProduct)
    })
    .then((response) => {
      // on redirige l'utilisateur vers la page des produits
      navigate('/products');
    })
  }
    return (
      <div className='flex-1 pt-20 pb-8 px-6'>

        <div className="font-bold text-sxl mb-6">
          <h1 className="text-3xl m-4 text-center">Add New Product</h1>
          <form onSubmit={(e) => {handleSubmit(e)}}>
            <div className="mb-4">
              <label>Title</label>
              <input 
                placeholder="Enter the title of the product"
                value={title} 
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                type="text"
                minLength={5}
                className="border-0 
                  outline-0 
                  p-2 
                  ring-1 
                ring-indigo-400 
                  rounded-lg 
                  w-full 
                  block 
                  mt-1 
                  focus:ring-2" />
            </div>
            <div className="mb-4">
              <label>Image URL</label>
              <input 
                placeholder="Enter the URL of the image"
                value={imageURL} 
                onChange={handleInputURL}
                type="text" 
                minLength={10}
                className="border-0 
                  outline-0 
                  p-2 
                  ring-1 
                ring-indigo-400 
                  rounded-lg 
                  w-full 
                  block 
                  mt-1 
                  focus:ring-2" />
                  {errorImgURL && <p className="text-red-200">{errorImgURL}</p>}
            </div>

            <div className="mb-8">
              <label>Description</label>
              <textarea
                placeholder="Enter the description of the product (Hit Enter to add more than one description)"
                value={description}
                minLength={10}
                onChange={(e) => setDescription(e.target.value)}
                className="border-0 
                  outline-0 
                  h-32
                  p-2 
                  ring-1
                  ring-indigo-400 
                  rounded-lg 
                  w-full 
                  block mt-1 
                  focus:ring-2" >
              </textarea>
            </div>
            <div className="mb-4">
              <label>Available Quantity</label>
              <input 
                placeholder="Enter the available quantity: (i.e. 10)"
                value={quantity} 
                onChange={(e) => setQuantity(e.target.value)}
                type="number" 
                min={1}
                max={100}
                required
                className="border-0 
                  outline-0 
                  p-2 
                  ring-1 
                ring-indigo-400 
                  rounded-lg 
                  w-full 
                  block 
                  mt-1 
                  focus:ring-2" />
            </div>
            <div className="mb-4">
              <label>Price</label>
              <input 
                placeholder="Enter the price of the product: (i.e. 199.00)"
                value={price} 
                onChange={(e) => setPrice(e.target.value)}
                type="number" 
                step={0.01}
                min={0.01}
                max={10000}
                required
                className="border-0 
                  outline-0 
                  p-2 
                  ring-1 
                ring-indigo-400 
                  rounded-lg 
                  w-full 
                  block 
                  mt-1 
                  focus:ring-2" />
            </div>
            <button 
              disabled={
                title.length < 1 || description.length < 1 || imageURL.length < 1 
                || !quantity || !price 
              }
              className="
                bg-indigo-400 
                text-white 
                block w-full 
                p-2 rounded-lg 
                hover:bg-indigo-600 
                disabled:bg-gray-300 
                disabled:text-gray-500 
                disabled:cursor-not-allowed
                "
              >Create</button>
          </form>
        </div>
      </div>
    );
  }