import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Row = () => {
  const [languages, setLanguages] = useState([]);
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const result = await axios.get(
        'https://peaceful-forest-62260.herokuapp.com/ '
      );
      console.log(result);
      const moviesArray = Object.entries(result.data.moviesData).map(item => ({
        [item[0]]: item[1],
      }));

      const movieDetails = moviesArray.map(movie => {
        for (let prop in movie) {
          return movie[prop];
        }
      });
      setMovies(movieDetails);
      setLanguages(result.data.languageList);
      return result;
    }
    fetchData();
  }, []);

  return (
    <div className="row">
      <h1>BookMyShow Clone</h1>
      <div className="row__posters">
        {movies.map(movie => (
          <img
            className="row__poster"
            src={movie.EventImageUrl}
            alt={movie.EventName}
          />
        ))}
      </div>
    </div>
  );
};

export default Row;
