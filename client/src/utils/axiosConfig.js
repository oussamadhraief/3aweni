import axios from 'axios';

console.log(process.env.REACT_APP_API_URL);
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000/',
});

export default axiosInstance;