// CardsModule.js
import React from 'react';
import './CardsModule.css';
import { Link } from 'react-router-dom';

function Cards({ datatransfer, addToCart }) {
  const addtocartbutton = (index) => {
    const selectedItem = datatransfer[index];
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
      {datatransfer.map((product, index) => (
        <div key={index} className='Carddiv'>
          <Link className='Linkstyle' to={`/Products/${index}`} key={index}>
            <img src={product.Image} alt={product.title} />
          </Link>
          <h2 className='titleproduct'>{product.name}</h2>
          <div className='innerdiv'>
            <p>₹ {product.price}</p>
            <button className='addtocartbutton' onClick={() => addtocartbutton(index)}>
              Add To Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Cards;
