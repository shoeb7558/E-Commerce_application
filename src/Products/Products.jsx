// Products.js
import React from 'react';
import { Link } from 'react-router-dom';

function Products() {
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
        },
      ];

  return (
    <div>
      <h1>This is the products page</h1>
      <ul>
        {productsArr.map((item, index) => (
          <Link to={`/Products/${index}`} key={index}>
            <li>
              <span>{item.title}</span>
              
              <span>{item.price}</span>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default Products;
