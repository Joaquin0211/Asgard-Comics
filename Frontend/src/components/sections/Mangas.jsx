import React, { useState, useEffect } from 'react';
import { getComics, addToCart } from '../../services/api';
import './Sections.css';

const Mangas = () => {
    const [mangas, setMangas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('Todos');
    const [addingToCart, setAddingToCart] = useState({});

    useEffect(() => {
        loadMangas();
    }, []);

    const loadMangas = async () => {
        try {
            const allData = await getComics();
            // Filtrar solo productos de categoría 'manga'
            const mangasData = allData.filter(item => 
                item.category === 'manga'
            );
            setMangas(mangasData);
        } catch (error) {
            console.error('Error cargando mangas:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = async (mangaId) => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
        
        if (!currentUser.id) {
            alert('Por favor inicia sesión para agregar productos al carrito');
            return;
        }

        setAddingToCart(prev => ({ ...prev, [mangaId]: true }));
        try {
            await addToCart(currentUser.id, mangaId, 1);
            alert('Manga agregado al carrito');
        } catch (error) {
            console.error('Error agregando al carrito:', error);
            alert('Error al agregar al carrito');
        } finally {
            setAddingToCart(prev => ({ ...prev, [mangaId]: false }));
        }
    };

    const categories = ['Todos', 'Shonen', 'Seinen', 'Shojo', 'Isekai'];

    const filteredMangas = activeCategory === 'Todos' 
        ? mangas 
        : mangas.filter(manga => manga.genre === activeCategory);

    if (loading) {
        return <div className="loading">Cargando mangas...</div>;
    }

    return (
        <section className="section">
            <div className="section-header">
                <h2 className="section-title">📚 Mangas</h2>
                <p className="section-subtitle">Descubre las mejores historias del manga japonés</p>
            </div>

            <div className="category-tabs">
                {categories.map(category => (
                    <button
                        key={category}
                        className={`category-tab ${activeCategory === category ? 'active' : ''}`}
                        onClick={() => setActiveCategory(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <div className="products-grid">
                {filteredMangas.length === 0 ? (
                    <div className="no-products">
                        <h3>📖 No hay mangas disponibles</h3>
                        <p>Vuelve pronto para ver nuevos mangas</p>
                    </div>
                ) : (
                    filteredMangas.map(manga => (
                        <div key={manga.id} className="product-card">
                            <div className="product-image">
                                <img 
                                    src={manga.imageUrl || 'https://via.placeholder.com/200x300/FF6B6B/FFFFFF?text=MANGA'} 
                                    alt={manga.title}
                                    loading="lazy"
                                />
                                <div className="product-overlay">
                                    <button 
                                        className="quick-view-btn"
                                        onClick={() => handleAddToCart(manga.id)}
                                        disabled={addingToCart[manga.id] || manga.stock === 0}
                                    >
                                        {addingToCart[manga.id] ? '...' : 
                                         manga.stock === 0 ? 'Agotado' : '🛒 Agregar'}
                                    </button>
                                </div>
                            </div>
                            <div className="product-info">
                                <h3 className="product-title">{manga.title}</h3>
                                <p className="product-author">por {manga.author}</p>
                                <div className="product-footer">
                                    <span className="product-price">${manga.price}</span>
                                    <span className={`stock-badge ${manga.stock <= 5 ? 'low' : 'normal'}`}>
                                        Stock: {manga.stock}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </section>
    );
};

export default Mangas;