import React, { useState } from 'react';
import './catagory_module.css'; // Import your CSS file

function catagory() {
  const [categories, setCategories] = useState({
    men: false,
    women: false,
    children: false,
    gymWear: false,
    winterWear: false,
    nightwear: false
  });

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCategories(prevState => ({
      ...prevState,
      [name]: checked
    }));
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(prevState => !prevState);
  };

  return (
    <div className="container">
      
        <button className="hamburger-button" onClick={toggleMenu}>
          ☰ {/* You can use any hamburger icon here */}
        </button>
        {isOpen && (
          <div className="menu-content">
            <label>
              <input
                type="checkbox"
                name="men"
                checked={categories.men}
                onChange={handleCheckboxChange}
              />
              Men
            </label>
            <label>
              <input
                type="checkbox"
                name="women"
                checked={categories.women}
                onChange={handleCheckboxChange}
              />
              Women
            </label>
            <label>
              <input
                type="checkbox"
                name="children"
                checked={categories.children}
                onChange={handleCheckboxChange}
              />
              Children
            </label>
            <label>
              <input
                type="checkbox"
                name="gymWear"
                checked={categories.gymWear}
                onChange={handleCheckboxChange}
              />
              Gym Wear
            </label>
            <label>
              <input
                type="checkbox"
                name="winterWear"
                checked={categories.winterWear}
                onChange={handleCheckboxChange}
              />
              Winter Wear
            </label>
            <label>
              <input
                type="checkbox"
                name="nightwear"
                checked={categories.nightwear}
                onChange={handleCheckboxChange}
              />
              Nightwear
            </label>
          </div>
        )}
      </div>
    
  );
}

export default catagory;
