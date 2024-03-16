import React, { useState, useEffect } from 'react';
import './CardsModule.css';
import { Link } from 'react-router-dom';

function Men({ addToCart }) {
  const [menData, setMenData] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://react-http-3e2dc-default-rtdb.firebaseio.com/products_item.json');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        console.log('Fetched data:', data); // Log the data here to inspect its structure
  
        // Check if data is an object and has keys
        if (typeof data === 'object' && Object.keys(data).length > 0) {
          // Assuming each key in the object represents an item, convert it into an array
          const dataArray = Object.keys(data).map(key => data[key]);
          // Filter out items where sex equals 'male'
          const maleData = dataArray.filter(item => item.Sex === 'male');
          setMenData(maleData);
        } else {
          console.error('Data is not in the expected format');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);
  




  const addtocartbutton = (index) => {
    const selectedItem = menData[index];
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
      {menData.map((product, index) => (
        <div key={index} className='Carddiv'>
          <Link className='Linkstyle' to={`/Products/${index}`} key={index}>
            <img src={product.Image} alt={product.title} />
          </Link>
          <h2 className='titleproduct'>{product.name}</h2>
          <div className='innerdiv'>
            <p>₹ {product.price}</p>
            <button className='addtocardbutton' onClick={() => addtocartbutton(index)}>
              Add To Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Men;
