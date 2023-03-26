import React, {useState, SyntheticEvent} from 'react'
import { productsTest } from '../../views/VirtualData'
import { ProductType } from '../ProductCart'
import { useCreateProductMutation, useGetAllProductsQuery } from '../../store/apiquery/productApiSlice';
import Spinner from '../Spinner';
import { link } from '../../Utils/Generals';

const AddOrEditProduct = ({ product }: { product: null | ProductType}) => {

  const [image, setImage] = useState<Blob>();
  const [data, setData] = useState<ProductType>({});

  const [createProduct, result] =  useCreateProductMutation();


  const handleSubmit = (e : SyntheticEvent) => {

	e.preventDefault();

	const form = new FormData(e.target);
	form.append('reviews', '5'); // Pour le moment

	createProduct(form);

  }

  const handleValue = (e : SyntheticEvent) => {

	const name = e.target.name;
	const value = e.target.value;
	setData(values => ({...values, [name]: value}))

  }

  if (!product) {

    return (
      <form action="" method="post" className="checkout-service p-3 .form-product" onSubmit={handleSubmit}>
		{image && 
			<div className="w-25 mx-auto p-3 border border-1 rounded-5 fd-hover-border-primary mb-4" style={{height : '250px'}}>
				<img src={URL.createObjectURL(image)} alt="Product Image Preview" className='w-100 h-100'/>
			</div>
		}
        <div className='d-flex gap-2'>
          <label className='w-50'>
            <span>Name</span>
            <input type="text" name="name" className="form-control w-100 rounded-0 p-2" placeholder='Product Name' onChange={handleValue} required/>
          </label>
          <label className='w-50'>
            <span>Image</span>
            <input type="file" name="img" className="form-control w-100 rounded-0 p-2" placeholder='Product Image'
			onChange={(e : SyntheticEvent) => setImage(e.target.files[0])} accept='image/*' required/>
          </label>
        </div>
        <div className='d-grid grid-4 gap-2 mt-3'>
          <label>
            <span>Price</span>
            <input type="number" step={0.1} name="price" className="form-control w-100 rounded-0 p-2" placeholder='Product Price' onChange={handleValue} required/>
          </label>
          <label>
            <span>Old Price</span>
            <input type="number" step={0.1} name="old_price" className="form-control w-100 rounded-0 p-2" placeholder='Old Price' onChange={handleValue} required/>
          </label>
          <label>
            <span>Quantity</span>
            <input type="number" name="quantity" className="form-control w-100 rounded-0 p-2" placeholder='Total Quantity' onChange={handleValue} required/>
          </label>
          <label>
            <span>Reduction</span>
            <input type="text" name="reduction" className="form-control w-100 rounded-0 p-2" value={0} placeholder='Reduction ?' onChange={handleValue} required/>
          </label>
        </div>
        <div className='my-4'>
          <label>
            <span>Description</span>
          </label>
          <textarea name="desc" cols={100} rows={10} className='w-100 p-2 border' placeholder='Description' onChange={handleValue}></textarea>
        </div>
        <div>
          {
			result.isError && result.error.data.errors.map(err => {
				return <div key={err} className='fw-bold'><i className='bi bi-x text-danger'>{err}</i></div>
			})
		  }
        </div>
        <div className='mt-3'><button className="fd-btn w-25 text-center border-0">SAVE NOW</button></div>
      </form>
    )
  }

  return (
    <form action="" method="post" className="checkout-service p-3">
      <div className="w-25 mx-auto p-3 border border-1 rounded-5 fd-hover-border-primary" style={{height : '250px'}}><img src={link(product.img)} alt={product.name} className='w-100 h-100'/></div>
      <div className='d-flex gap-2'>
        <label className='w-50'>
          <span>Name</span>
          <input type="text" name="firstname" className="form-control w-100 rounded-0 p-2" value={product.name} />
        </label>
        <label className='w-50'>
          <span>Image</span>
          <input type="file" name="image" className="form-control w-100 rounded-0 p-2" placeholder='Change Image' />
        </label>
      </div>
      <div className='d-grid grid-4 gap-2 mt-3'>
        <label>
          <span>Price</span>
          <input type="number" name="price" className="form-control w-100 rounded-0 p-2" value={product.price} />
        </label>
        <label>
            <span>Old Price</span>
            <input type="number" name="old_price" className="form-control w-100 rounded-0 p-2" value={product.old_price} />
          </label>
        <label>
          <span>Quantity</span>
          <input type="number" name="image" className="form-control w-100 rounded-0 p-2" value={200} />
        </label>
        <label>
          <span>Reduction</span>
          <input type="text" name="price" className="form-control w-100 rounded-0 p-2" value={product.reduction ?? 0} />
        </label>
      </div>
      <div className='my-4'>
        <label>
          <span>Description</span>
        </label>
        <textarea name="description" cols={100} rows={10} className='w-100 p-2 border' placeholder='Description' value={product.desc}></textarea>
      </div>
      <div>
          <label>
            <input type="checkbox" name="deal_of_day" />
            <span className='ms-2'>Deal Of Day</span>
          </label>
        </div>
      <div className='mt-4'><a href="#" className="fd-btn w-25 text-center">UPDATE PRODUCT</a></div>
    </form>
  )

}

