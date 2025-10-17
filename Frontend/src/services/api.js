import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8080/api';

export const getComics = async (params = {}) => {
  const url = `${API_BASE}/comics`;
  const { data } = await axios.get(url, { params });
  return data;
};
