import React from 'react';

const MovieDetails = ({ details }) => {
  const genres = details.EventGenre.split('|');
  return (
    <div>
      <h3>{details.EventName}</h3>
      <p>{details.EventLanguage}</p>
      <p>
        {genres.map(genre => (
          <span className="genre">{genre}</span>
        ))}
      </p>
      <p>{details.DispReleaseDate}</p>
    </div>
  );
};

export default MovieDetails;
