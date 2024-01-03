import React from 'react'
import './Header_ElementModule.css'

function Header_Element() {
  return (
    <>
      <div className='headerdiv'>
        <label  className='labels'>Home</label>
        <label className='labels' >Store</label>
        <label className='labels'>About</label>
        <button className='cartbutton'>Cart</button>
      </div>
      <div className='headerdiv2'>
        <h1>The Generics</h1>
      </div>
    </>
  )
}

export default Header_Element
