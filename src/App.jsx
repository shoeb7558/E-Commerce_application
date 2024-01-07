// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header_Element from './components/Header_Element';
import About from './About/About';
import Home from './Home/Home';
import Cards from './Cards/Cards';
import ContactUs from './ContactUS/ContactUs';
import Products from './Products/Products';
import ProductsDetail from './Products/ProductsDetail';
import SignInForm from './Auth/SignIn';
import LoginForm from './Auth/Login';

function App() {
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

  const [isCartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [itemsincart, setitemsincart] = useState(0);

  const openCart = () => {
    setCartOpen(true);
  };

  const closeCart = () => {
    setCartOpen(false);
  };

  const addToCart = (item) => {
    setCartItems((prevItems) => [...prevItems, item]);
    setitemsincart(itemsincart + 1);
  };

  return (
    <Router>
      <div>
        <Header_Element
          datatransfer={productsArr}
          addToCart={addToCart}
          itemsincart={itemsincart}
          openCart={openCart}
          closeCart={closeCart}
          isCartOpen={isCartOpen}
          cartItems={cartItems}
          
        />
        
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Cards datatransfer={productsArr} addToCart={addToCart} /> }/>
          <Route path="/ContactUS" element={<ContactUs/>}/>
          <Route path="/Products" element={<Products productsArr={productsArr} />} />
          <Route path="/Products/:productId" element={<ProductsDetail productsArr={productsArr} />} />
          <Route path="/SignIn" element={<SignInForm/>}/>
          <Route path="/LogIn" element={<LoginForm/>}/>
        </Routes>
        {/* <Cards datatransfer={productsArr} addToCart={addToCart} /> */}
      </div>
    </Router>
  );
}

export default App;





