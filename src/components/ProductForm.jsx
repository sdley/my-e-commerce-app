

const ProductForm = ({product}) => {
  return (
    <div className="card bg-base-100 shadow-xl m-4">
        <div className="card-body">
            <h2 className="card-title">{product.title}</h2>
            <p className='text-smaller text-gray-500'>Date: {product.created_at}</p>
            <p>{product.description}</p>
            <div className="card-actions justify-between items-center">
              <span className='cursor-pointer'>❤️</span>
              <button className="btn btn-error text-white">delete</button>
            </div>
        </div>
    </div>
  )
}

export default ProductForm;