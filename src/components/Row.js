import React, { useState, useEffect, Fragment } from 'react';
import YouTubeEmbed from './YoutubeEmbed';
import axios from 'axios';

const Row = () => {
  const [languages, setLanguages] = useState([]);
  const [movies, setMovies] = useState([]);
  const [trailer, setTrailer] = useState('');
  useEffect(() => {
    async function fetchData() {
      const result = await axios.get(
        'https://peaceful-forest-62260.herokuapp.com/ '
      );
      console.log(result);
      const moviesArray = Object.entries(result.data.moviesData).map(item => ({
        [item[0]]: item[1],
      }));
      console.log(moviesArray);
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
  const trailerImageClickHandler = url => {
    const embedId = url.split('=');
    if (trailer === embedId[1]) {
      setTrailer('');
    } else {
      setTrailer(embedId[1]);
    }
  };
  return (
    <div className="row">
      <nav className="navbar">
        <div className="navbar-left">
          <h1>Movie Trailers</h1>
          <button>Coming Soon</button>
          <button>Now Showing</button>
        </div>
        <div className="navbar-right">
          <select name="category">
            <option value="fresh">Fresh</option>
            <option value="popular">Popular</option>
          </select>
          <select name="language">
            {languages.map(language => (
              <option key={language} value={language}>
                {language}
              </option>
            ))}
          </select>
        </div>
      </nav>
      {trailer && <YouTubeEmbed videoId={trailer} />}
      <div className="row__posters">
        {movies.map(movie => (
          <div className="movie__block" key={movie.EventCode}>
            <img
              className="row__poster"
              src={movie.EventImageUrl}
              alt={movie.EventName}
              onClick={() => trailerImageClickHandler(movie.TrailerURL)}
            />
            <p>{movie.EventTitle}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Row;
