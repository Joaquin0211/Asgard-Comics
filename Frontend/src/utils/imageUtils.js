// Imágenes predeterminadas para diferentes categorías de productos
export const defaultImages = {
  // Cómics
  comic: [
    'https://via.placeholder.com/300x400/1E40AF/FFFFFF?text=COMIC',
    'https://via.placeholder.com/300x400/DC2626/FFFFFF?text=COMIC',
    'https://via.placeholder.com/300x400/059669/FFFFFF?text=COMIC',
    'https://via.placeholder.com/300x400/7C3AED/FFFFFF?text=COMIC',
    'https://via.placeholder.com/300x400/EA580C/FFFFFF?text=COMIC',
  ],
  
  // Mangas
  manga: [
    'https://via.placeholder.com/300x400/EF4444/FFFFFF?text=MANGA',
    'https://via.placeholder.com/300x400/F59E0B/FFFFFF?text=MANGA',
    'https://via.placeholder.com/300x400/10B981/FFFFFF?text=MANGA',
    'https://via.placeholder.com/300x400/8B5CF6/FFFFFF?text=MANGA',
  ],
  
  // Figuras
  figura: [
    'https://via.placeholder.com/300x400/6366F1/FFFFFF?text=FIGURA',
    'https://via.placeholder.com/300x400/EC4899/FFFFFF?text=FIGURA',
    'https://via.placeholder.com/300x400/14B8A6/FFFFFF?text=FIGURA',
    'https://via.placeholder.com/300x400/F97316/FFFFFF?text=FIGURA',
  ],
  
  // TCG/Cartas
  tcg: [
    'https://via.placeholder.com/300x400/3B82F6/FFFFFF?text=TCG',
    'https://via.placeholder.com/300x400/EF4444/FFFFFF?text=TCG',
    'https://via.placeholder.com/300x400/10B981/FFFFFF?text=TCG',
    'https://via.placeholder.com/300x400/F59E0B/FFFFFF?text=TCG',
  ],
  
  // Merchandising
  merchandising: [
    'https://via.placeholder.com/300x400/6B7280/FFFFFF?text=MERCH',
    'https://via.placeholder.com/300x400/DC2626/FFFFFF?text=MERCH',
    'https://via.placeholder.com/300x400/059669/FFFFFF?text=MERCH',
    'https://via.placeholder.com/300x400/7C3AED/FFFFFF?text=MERCH',
  ]
};

// Función para obtener una imagen aleatoria según la categoría
export const getRandomImage = (category = 'comic') => {
  const categoryImages = defaultImages[category] || defaultImages.comic;
  const randomIndex = Math.floor(Math.random() * categoryImages.length);
  return categoryImages[randomIndex];
};

// Función para obtener imagen basada en el título (más consistente)
export const getImageByTitle = (title, category = 'comic') => {
  const categoryImages = defaultImages[category] || defaultImages.comic;
  // Usar el hash del título para obtener siempre la misma imagen para el mismo producto
  let hash = 0;
  for (let i = 0; i < title.length; i++) {
    const char = title.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  const index = Math.abs(hash) % categoryImages.length;
  return categoryImages[index];
};

// Imágenes específicas para productos populares
export const specificImages = {
  // Comics populares
  'Spider-Man': 'https://i.imgur.com/4YqNzTw.jpg',
  'Batman': 'https://i.imgur.com/oA9rKQP.jpg',
  'Superman': 'https://via.placeholder.com/300x400/DC2626/FFFFFF?text=SUPERMAN',
  'Wonder Woman': 'https://i.imgur.com/gUKXhwm.jpg',
  'The Avengers': 'https://i.imgur.com/VzNMd9L.jpg',
  'X-Men': 'https://i.imgur.com/rJ9rKjR.jpg',
  'Iron Man': 'https://i.imgur.com/d0SJdGh.jpg',
  
  // Mangas populares
  'Naruto': 'https://i.imgur.com/k1LtqFl.jpg',
  'One Piece': 'https://i.imgur.com/GhYgx2L.jpg',
  'Dragon Ball': 'https://i.imgur.com/h8k6NlR.jpg',
  'Attack on Titan': 'https://i.imgur.com/4YZDuMp.jpg',
  'My Hero Academia': 'https://i.imgur.com/8Bc4XvG.jpg',
  'Demon Slayer': 'https://i.imgur.com/dHk9QvS.jpg',
};

// Función principal para obtener imagen
export const getProductImage = (title, category = 'comic', providedUrl = null) => {
  // Si ya hay una URL proporcionada, usarla
  if (providedUrl && providedUrl.trim()) {
    return providedUrl;
  }
  
  // Buscar en imágenes específicas primero
  const titleKey = Object.keys(specificImages).find(key => 
    title.toLowerCase().includes(key.toLowerCase())
  );
  
  if (titleKey) {
    return specificImages[titleKey];
  }
  
  // Usar imagen basada en título y categoría
  return getImageByTitle(title, category);
};