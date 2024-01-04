// CartModule.js
import React from 'react';
import './CartModule.css';

const Cart = ({ isOpen, onClose, cartItems }) => {
  return (
    <div className={`cart ${isOpen ? 'open' : ''} cartdiv`}>
      <h2>Shopping Cart</h2>
      {cartItems.length > 0 ? (
        cartItems.map((item, index) => (
          <div key={index} className='CartItem'>
            <h3>{item.title}</h3>
            <p>Price: ${item.price}</p>
            {/* <img src={item.imageUrl} alt={item.title} /> */}
          </div>
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
