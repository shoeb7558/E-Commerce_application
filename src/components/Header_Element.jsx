// Header_ElementModule.js
import React, { useState} from 'react';
import './Header_ElementModule.css';
import Cart from '../cart/Cart';
import Cards from '../Cards/Cards';
import {Link} from 'react-router-dom'



function Header_Element({ datatransfer }) {
  const [isCartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [itemsincart, setitemsincart] = useState(0)

  const openCart = () => {
    setCartOpen(true);
  };

  const closeCart = () => {
    setCartOpen(false);
  };

  const addToCart = (item) => {
    setCartItems((prevItems) => [...prevItems, item]);
    setitemsincart(itemsincart + 1)
  };

  return (
    <>
   
      <div className='headerdiv'>
        <label className='labels'>Home</label>
        <label className='labels'>Store</label>
        
        <Link to='/about' className='labels'>
          About
        </Link>
        
        <button className='cartbutton' onClick={openCart}>
          Open Cart
        </button>
        <h2>{itemsincart}</h2>
        <Cart isOpen={isCartOpen} onClose={closeCart} cartItems={cartItems} />
      </div>
      <div className='headerdiv2'>
        <h1>The Generics</h1>
      </div>
      <div>
        <Cards datatransfer={datatransfer} addToCart={addToCart} />
      </div>
    </>
  );
}

export default Header_Element;
