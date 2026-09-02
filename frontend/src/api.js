import axios from 'axios';
export const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api' });
export const messageFrom = (error) => error.response?.data?.message || 'Something went wrong. Please try again.';
