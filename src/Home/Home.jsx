import React, { useEffect, useState } from 'react';
import './HomeModule.css';
import AddMovies from './AddMovies';

function Home() {
  const [data, setdata] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setiserror] = useState(null);
  const [addeddata, setaddeddata] = useState([]);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://react-http-3e2dc-default-rtdb.firebaseio.com/Movies/${id}.json`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Something went wrong while deleting!');
      }

      // Remove the deleted movie from the local state
      setdata((prevData) => prevData.filter((movie) => movie.id !== id));
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const HandleAddMovie = async (newData) => {
    setaddeddata((prevData) => [...prevData, newData])
    const response = await fetch('https://react-http-3e2dc-default-rtdb.firebaseio.com/Movies.json', {
      method: 'POST',
      body: JSON.stringify(newData),
      headers: {
        'content-type': 'application/json'
      }
    });
    const responseData = await response.json();
    console.log(responseData);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setiserror(null);
      try {
        const response = await fetch('https://react-http-3e2dc-default-rtdb.firebaseio.com/Movies.json');
        if (!response.ok) {
          throw new Error('Something went wrong!');
        }
        const result = await response.json();
        // Convert the Firebase data object into an array of movies
        const moviesArray = result ? Object.keys(result).map((key) => ({ id: key, ...result[key] })) : [];
        setdata(moviesArray);
        console.log(moviesArray);
      } catch (error) {
        console.error('Error fetching data:', error);
        setiserror(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log(addeddata);
  }, [addeddata]);

  return (
    <div>
      <h1>This is the home page</h1>
      <AddMovies onsubmit={HandleAddMovie} />
      
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <ul>
          {data.map((film) => (
            <li key={film.id} className='movieslist'>
              <span><strong>{film.title}</strong></span>
              <span>{film.openingText}</span>
              <span>{film.releaseDate}</span> -
              <button className='deletebutton' onClick={() => handleDelete(film.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Home;
