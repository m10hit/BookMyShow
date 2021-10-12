import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://in.bmscdn.com/',
});

export default instance;
