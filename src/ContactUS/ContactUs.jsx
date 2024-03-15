import React, { useState } from 'react';
import './contactUSModule.css';
import { Link } from 'react-router-dom';

function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    description: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://react-http-3e2dc-default-rtdb.firebaseio.com/Issues.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Server error');
      }

      // Handle success, e.g., show a success message
      console.log('Form submitted successfully');
      alert('Form submitted successfully')
    } catch (error) {
      // Handle errors, e.g., show an error message
      console.error('Error submitting form:', error.message);
    }
    setFormData({
      name: '',
      email: '',
      description: '',
    });

  };


  return (
    <div>
      <div className='div2'>
        <form className='form1' onSubmit={handleSubmit}>
          <label htmlFor="name" className='Labels1'>
            Name
          </label>
          <input
            id="name"
            placeholder="Name"
            className='input1'
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="email" className='Labels1'>
            E-Mail
          </label>
          <input
            id="email"
            placeholder="E-Mail"
            className='input1'
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="description" className='Labels1'>
            Description
          </label>
          <textarea
            id="description"
            placeholder="Description"
            className='input1'
            value={formData.description}
            onChange={handleChange}
            required
          />
          <button type="submit" className='submitbutton'>
            Submit
          </button>
        </form>
        
      </div>
    </div>
  );
}

export default ContactUs;
