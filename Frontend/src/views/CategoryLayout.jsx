import React, { useState, useEffect } from 'react';
import { getComics } from '../services/api';
import ComicCard from '../components/ComicCard';
import './CategoryLayout.css';

// Función auxiliar para validar y limpiar productos
const validateProduct = (product) => {
  if (!product || typeof product !== 'object') return null;
  
  return {
    ...product,
    id: product.id || `product-${Date.now()}-${Math.random()}`,
    title: product.title || 'Producto sin título',
    author: product.author || 'Autor desconocido',
    price: typeof product.price === 'number' ? Math.max(0, product.price) : 0,
    stock: typeof product.stock === 'number' ? Math.max(0, product.stock) : 0,
    description: product.description || '',
    imageUrl: product.imageUrl || null
  };
};

const CategoryLayout = ({ 
  title, 
  subtitle, 
  children, 
  filterType = null, // 'manga', 'figure', 'tcg', etc.
  showProducts = false,
  customFilter = null 
}) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (showProducts) {
      loadProducts();
    }

    // Escuchar eventos de login/logout para recargar productos
    const handleUserChange = () => {
      if (showProducts) {
        loadProducts();
      }
    };

    // Escuchar cuando se agregue un producto nuevo
    const handleProductAdded = () => {
      if (showProducts) {
        loadProducts();
      }
    };

    // Escuchar cuando se actualice un producto
    const handleProductUpdated = () => {
      if (showProducts) {
        loadProducts();
      }
    };

    // Escuchar cuando se inicialicen datos de prueba
    const handleDataInitialized = () => {
      if (showProducts) {
        loadProducts();
      }
    };

    window.addEventListener('userLoggedIn', handleUserChange);
    window.addEventListener('userLoggedOut', handleUserChange);
    window.addEventListener('productAdded', handleProductAdded);
    window.addEventListener('productUpdated', handleProductUpdated);
    window.addEventListener('dataInitialized', handleDataInitialized);

    return () => {
      window.removeEventListener('userLoggedIn', handleUserChange);
      window.removeEventListener('userLoggedOut', handleUserChange);
      window.removeEventListener('productAdded', handleProductAdded);
      window.removeEventListener('productUpdated', handleProductUpdated);
      window.removeEventListener('dataInitialized', handleDataInitialized);
    };
  }, [showProducts, filterType]);

  const loadProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const allComics = await getComics();
      
      if (!Array.isArray(allComics)) {
        throw new Error('Los datos recibidos no son válidos');
      }

      let filteredItems = allComics;

      // Aplicar filtros según el tipo de categoría
      if (filterType) {
        // Filtrar por categoría usando la propiedad category del producto
        filteredItems = allComics.filter(comic => 
          comic && comic.category === filterType
        );
      } else if (customFilter && typeof customFilter === 'function') {
        try {
          filteredItems = customFilter(allComics);
          
          // Validar que el customFilter devuelva un array válido
          if (!Array.isArray(filteredItems)) {
            console.warn('customFilter no devolvió un array válido, usando todos los productos');
            filteredItems = allComics;
          }
        } catch (filterError) {
          console.error('Error en customFilter:', filterError);
          filteredItems = allComics; // Fallback a todos los productos
        }
      }

      // Validar y limpiar productos
      const validItems = filteredItems
        .map(validateProduct)
        .filter(item => item !== null);

      setItems(validItems);
    } catch (err) {
      setError('No se pudieron cargar los productos');
      console.error('Error loading products:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="category-container">
      <header className="category-hero">
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
        {showProducts && (
          <div className="category-stats">
            {loading ? (
              <span>Cargando productos...</span>
            ) : (
              <span>{items.length} productos disponibles</span>
            )}
          </div>
        )}
      </header>
      <div className="category-content">
        {children ? (
          children
        ) : showProducts ? (
          <div className="products-section">
            {loading && (
              <div className="loading-state">
                <p>Cargando productos...</p>
              </div>
            )}
            {error && (
              <div className="error-state">
                <p style={{ color: '#e74c3c' }}>{error}</p>
              </div>
            )}
            {!loading && !error && items.length > 0 && (
              <div className="products-grid">
                {items.map(comic => (
                  <ComicCard 
                    key={comic.id} 
                    comic={comic} 
                  />
                ))}
              </div>
            )}
            {!loading && !error && items.length === 0 && (
              <div className="empty-state">
                <p>No hay productos disponibles en esta categoría.</p>
                <p style={{ fontSize: '14px', color: '#666', marginTop: '10px' }}>
                  Usa el botón "Crear Datos de Prueba" en la página principal para agregar productos.
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="category-placeholder">
            <p>Estamos preparando el contenido de {title}. ¡Vuelve pronto!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryLayout;
