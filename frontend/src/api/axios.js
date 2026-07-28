import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || 'https://gharstay-1.onrender.com/api/v1';

export default axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});