import React from 'react';
import './CardsModule.css';

function Cards({ datatransfer, addToCart }) {
  const addtocartbutton = (index) => {
    const selectedItem = datatransfer[index];
    console.log(selectedItem);
    
    addToCart(selectedItem);
  };

  return (
    <>
      <div className='CardDiv0'>
        {datatransfer.map((product, index) => (
          <div key={index} className='Carddiv'>
            <h2>{product.title}</h2>
            <img src={product.imageUrl} alt={product.title} />
            <p>Price: ${product.price}</p>
            <button className='addtocartbutton' onClick={() => addtocartbutton(index)}>
              Add To Cart
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default Cards;
