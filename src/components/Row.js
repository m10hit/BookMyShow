import React, { useState, useEffect } from 'react';
import axios from '../axios';

const Row = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const result = await axios.get('m6/static/interview-mock/data.json');
      console.log(result);
      return result;
    }
    fetchData();
  }, []);
  return (
    <div>
      <h1>BookMyShow Clone</h1>
    </div>
  );
};

export default Row;
