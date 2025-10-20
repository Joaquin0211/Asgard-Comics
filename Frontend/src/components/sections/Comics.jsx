import React, { useState, useEffect } from 'react';
import { getComics, addToCart } from '../../services/api';
import './Sections.css';

const Comics = () => {
    const [comics, setComics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('Todos');
    const [addingToCart, setAddingToCart] = useState({});

    useEffect(() => {
        loadComics();
    }, []);

    const loadComics = async () => {
        try {
            const comicsData = await getComics();
            setComics(comicsData);
        } catch (error) {
            console.error('Error cargando cómics:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = async (comicId) => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
        
        if (!currentUser.id) {
            alert('Por favor inicia sesión para agregar productos al carrito');
            return;
        }

        setAddingToCart(prev => ({ ...prev, [comicId]: true }));
        
        try {
            await addToCart(currentUser.id, comicId, 1);
            alert('¡Producto agregado al carrito!');
            
            // Disparar evento personalizado para actualizar el contador del carrito
            window.dispatchEvent(new CustomEvent('cartUpdated'));
        } catch (error) {
            console.error('Error agregando al carrito:', error);
            alert('Error agregando producto al carrito');
        } finally {
            setAddingToCart(prev => ({ ...prev, [comicId]: false }));
        }
    };

    const getFilteredComics = () => {
        if (activeCategory === 'Todos') return comics.slice(0, 4);
        
        // Filtrar por categoría basado en el título o autor
        const filtered = comics.filter(comic => {
            const title = comic.title.toLowerCase();
            const author = comic.author.toLowerCase();
            
            switch (activeCategory) {
                case 'Marvel':
                    return title.includes('spider') || title.includes('iron') || title.includes('avengers') || title.includes('x-men');
                case 'DC':
                    return title.includes('batman') || title.includes('wonder woman') || title.includes('superman');
                case 'Manga':
                    return title.includes('dragon ball') || title.includes('one piece') || author.includes('akira') || author.includes('eiichiro');
                default:
                    return true;
            }
        });
        
        return filtered.slice(0, 4);
    };

    const categories = ['Todos', 'Marvel', 'DC', 'Manga'];

    return (
        <section className="section comics">
            <h2>Comics Destacados</h2>
            <div className="category-tabs">
                {categories.map(category => (
                    <button 
                        key={category}
                        className={`tab ${activeCategory === category ? 'active' : ''}`}
                        onClick={() => setActiveCategory(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>
            
            <div className="cards-grid">
                {loading ? (
                    <div style={{ textAlign: 'center', gridColumn: '1/-1' }}>
                        <p>Cargando cómics...</p>
                    </div>
                ) : getFilteredComics().length > 0 ? (
                    getFilteredComics().map((comic) => (
                        <div key={comic.id} className="comic-card">
                            <div 
                                className="card-image"
                                style={{
                                    backgroundImage: `url(${comic.imageUrl || '/placeholder-comic.jpg'})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    height: '200px'
                                }}
                            ></div>
                            <h3>{comic.title}</h3>
                            <p style={{ fontSize: '12px', color: '#666' }}>Por: {comic.author}</p>
                            <p className="price">${comic.price}</p>
                            <p style={{ fontSize: '11px', color: '#888' }}>Stock: {comic.stock}</p>
                            <button 
                                className="buy-button"
                                onClick={() => handleAddToCart(comic.id)}
                                disabled={addingToCart[comic.id] || comic.stock === 0}
                                style={{
                                    backgroundColor: comic.stock === 0 ? '#ccc' : '#28a745',
                                    cursor: comic.stock === 0 ? 'not-allowed' : 'pointer'
                                }}
                            >
                                {addingToCart[comic.id] ? 'Agregando...' : 
                                 comic.stock === 0 ? 'Sin Stock' : 'Agregar al Carrito'}
                            </button>
                        </div>
                    ))
                ) : (
                    <div style={{ textAlign: 'center', gridColumn: '1/-1' }}>
                        <p>No hay cómics disponibles en esta categoría.</p>
                        <p style={{ fontSize: '12px', color: '#666' }}>
                            Usa el botón "Crear Datos de Prueba" en la parte superior para agregar algunos cómics.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Comics;