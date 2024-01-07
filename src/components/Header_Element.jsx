// Header_ElementModule.js
import React, { useContext } from 'react';
import './Header_ElementModule.css';
import Cart from '../cart/Cart';
import { Link } from 'react-router-dom';
import AuthContext from '../storage/AuthContext';

function Header_Element({ itemsincart, openCart, closeCart, isCartOpen, cartItems }) {
  const AuthCtx = useContext(AuthContext);

  const isLoggedIn = AuthCtx.isLoggedIn;

  return (
    <>
      <div className='headerdiv'>
        <Link to='/home' className='labels'>
          Home
        </Link>

        {isLoggedIn && (
          <>
            <Link to='/' className='labels'>
              Store
            </Link>

            <Link to='/Products' className='labels'>
              Products
            </Link>
          </>
        )}

        <Link to='/about' className='labels'>
          About
        </Link>
        <Link to='/ContactUs' className='labels'>
          Contact-US
        </Link>

        {!isLoggedIn && (
          <>
            <Link to='/SignIn' className='labels'>
              SignIn
            </Link>
            <Link to='/LogIn' className='labels'>
              Login
            </Link>
          </>
        )}

        {isLoggedIn && (
          <Link to='/changePass' className='labels'>
          Change-Password
        </Link>
        )}

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
