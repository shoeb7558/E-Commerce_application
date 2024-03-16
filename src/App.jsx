import React, { useContext, useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header_Element from './components/Header_Element';
import AuthContext from './storage/AuthContext';
import Catagory from './components/catagory';
import ProductsForm from './Products/productsForm';
// import myimage from './about/linkedin.jpg';
// import vitatshirt from './About/vita_logo.jpg'
import Orders from './Orders/orders';
import Men from './Cards/men';




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
const Myorders = lazy(() => import('./Orders/myorders'))

// Lazy loading for ProductsDetail
const ProductsDetail = lazy(() => import('./Products/ProductsDetail'));




function App() {
  
  const [productsArr, setProducts] = useState([]);
  
  
  
 
  // const  productsArr = [
  //   {
  //     title: 'Colors',
  //     price: 100,
  //     imageUrl: 'https://levi.in/cdn/shop/files/A78960001_01_Style_Shot_ce4efa74-c88d-48be-b733-a5a3e7900b8b.jpg?v=1701407630',
  //   },
  //   {
  //     title: 'Black and white Colors and yellow and brown and green',
  //     price: 50,
  //     imageUrl: 'https://d4kuloxg8pkbr.cloudfront.net/media/catalog/product/cache/8228bd1d031aed5cc3a1d911fc5424b7/1/_/1_mfk-9579-r-09-pink_5.jpg',
  //   },
  //   {
  //     title: 'Yellow and Black Colors',
  //     price: 70,
  //     imageUrl: myimage,
  //   },
  //   {
  //     title: 'Blue Color',
  //     price: 100,
  //     imageUrl: myimage,
  //   },
  //   {
  //     title: 'Colors',
  //     price: 100,
  //     imageUrl: myimage,
  //   },
  //   {
  //     title: 'Black and white Colors',
  //     price: 50,
  //     imageUrl: myimage,
  //   },
  //   {
  //     title: 'Yellow and Black Colors',
  //     price: 70,
  //     imageUrl: myimage,
  //   },
  //   {
  //     title: 'Blue Color',
  //     price: 100,
  //     imageUrl: myimage,
  //   },
  //   {
  //     title: 'Colors',
  //     price: 100,
  //     imageUrl: myimage,
  //   },
  //   {
  //     title: 'Black and white Colors',
  //     price: 50,
  //     imageUrl:myimage,
  //   },
  //   {
  //     title: 'Yellow and Black Colors',
  //     price: 70,
  //     imageUrl: myimage,
  //   },
  //   {
  //     title: 'Blue Color',
  //     price: 100,
  //     imageUrl: myimage,
  //   },
  // ];

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
        const response = await fetch(`https://react-http-3e2dc-default-rtdb.firebaseio.com/cart/${useremail}.json`);
        if (response.ok) {
          const data = await response.json();
         
          const cartItemsFromData = data ? Object.keys(data).map((key) => ({ id: key, ...data[key] })) : [];

        setCartItems(cartItemsFromData || []); // Set the cart items directly
        console.log('cart item fetched',cartItemsFromData)
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
    const selectedSizeItem = {
          name: item.name,
          price: item.price,
          Image: item.Image,
          
        };
  
    fetch(`https://react-http-3e2dc-default-rtdb.firebaseio.com/cart/${useremail}.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(selectedSizeItem),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to add item to cart. Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Item added to cart successfully:', data);
        
        // Update cartItems directly with the new item
        setCartItems(prevItems => [...prevItems, item]);
        
        // Update itemsincart count
        setitemsincart(prevCount => prevCount + 1);
      })
      .catch(error => {
        console.error('Error adding item to cart:', error);
      });
  };
  
 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://react-http-3e2dc-default-rtdb.firebaseio.com/products_item.json');
        if (!response.ok) {
          throw new Error('Something went wrong!');
        }
        const result = await response.json();
        
        // Convert the Firebase data object into an array of contacts
        const contacts = result ? Object.keys(result).map((key) => ({ id: key, ...result[key] })) : [];
        setProducts(contacts);
        // console.log(contacts);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        console.log('done');
      }
    };
  
    fetchData();
  }, []);
  
 
  
  
  useEffect(() => {
    // The initial fetch to get cart items when the component mounts
    
    fetchCartData();
  }, []);
  const authCtx = useContext(AuthContext);

  return (
    
    <Router>
      <>
        <Header_Element
          datatransfer={productsArr}
          addToCart={addToCart}
          itemsincart={itemsincart}
          openCart={openCart}
          closeCart={closeCart}
          isCartOpen={isCartOpen}
          cartItems={cartItems}
          setitemsincart={setitemsincart}
         
        />
        <div style={{display:'flex'}}>

        {/* <Catagory /> */}

      <div style={{ width:'100%' ,overflowY: 'auto', maxHeight: 'calc(100vh - 100px)' }}>
        <Routes>
          <Route path="/ProductsForm" element={<Suspense fallback={<div>Loading...</div>}><ProductsForm /></Suspense>} />
          <Route path="/Orders" element={<Suspense fallback={<div>Loading...</div>}><Orders /></Suspense>} />
          {/* Lazy-loaded routes for other components */}
          <Route path="/About" element={<Suspense fallback={<div>Loading...</div>}><About /></Suspense>} />
          <Route path="/Home" element={<Suspense fallback={<div>Loading...</div>}><Home /></Suspense>} />
          <Route path="/ContactUS" element={<Suspense fallback={<div>Loading...</div>}><ContactUs /></Suspense>} />

          {/* Check if the user is logged in before rendering these routes */}
          
            <>
              <Route path='/' element={<Suspense fallback={<div>Loading...</div>}><Cards datatransfer={productsArr} addToCart={addToCart} /></Suspense>} />
              <Route path='/Men' element={<Suspense fallback={<div>Loading...</div>}><Men  addToCart={addToCart} /></Suspense>} />
              {/* <Route path='/Products' element={<Suspense fallback={<div>Loading...</div>}><Products productsArr={productsArr} /></Suspense>} /> */}
            </>
        
            <Route
              path='/Products'
              element={<Navigate to="/LogIn" replace />} // Redirect to the login page if not logged in
            />
          

          {/* Lazy-loaded route for ProductsDetail */}
          <Route
            path='/Products/:productId'
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <ProductsDetail productsArr={productsArr}  addToCart={addToCart} />
              </Suspense>
            }
          />

          <Route path='/changePass' element={<Suspense fallback={<div>Loading...</div>}><ChangePassword /></Suspense>} />

          {!authCtx.isLoggedIn ? (
            <>
              <Route path="/SignIn" element={<Suspense fallback={<div>Loading...</div>}><SignInForm /></Suspense>} />
              <Route path="/LogIn" element={<Suspense fallback={<div>Loading...</div>}><LoginForm /></Suspense>} />
            </>
          ) :(
            <Route
            path='/LogIn'
            element={<Navigate to="/" replace />} // Redirect to the login page if not logged in
          />
          )}

           {authCtx.isLoggedIn && ( <Route path="/cart" element={<Suspense fallback={<div>Loading...</div>}><Cart cartItems={cartItems} setitemsincart={setitemsincart} /></Suspense>} />)}
           {authCtx.isLoggedIn && ( <Route path="/myorders" element={<Suspense fallback={<div>Loading...</div>}><Myorders  /></Suspense>}> </Route>)}

        </Routes>
        </div>
        </div>

      </>
    </Router>
  
  );
}

export default App;





