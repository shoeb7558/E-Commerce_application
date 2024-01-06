// Header_ElementModule.js
// mport React, { useState } from 'react';i
import './Header_ElementModule.css';
import Cart from '../cart/Cart';
import { Link } from 'react-router-dom';



function Header_Element({ itemsincart, openCart, closeCart, isCartOpen,cartItems  }) {
  return (
    <>
      <div className='headerdiv'>

        <Link to='/home' className='labels'>
          Home
        </Link>
        <Link to='/' className='labels'>
          Store
        </Link>

        <Link to='/about' className='labels'>
          About
        </Link>
        <Link to='/ContactUs' className='labels'>
          Contact-US
        </Link>
        <Link to='/Products' className='labels'>
        Products
        </Link>
        <Link to='/SignIn' className='labels'>
        SignIn
        </Link>
        

        <button className='cartbutton' onClick={openCart}>
          Open Cart
        </button>
        <h2 className='itemh2'>{itemsincart}</h2>
        <Cart isOpen={isCartOpen} onClose={closeCart} cartItems={cartItems} />
      </div>
      <div className='headerdiv2'>
        <h1>The Generics</h1>
      </div>
    </>
  );
}

export default Header_Element;
