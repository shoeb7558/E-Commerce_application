// ProductsDetail.js
import React from 'react';
import { useParams } from 'react-router-dom';

function ProductsDetail({ productsArr }) {
  const { productId } = useParams();

  // Assuming productsArr is available or fetched
  const product = productsArr[productId];

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div>
      <h1>This is the detail of the product</h1>
      <p>Title: {product.title}</p>
      <img src={product.imageUrl}/>
      <p>Price: {product.price}</p>
    </div>
  );
}

export default ProductsDetail;
