import React from 'react'

const FilteredProductByPrice = ({
        minPrice, 
        maxPrice, 
        handleMinPrice, 
        handleMaxPrice,
        sortBy,
        sortOrder,
        handleSort,
        filteredProducts
    }) => {
        
  return (
    <div>
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

export default FilteredProductByPrice