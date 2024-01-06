import React, { useState } from 'react';
import './AddMoviesModule.css'

const AddMovies = () => {
  const [title, setTitle] = useState('');
  const [openingText, setOpeningText] = useState('');
  const [releaseDate, setReleaseDate] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform actions with the form data, e.g., send it to an API
    console.log('Submitted:', { title, openingText, releaseDate });

    setTitle('')
    setOpeningText('')
    setReleaseDate('')
  };

  return (
    <form onSubmit={handleSubmit} className='form1'>
      <label>
        Title:</label>
        <input className='input1' 
          type="text"
          placeholder='title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      
      <br />
      <label>
        Opening Text:</label>
        <textarea className='textarea1'
         
          value={openingText}
          onChange={(e) => setOpeningText(e.target.value)}
          required
        />
      
      <br />
      <label>
        Release Date:</label>
        <input
          className='input2'
          type="date"
          value={releaseDate}
          onChange={(e) => setReleaseDate(e.target.value)}
          required
        />
      
      <br />
      <button className='submitbutton'  type="submit">Submit</button>
    </form>
  );
};

export default AddMovies;
