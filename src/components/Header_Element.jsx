import React from 'react'
import './Header_ElementModule.css'
import Cart from '../cart/Cart';
import { useState } from 'react';

function Header_Element() {
  const productsArr = [

    {
    
    title: 'Colors',
    
    price: 100,
    
    imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%201.png',
    
    },
    
    {
    
    title: 'Black and white Colors',
    
    price: 50,
    
    imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%202.png',
    
    },
    
    {
    
    title: 'Yellow and Black Colors',
    
    price: 70,
    
    imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%203.png',
    
    },
    
    {
    
    title: 'Blue Color',
    
    price: 100,
    
    imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%204.png',
    
    }
    
    ]
  const [isCartOpen, setCartOpen] = useState(false);

  const openCart = () => {
    setCartOpen(true);
  };

  const closeCart = () => {
    setCartOpen(false);
  };

  return (
    <>
      <div className='headerdiv'>
        <label  className='labels'>Home</label>
        <label className='labels' >Store</label>
        <label className='labels'>About</label>
        <button className='cartbutton' onClick={openCart}>Open Cart</button>
        <Cart isOpen={isCartOpen} onClose={closeCart} datatransfer={productsArr}/>
      </div>
      <div className='headerdiv2'>
        <h1>The Generics</h1>
      </div>
    </>
  )
}

export default Header_Element
