import React, { useContext, useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header_Element from './components/Header_Element';
import AuthContext, {AuthContextProvider} from './storage/AuthContext';

// Lazy loading for other components
const About = lazy(() => import('./About/About'));
const Home = lazy(() => import('./Home/Home'));
const Cards = lazy(() => import('./Cards/Cards'));
const ContactUs = lazy(() => import('./ContactUS/ContactUs'));
const Products = lazy(() => import('./Products/Products'));
const SignInForm = lazy(() => import('./Auth/SignIn'));
const LoginForm = lazy(() => import('./Auth/Login'));
const ChangePassword = lazy(() => import('./Auth/ChangePassword'));
const Cart = lazy(() => import('./cart/Cart'));

// Lazy loading for ProductsDetail
const ProductsDetail = lazy(() => import('./Products/ProductsDetail'));




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
            {/* Lazy-loaded routes for other components */}
            <Route path="/about" element={<Suspense fallback={<div>Loading...</div>}><About /></Suspense>} />
            <Route path="/" element={<Suspense fallback={<div>Loading...</div>}><Home /></Suspense>} />
            <Route path="/ContactUS" element={<Suspense fallback={<div>Loading...</div>}><ContactUs /></Suspense>} />
            <Route path='/store' element={<Suspense fallback={<div>Loading...</div>}><Cards datatransfer={productsArr} addToCart={addToCart} /></Suspense>} />
            <Route path='/Products' element={<Suspense fallback={<div>Loading...</div>}><Products productsArr={productsArr} /></Suspense>} />

            {/* Lazy-loaded route for ProductsDetail */}
            <Route
              path='/Products/:productId'
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <ProductsDetail productsArr={productsArr} />
                </Suspense>
              }
            />

            <Route path='/changePass' element={<Suspense fallback={<div>Loading...</div>}><ChangePassword /></Suspense>} />
            {!authCtx.isLoggedIn && (
              <>
                <Route path="/SignIn" element={<Suspense fallback={<div>Loading...</div>}><SignInForm /></Suspense>} />
                <Route path="/LogIn" element={<Suspense fallback={<div>Loading...</div>}><LoginForm /></Suspense>} />
              </>
            )}

            <Route path="/cart" element={<Suspense fallback={<div>Loading...</div>}><Cart cartItems={cartItems} /></Suspense>} />
          </Routes>
        </div>
      </Router>
    </AuthContextProvider>
  );
}

export default App;





