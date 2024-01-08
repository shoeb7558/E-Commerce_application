// App.js
import React, { useContext, useState, useEffect } from 'react';
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
import AuthContext, { AuthContextProvider } from './storage/AuthContext';
import ChangePassword from './Auth/ChangePassword';
import Cart from './cart/Cart';




function App() {
  const authCtx = useContext(AuthContext);
  
  
 
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

  const openCart = async () => {
    setCartOpen(true);
  
  };

  const fetchCartData = async () => {
    const useremail = localStorage.getItem("email").replace(/[@.]/g, "");
    if (useremail) {
      try {
        const response = await fetch(`https://crudcrud.com/api/632fc692a00b4e1b9f9e58a7996e0310/${useremail}`);
        if (response.ok) {
          const data = await response.json();
          console.log(data)
          setCartItems((prevCartItems) => [...prevCartItems, ...data[0]?.cartItems]);
        } else {
          console.error('Failed to fetch cart items:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    }
  };
  
  
  
  

  const closeCart = () => {
    setCartOpen(false);
  };

  const addToCart = (item) => {
    const useremail = localStorage.getItem("email").replace(/[@.]/g, "");
    console.log('useremail', useremail);
  
    // Include both existing cart items and the new item
    const updatedCartItems = [...cartItems, item];
  
    fetch(`https://crudcrud.com/api/632fc692a00b4e1b9f9e58a7996e0310/${useremail}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cartItems: updatedCartItems }),
    })
      .then(response => {
        console.log(response);
        if (!response.ok) {
          throw new Error(`Failed to add item to cart. Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Item added to cart successfully:', data);
        setCartItems(updatedCartItems);  // Update with both existing and new items
        setitemsincart(prevItemsInCart => prevItemsInCart + 1);
      })
      .catch(error => {
        console.error('Error adding item to cart:', error);
      });
  };
  
  
  
  
  
  useEffect(() => {
    // The initial fetch to get cart items when the component mounts
    
    fetchCartData();
  }, []);
 

  return (
    <AuthContextProvider>
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
          <Route path="/" element={<Home />} />
          <Route path="/ContactUS" element={<ContactUs/>}/>
          <Route path='/store' element={ <Cards datatransfer={productsArr} addToCart={addToCart} />} />
          <Route path='/Products' element={ <Products productsArr={productsArr} />}/>
          <Route path='/Products/:productId' element={<ProductsDetail productsArr={productsArr} />} />
          
            <Route path='/changePass' element={<ChangePassword/>}/>
          {!authCtx.isLoggedIn && (
            <>
             <Route path="/SignIn" element={<SignInForm/>}/>
            <Route path="/LogIn" element={<LoginForm/>}/>
            </>
          )}
           
           <Route path="/cart" element={<Cart cartItems={cartItems}/>}/>
         
        </Routes>
       
      
        
      </div>
    </Router>
    </AuthContextProvider>
  );
}

export default App;





