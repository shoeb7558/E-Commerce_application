import React, { useEffect, useState } from 'react';
import './HomeModule.css';

function Home() {
  const [data, setdata] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://swapi.dev/api/films/');
        const result = await response.json();

        setdata(result.results);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>This is the home page</h1>
      <ul>
        {data.map((film, index) => (
          <li key={index} className='movieslist'>{film.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
