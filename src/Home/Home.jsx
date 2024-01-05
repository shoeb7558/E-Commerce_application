import React, { useEffect, useState } from 'react';
import './HomeModule.css';

function Home() {
  const [data, setdata] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true); // Set isLoading to true while fetching data
        const response = await fetch('https://swapi.dev/api/films/');
        const result = await response.json();

        setdata(result.results);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false); // Set isLoading to false once data is fetched
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>This is the home page</h1>
      {isLoading ? (
        <p>Loading...</p> // Show loader when data is being fetched
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
