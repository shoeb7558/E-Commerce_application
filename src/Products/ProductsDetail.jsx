import React, {useState} from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetail_module.css';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../cart/cartSlice';
import UserInfo from './UserInfo';

function ProductsDetail({ productsArr, addToCart }) {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const product = productsArr[productId];
  const [selectedSize, setSelectedSize] = React.useState(""); // State to store the selected size
  const [orderClicked, setOrderClicked] = useState(false); // State to indicate "Order Now" clicked
  const [productInfo, setProductInfo] = useState(null);

  const addtocartbutton = (item) => {
    dispatch(addItemToCart(item)); // Dispatching the Redux action
    const selectedItem = productsArr[item];
    addToCart(selectedItem);
  };

  const handleSizeChange = (selectedSize) => {
    setSelectedSize(selectedSize); // Update the selected size
  };

  const orderitem = async (item) => {
    setOrderClicked(true); // Set the state to indicate "Order Now" clicked
    setProductInfo(item);


    const useremail = localStorage.getItem("email").replace(/[@.]/g, "");
    if (useremail) {
      try {
        const selectedSizeItem = {
          name: item.name,
          price: item.price,
          Image: item.Image,
          size: selectedSize // Only store the selected size
        };
  
        // const response = await fetch(`https://react-http-3e2dc-default-rtdb.firebaseio.com/order.json`, {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify(selectedSizeItem),
        // });
        
  
        // if (!response.ok) {
        //   throw new Error('Failed to place order');
        // }
        const myorder = await fetch(`https://react-http-3e2dc-default-rtdb.firebaseio.com/orders/${useremail}.json`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(selectedSizeItem),
        });
        
  
        if (!myorder.ok) {
          throw new Error('Failed to place order');
        }
  
        console.log('Order placed successfully');
      } catch (error) {
        console.error('Error placing order:', error);
      }
    }
  };
  

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div className='detaildiv'>
      <h1>Product Detail</h1>
      
      <div className='detaildiv2'>
        <img className='productdetailimg' src={product.Image} alt={product.name} />
        <div className='detaildiv4'>
        <div className='detaildiv3'>
        <p>Title: {product.name}</p>
          <p> Price: ₹{product.price}</p>
          <p>Available Sizes:</p>
          <div>
            {Object.entries(product.sizes).map(([size, available]) => (
              available && (
                <label key={size}>
                  <input
                    type="radio"
                    name="size"
                    value={size}
                    checked={selectedSize === size}
                    onChange={() => handleSizeChange(size)}
                  />
                  {size}
                </label>
              )
            ))}
          </div>
          
        </div>
        <div className='detaildivbuttons'>
        <button className='addtocartbutton' onClick={() => addtocartbutton(product)}>
          Add To Cart
        </button>
        <button className='addtocartbutton' onClick={() => orderitem(product)}>Order Now</button>
        </div>
        </div>
      </div>
      {orderClicked && productInfo && (
        <UserInfo productInfo={productInfo} /> // Pass product information to UserInfo component
      )}
    </div>
  );
}

export default ProductsDetail;
