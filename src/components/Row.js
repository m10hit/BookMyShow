import React, { useState, useEffect, Fragment } from 'react';
import YouTubeEmbed from './YoutubeEmbed';
import MovieDetails from './MovieDetails';
import axios from 'axios';

const Row = () => {
  const [languages, setLanguages] = useState([]);
  const [movies, setMovies] = useState([]);
  const [trailer, setTrailer] = useState('');
  const [selectedMovie, setSelectedMovie] = useState();
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const result = await axios.get(
        'https://peaceful-forest-62260.herokuapp.com/ '
      );
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
      const genreList = [];

      movieDetails.forEach(movieDetail => {
        const splitGenre = movieDetail.EventGenre.split('|');
        splitGenre.forEach(genre => {
          if (!genreList.includes(genre)) {
            genreList.push(genre);
          }
        });
      });
      setGenres(genreList);
      return result;
    }
    fetchData();
  }, []);

  const trailerImageClickHandler = (url, index) => {
    const embedId = url.split('=');
    if (trailer === embedId[1]) {
      setTrailer('');
    } else {
      setTrailer(embedId[1]);
    }
    setSelectedMovie(movies[index]);
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
          <select name="genre">
            {genres.map(genre => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>
      </nav>
      <div className="trailer-container">
        {trailer && <YouTubeEmbed videoId={trailer} />}
        {trailer && <MovieDetails details={selectedMovie} />}
      </div>
      <div className="row__posters">
        {movies.map((movie, index) => (
          <div className="movie__block" key={movie.EventCode}>
            <img
              className="row__poster"
              src={movie.EventImageUrl}
              alt={movie.EventName}
              onClick={() => trailerImageClickHandler(movie.TrailerURL, index)}
            />
            <p>{movie.EventTitle}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Row;
