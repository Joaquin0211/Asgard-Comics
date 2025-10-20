// Imágenes predeterminadas para diferentes categorías de productos
export const defaultImages = {
  // Cómics
  comic: [
    'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=300&h=400&fit=crop',
    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop',
    'https://images.unsplash.com/photo-1601645191163-3fc0d5d64e35?w=300&h=400&fit=crop',
    'https://images.unsplash.com/photo-1588497859490-85d1c17db96d?w=300&h=400&fit=crop',
    'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=400&fit=crop',
  ],
  
  // Mangas
  manga: [
    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop',
    'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&h=400&fit=crop',
    'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=400&fit=crop',
    'https://images.unsplash.com/photo-1618609378039-b572f64c5b42?w=300&h=400&fit=crop',
  ],
  
  // Figuras
  figura: [
    'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=300&h=400&fit=crop',
    'https://images.unsplash.com/photo-1578662015016-bf4c5540d814?w=300&h=400&fit=crop',
    'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300&h=400&fit=crop',
    'https://images.unsplash.com/photo-1578662020965-ae4e1a2e5de0?w=300&h=400&fit=crop',
  ],
  
  // TCG/Cartas
  tcg: [
    'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=300&h=400&fit=crop',
    'https://images.unsplash.com/photo-1578662015016-bf4c5540d814?w=300&h=400&fit=crop',
    'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300&h=400&fit=crop',
    'https://images.unsplash.com/photo-1578662020965-ae4e1a2e5de0?w=300&h=400&fit=crop',
  ],
  
  // Merchandising
  merchandising: [
    'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=400&fit=crop',
    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=400&fit=crop',
    'https://images.unsplash.com/photo-1556821840-3a9c6d1a4475?w=300&h=400&fit=crop',
    'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300&h=400&fit=crop',
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
  'Spider-Man': 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=300&h=400&fit=crop',
  'Batman': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop',
  'Superman': 'https://images.unsplash.com/photo-1601645191163-3fc0d5d64e35?w=300&h=400&fit=crop',
  'Wonder Woman': 'https://images.unsplash.com/photo-1588497859490-85d1c17db96d?w=300&h=400&fit=crop',
  'The Avengers': 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=400&fit=crop',
  
  // Mangas populares
  'Naruto': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop',
  'One Piece': 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&h=400&fit=crop',
  'Dragon Ball': 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=400&fit=crop',
  'Attack on Titan': 'https://images.unsplash.com/photo-1618609378039-b572f64c5b42?w=300&h=400&fit=crop',
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