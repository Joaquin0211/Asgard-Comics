import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8080/api';

// ============ COMICS API ============
export const getComics = async (params = {}) => {
  const url = `${API_BASE}/comics`;
  const { data } = await axios.get(url, { params });
  return data;
};

export const getComicById = async (id) => {
  const { data } = await axios.get(`${API_BASE}/comics/${id}`);
  return data;
};

export const searchComicsByTitle = async (title) => {
  const { data } = await axios.get(`${API_BASE}/comics/search/title`, { 
    params: { title } 
  });
  return data;
};

export const searchComicsByAuthor = async (author) => {
  const { data } = await axios.get(`${API_BASE}/comics/search/author`, { 
    params: { author } 
  });
  return data;
};

export const getBestSellingComics = async (limit = 10) => {
  const { data } = await axios.get(`${API_BASE}/comics/bestsellers`, { 
    params: { limit } 
  });
  return data;
};

export const getRecommendedComics = async (limit = 5) => {
  const { data } = await axios.get(`${API_BASE}/comics/recommended`, { 
    params: { limit } 
  });
  return data;
};

export const getComicsOnSale = async (maxPrice) => {
  const { data } = await axios.get(`${API_BASE}/comics/sale`, { 
    params: { maxPrice } 
  });
  return data;
};

export const getNewComics = async (limit = 8) => {
  const { data } = await axios.get(`${API_BASE}/comics/new`, { 
    params: { limit } 
  });
  return data;
};

export const createComic = async (comicData) => {
  const { data } = await axios.post(`${API_BASE}/comics`, comicData);
  return data;
};

export const updateComic = async (id, comicData) => {
  const { data } = await axios.put(`${API_BASE}/comics/${id}`, comicData);
  return data;
};

export const deleteComic = async (id) => {
  await axios.delete(`${API_BASE}/comics/${id}`);
};

// ✨ NUEVOS ENDPOINTS
export const getComicsByPriceRange = async (minPrice, maxPrice) => {
  const { data } = await axios.get(`${API_BASE}/comics/price-range`, {
    params: { minPrice, maxPrice }
  });
  return data;
};

export const getInventoryStats = async () => {
  const { data } = await axios.get(`${API_BASE}/comics/stats`);
  return data;
};

// ============ CART API ============
export const getCart = async (userId) => {
  const { data } = await axios.get(`${API_BASE}/cart/user/${userId}`);
  return data;
};

export const addToCart = async (userId, comicId, quantity = 1) => {
  const { data } = await axios.post(`${API_BASE}/cart/add`, null, {
    params: { userId, comicId, quantity }
  });
  return data;
};

export const updateCartQuantity = async (userId, comicId, quantity) => {
  const { data } = await axios.put(`${API_BASE}/cart/update`, null, {
    params: { userId, comicId, quantity }
  });
  return data;
};

export const removeFromCart = async (userId, comicId) => {
  await axios.delete(`${API_BASE}/cart/remove`, {
    params: { userId, comicId }
  });
};

export const clearCart = async (userId) => {
  await axios.delete(`${API_BASE}/cart/clear/${userId}`);
};

export const getCartItemCount = async (userId) => {
  const { data } = await axios.get(`${API_BASE}/cart/count/${userId}`);
  return data;
};

// ============ USER API ============
export const loginUser = async (email, password) => {
  const { data } = await axios.post(`${API_BASE}/auth/login`, {
    email,
    password
  });
  return data;
};

export const registerUser = async (userData) => {
  const { data } = await axios.post(`${API_BASE}/auth/register`, userData);
  return data;
};

// ============ UTILITIES ============
export const handleApiError = (error) => {
  if (error.response) {
    console.error('API Error:', error.response.data);
    return error.response.data.message || 'Error en el servidor';
  } else if (error.request) {
    console.error('Network Error:', error.request);
    return 'Error de conexión';
  } else {
    console.error('Error:', error.message);
    return 'Error inesperado';
  }
};
