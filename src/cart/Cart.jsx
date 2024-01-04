// CartModule.js
import React from 'react';
import './CartModule.css';

const Cart = ({ isOpen, onClose, datatransfer }) => {
  return (
  
    <div className={`cart ${isOpen ? 'open' : ''} cartdiv`}>
      <h2>Shopping Cart</h2>
      {datatransfer.map((product, index) => (
        <div key={index} className='CartItem'>
          <h3>{product.title}</h3>
          <p>Price: ${product.price}</p>
          {/* Uncomment the following line when you have imageUrl */}
          <img src={product.imageUrl} alt={product.title} />
          {/* <button className='addtocartbutton'>Add To Cart</button> */}
        </div>
      ))}
      <button className='closecart' onClick={onClose}>Close</button>
    </div>
  
  );
};

export default Cart;
