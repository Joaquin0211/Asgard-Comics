// Datos de productos iniciales con imágenes
export const initialProducts = [
  // Cómics
  {
    title: "Spider-Man #1",
    author: "Stan Lee",
    price: 25.99,
    stock: 10,
    description: "El primer cómic de Spider-Man, una historia clásica del trepamuros más famoso de Marvel.",
    imageUrl: "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=300&h=400&fit=crop",
    category: "comic"
  },
  {
    title: "Batman #1",
    author: "Bob Kane",
    price: 35.50,
    stock: 8,
    description: "La primera aparición del Caballero Oscuro en esta edición especial remasterizada.",
    imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop",
    category: "comic"
  },
  {
    title: "The Avengers #1",
    author: "Stan Lee",
    price: 28.75,
    stock: 15,
    description: "Los Vengadores se reúnen por primera vez en esta épica aventura.",
    imageUrl: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=400&fit=crop",
    category: "comic"
  },
  {
    title: "Wonder Woman #1",
    author: "William Moulton Marston",
    price: 32.00,
    stock: 6,
    description: "La primera aparición de la Mujer Maravilla en una aventura legendaria.",
    imageUrl: "https://images.unsplash.com/photo-1588497859490-85d1c17db96d?w=300&h=400&fit=crop",
    category: "comic"
  },
  {
    title: "X-Men #1",
    author: "Stan Lee",
    price: 30.25,
    stock: 12,
    description: "Los mutantes más poderosos del mundo en su primera aventura juntos.",
    imageUrl: "https://images.unsplash.com/photo-1601645191163-3fc0d5d64e35?w=300&h=400&fit=crop",
    category: "comic"
  },

  // Mangas
  {
    title: "Naruto Vol. 1",
    author: "Masashi Kishimoto",
    price: 18.50,
    stock: 20,
    description: "Sigue las aventuras de Naruto Uzumaki en su camino para convertirse en Hokage.",
    imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop",
    category: "manga"
  },
  {
    title: "One Piece Vol. 1",
    author: "Eiichiro Oda",
    price: 19.99,
    stock: 18,
    description: "Monkey D. Luffy comienza su búsqueda del tesoro más grande del mundo.",
    imageUrl: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&h=400&fit=crop",
    category: "manga"
  },
  {
    title: "Dragon Ball Vol. 1",
    author: "Akira Toriyama",
    price: 17.75,
    stock: 25,
    description: "La clásica historia de Goku desde sus primeras aventuras.",
    imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=400&fit=crop",
    category: "manga"
  },
  {
    title: "Attack on Titan Vol. 1",
    author: "Hajime Isayama",
    price: 21.00,
    stock: 14,
    description: "La humanidad lucha por su supervivencia contra los titanes.",
    imageUrl: "https://images.unsplash.com/photo-1618609378039-b572f64c5b42?w=300&h=400&fit=crop",
    category: "manga"
  },

  // Figuras
  {
    title: "Figura de Spider-Man",
    author: "Figura Coleccionable",
    price: 64.98,
    stock: 5,
    description: "Figura coleccionable de alta calidad de Spider-Man con múltiples puntos de articulación.",
    imageUrl: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=300&h=400&fit=crop",
    category: "figura"
  },
  {
    title: "Figura de Batman",
    author: "Figura Coleccionable",
    price: 88.75,
    stock: 3,
    description: "Figura premium del Caballero Oscuro con accesorios incluidos.",
    imageUrl: "https://images.unsplash.com/photo-1578662015016-bf4c5540d814?w=300&h=400&fit=crop",
    category: "figura"
  },
  {
    title: "Figura de Naruto",
    author: "Figura Coleccionable",
    price: 46.25,
    stock: 8,
    description: "Figura detallada de Naruto en pose de combate.",
    imageUrl: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300&h=400&fit=crop",
    category: "figura"
  },

  // TCG
  {
    title: "Pack de Cartas Pokémon",
    author: "Booster Pack",
    price: 20.80,
    stock: 30,
    description: "Pack de cartas coleccionables Pokémon - Edición especial con cartas raras.",
    imageUrl: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=300&h=400&fit=crop",
    category: "tcg"
  },
  {
    title: "Pack de Cartas Yu-Gi-Oh!",
    author: "Booster Pack",
    price: 16.64,
    stock: 22,
    description: "Pack de cartas coleccionables Yu-Gi-Oh! con nuevas estrategias de duelo.",
    imageUrl: "https://images.unsplash.com/photo-1578662015016-bf4c5540d814?w=300&h=400&fit=crop",
    category: "tcg"
  },
  {
    title: "Pack de Cartas Magic TCG",
    author: "Booster Pack",
    price: 24.00,
    stock: 18,
    description: "Pack de cartas Magic: The Gathering - Edición limitada.",
    imageUrl: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300&h=400&fit=crop",
    category: "tcg"
  },

  // Merchandising
  {
    title: "Remera de Spider-Man",
    author: "Ropa Oficial",
    price: 15.59,
    stock: 12,
    description: "Remera oficial con diseño de Spider-Man - Alta calidad 100% algodón.",
    imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=400&fit=crop",
    category: "merchandising"
  },
  {
    title: "Taza de Batman",
    author: "Hogar Oficial",
    price: 21.30,
    stock: 16,
    description: "Taza oficial con diseño del logo de Batman - Apta para microondas.",
    imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=400&fit=crop",
    category: "merchandising"
  },
  {
    title: "Póster de The Avengers",
    author: "Decoración Oficial",
    price: 12.45,
    stock: 25,
    description: "Póster oficial de Los Vengadores - Tamaño A2, papel de alta calidad.",
    imageUrl: "https://images.unsplash.com/photo-1556821840-3a9c6d1a4475?w=300&h=400&fit=crop",
    category: "merchandising"
  },
  {
    title: "Llavero de Naruto",
    author: "Accesorios Oficiales",
    price: 9.36,
    stock: 35,
    description: "Llavero oficial de Naruto con diseño metálico de alta calidad.",
    imageUrl: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300&h=400&fit=crop",
    category: "merchandising"
  }
];