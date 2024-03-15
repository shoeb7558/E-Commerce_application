import React, { useContext, useState } from 'react';
import './Header_ElementModule.css';
import Cart from '../cart/Cart';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../storage/AuthContext';
import logo from './logo.png';


function Header_Element({ itemsincart, openCart, closeCart, isCartOpen, cartItems, setitemsincart }) {
    const AuthCtx = useContext(AuthContext);
    const Navigate = useNavigate();
    let isAdmin = false; // Default value for isAdmin
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    // Check if the email is available in the local storage
    const userEmail = localStorage.getItem("email");
    if (userEmail && userEmail !== "null") {
        const useremail = userEmail.replace(/[@.]/g, "");
        isAdmin = useremail === 'shoeb9530gmailcom';
    }

    const logoutHandler = () => {
        AuthCtx.logout();
        Navigate('/LogIn');
    };

    const toggleSettings = () => {
        setIsSettingsOpen(prevState => !prevState);
    };

    const handleCartButtonClick = () => {
        openCart();
    };

    return (
        <div className='headerdiv'>
            <div className='outerheader'>
                <div className='imagediv'>
                <img className='logoimage' src={logo} alt='vita_logo'></img>
                </div>
                <Link to='/' className='labels'>
                    Store
                </Link>
                <Link to='/' className='labels'>
                    man
                </Link>
                <Link to='/' className='labels'>
                    women
                </Link>
                {AuthCtx.isLoggedIn && (
                    <>
                    <Link to='/myorders' className='labels'>
                        My Orders
                        </Link>
                    </>
                )

                }
                
                
                {isAdmin && (
                    <>
                        <Link to='/Orders' className='labels'>
                            Orders
                        </Link>
                        <Link to='/ProductsForm' className='labels'>
                            Products Form
                        </Link>
                    </>
                )}
                </div>
                <div className="dropdown">
                    <button className="dropbtn" onClick={toggleSettings}>Settings</button>
                    {isSettingsOpen && (
                        <div className="dropdown-content">
                            {AuthCtx.isLoggedIn ? (
                                <>
                                    <Link to='/changePass' className='labels'>
                                        Change Password
                                    </Link>
                                    <button onClick={logoutHandler} className='labels'>
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link to='/SignIn' className='labels'>
                                        Sign In
                                    </Link>
                                    <Link to='/LogIn' className='labels'>
                                        Login
                                    </Link>
                                </>
                            )}
                        </div>
                    )}
                </div>
            
            {/* Cart button */}
            <button onClick={handleCartButtonClick} className='cartbutton'>Cart</button>
            {AuthCtx.isLoggedIn && <Cart isOpen={isCartOpen} onClose={closeCart} cartItems={cartItems} setitemsincart={setitemsincart} />}
        </div>
    );
}

export default Header_Element;