const ListOfProducts = ({setProduct, setPage} : {setProduct : Function, setPage : Function}) => {

  const parseProduct = (product : ProductType) => {
    setProduct(product);
    setPage('add');
  }

  const {isLoading, data : productsList, isSuccess, isError} =  useGetAllProductsQuery('api/products');

  let content : React.ReactNode;

  content = isLoading || isError 
  ? null
  : isSuccess 
    ? productsList['data'].map((product : ProductType) => {
      
      return (
        <tr className="p-3" key={product.id}>
          <td scope="row w-25"><img src={link(product.img)} alt={product.name} style={{ width: '50px', height: '50px' }} /></td>
          <td className='fw-bold'>{product.name}</td>
          <td>{product.price}</td>
          <td>{45}</td>
          <td className='fw-bold d-flex gap-2 justify-content-center'>
            
            <a href="#" className='p-2 rounded-2 fd-bg-primary' onClick={(e) => parseProduct(product)} title='View Product'><i className="bi bi-eye"></i></a>
            <a href="#" className='p-2 rounded-2 bg-secondary' onClick={(e) => parseProduct(product)} title='Edit'><i className="bi bi-pen"></i></a>
            <a href="#" className='p-2 rounded-2 bg-danger' title='Delete'><i className="bi bi-trash"></i></a>
          </td>
        </tr>
      )
    })
    : null;



  return (
    <div className="table-responsive">
      <table className="table table-default text-center table-bordered">
        <thead>
          <tr className='fd-bg-primary text-white'>
            <th scope="col" className='p-3'>IMAGE</th>
            <th scope="col" className='p-3'>PRODUCT NAME</th>
            <th scope="col" className='p-3'>PRICE</th>
            <th scope="col" className='p-3'>TOTAL STOCK</th>
            <th scope="col" className='p-3'>ACTION</th>
          </tr>
        </thead>
        <tbody>
          { content }
        </tbody>
      </table>
    </div>
  );
}

const ProductMain = () => {

  const [page, setPage] = useState('list');
  const [currentProduct, setCurrentProduct] = useState(null);

  const changeToList = () => { setPage('add'); setCurrentProduct(null) }
  const changeToAdd = () => { setPage('list'); }

  return (
    <div className='text-black'>
      <h4 className="fw-bold">Products</h4>
      <div className="add-product my-3 d-flex justify-content-end">
        {
          page === 'list' ?
            <a href="#" className="fd-btn bg-secondary w-25 text-center rounded-3" onClick={changeToList}>ADD PRODUCT</a> :
            <a href="#" className="fd-btn bg-secondary w-25 text-center rounded-3" onClick={changeToAdd}>PRODUCTS LIST</a>
        }
      </div>
      <div className="subPartMain">
        {page === 'list' ? <ListOfProducts setProduct={setCurrentProduct} setPage={setPage}/> : <AddOrEditProduct product={currentProduct} />}
      </div>
    </div>
  )
}

export default ProductMain