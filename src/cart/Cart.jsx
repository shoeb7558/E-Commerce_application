import React, { useContext, useEffect } from 'react';
import './CartModule.css';
import AuthContext from '../storage/AuthContext';
import { Link } from 'react-router-dom';

const Cart = ({ isOpen, onClose, cartItems, setitemsincart }) => {
  const [selectedSize, setSelectedSize] = React.useState("");
  console.log('this is carts cart ', cartItems);
  const authContext = useContext(AuthContext);

  const handleSizeChange = (selectedSize) => {
    setSelectedSize(selectedSize); // Update the selected size
  };

  useEffect(() => {
    if (typeof setitemsincart !== 'function') {
      console.error('setitemsincart is not a function:', setitemsincart);
      return;
    }

    const itemCount = cartItems.length;
    setitemsincart(itemCount);

    authContext.updateItemCount(itemCount);

    localStorage.setItem("itemCount", itemCount);
  }, [cartItems, setitemsincart, authContext]);

  return (
    <div className={`cart ${isOpen ? 'open' : ''} cartdiv`}>
      <h2>Shopping Cart</h2>
      {cartItems.length > 0 ? (
        cartItems.map((item, index) => (
          <Link onClick={onClose} className='Linkstyle' to={`/Products/${index}`} key={index}>
          <div key={index} className='CartItem'>

            <img className='img1' src={item.Image} alt="Product Image" />
            <div className='datadiv'>
            <h3>{item.name}</h3>
            <p>Price:  ₹{item.price}</p>
            </div>
          
            
            
          </div>
          </Link>
        ))
      ) : (
        <p>Your cart is empty</p>
      )}
      <button className='close' onClick={onClose}>
        Close
      </button>
    </div>
  );
};

export default Cart;
