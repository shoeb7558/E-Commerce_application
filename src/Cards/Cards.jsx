import React from 'react'
import './CardsModule.css'

function Cards({datatransfer}) {
  return (
    <>
    <div className='CardDiv0' >
    
      {datatransfer.map((product, index) => (
        <div key={index} className='Carddiv'>
          <h2>{product.title}</h2>
          <img src={product.imageUrl} alt={product.title} />
          
          <p>Price: ${product.price}</p>
          <button className='addtocartbutton'>Add To Cart</button>
        </div>
      ))}
    </div>
      
    </>
  )
}

export default Cards;
