// CardsModule.js
import React from 'react';
import './CardsModule.css';
import { Link } from 'react-router-dom';

function Cards({ datatransfer, addToCart }) {
  const addtocartbutton = (product) => {
    const selectedItem = product;
    
    const selectedSizes = Object.entries(selectedItem.sizes)
      .filter(([size, available]) => available) // Filter out sizes that are true
      .reduce((acc, [size]) => {
        acc[size] = true;
        return acc;
      }, {});
    const itemWithSelectedSizes = { ...selectedItem, sizes: selectedSizes };
    addToCart(itemWithSelectedSizes);
  };

  return (
    <div className='CardDiv0'>
      {datatransfer.map((product) => (
        <div key={product.id} className='Carddiv'>
          <Link className='Linkstyle' to={`/Products/${product.id}`} >
            <img src={product.Image} alt={product.title} />
          </Link>
          <h2 className='titleproduct'>{product.name}</h2>
          
          <div className='innerdiv'>
            <div style={{display:'grid'}}>
              
          <p> {product.Sex}</p>
            <p>₹ {product.price}</p>
            </div>
            <button className='addtocardbutton' onClick={() => addtocartbutton(product)}>
              Add To Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Cards;
