import React, { useEffect, useState } from 'react';
import './HomeModule.css';
import AddMovies from './AddMovies';

function Home() {
  const [data, setdata] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setiserror] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setiserror(null);
      try {
        
        
        const response = await fetch('https://swapi.dev/api/films/');
        if(!response.ok){
          throw new Error('Somthing went wrong!')
        }
        const result = await response.json();

        setdata(result.results);
      } catch (error) {
        console.error('Error fetching data:', error);
        setiserror(error.message)
      } finally {
        setIsLoading(false); 
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <AddMovies />
      <h1>This is the home page</h1>
      {isLoading ? (
        <p>Loading...</p> // Show loader when data is being fetched
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <ul>
          {data.map((film, index) => (
            <li key={index} className='movieslist'>{film.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Home;
