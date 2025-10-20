import React, { useState, useEffect } from 'react';
import { getComics, addToCart } from '../../services/api';
import './Sections.css';

const Merchandising = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('Todos');
    const [addingToCart, setAddingToCart] = useState({});

    useEffect(() => {
        loadItems();
    }, []);

    const loadItems = async () => {
        try {
            const allData = await getComics();
            // Filtrar solo productos de categoría 'merchandising'
            const merchData = allData.filter(item => 
                item.category === 'merchandising'
            );
            setItems(merchData);
        } catch (error) {
            console.error('Error cargando merchandising:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = async (itemId) => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
        
        if (!currentUser.id) {
            alert('Por favor inicia sesión para agregar productos al carrito');
            return;
        }

        setAddingToCart(prev => ({ ...prev, [itemId]: true }));
        try {
            await addToCart(currentUser.id, itemId, 1);
            alert('Producto agregado al carrito');
        } catch (error) {
            console.error('Error agregando al carrito:', error);
            alert('Error al agregar al carrito');
        } finally {
            setAddingToCart(prev => ({ ...prev, [itemId]: false }));
        }
    };

    const categories = ['Todos', 'Ropa', 'Hogar', 'Accesorios', 'Tecnología'];

    const filteredItems = activeCategory === 'Todos' 
        ? items 
        : items.filter(item => {
            const title = item.title.toLowerCase();
            switch(activeCategory) {
                case 'Ropa': return title.includes('remera') || title.includes('hoodie') || title.includes('calcetines') || title.includes('gorra');
                case 'Hogar': return title.includes('taza') || title.includes('póster') || title.includes('almohada') || title.includes('termo');
                case 'Accesorios': return title.includes('llavero') || title.includes('mochila') || title.includes('pin');
                case 'Tecnología': return title.includes('mousepad');
                default: return true;
            }
        });

    if (loading) {
        return <div className="loading">Cargando merchandising...</div>;
    }

    return (
        <section className="section">
            <div className="section-header">
                <h2 className="section-title">🛍️ Merchandising</h2>
                <p className="section-subtitle">Productos oficiales y coleccionables únicos</p>
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
                {filteredItems.length === 0 ? (
                    <div className="no-products">
                        <h3>🛒 No hay productos disponibles</h3>
                        <p>Vuelve pronto para ver nuevo merchandising</p>
                    </div>
                ) : (
                    filteredItems.map(item => (
                        <div key={item.id} className="product-card">
                            <div className="product-image">
                                <img 
                                    src={item.imageUrl || 'https://via.placeholder.com/200x300/6B7280/FFFFFF?text=MERCH'} 
                                    alt={item.title}
                                    loading="lazy"
                                />
                                <div className="product-overlay">
                                    <button 
                                        className="quick-view-btn"
                                        onClick={() => handleAddToCart(item.id)}
                                        disabled={addingToCart[item.id] || item.stock === 0}
                                    >
                                        {addingToCart[item.id] ? '...' : 
                                         item.stock === 0 ? 'Agotado' : '🛒 Agregar'}
                                    </button>
                                </div>
                            </div>
                            <div className="product-info">
                                <h3 className="product-title">{item.title}</h3>
                                <p className="product-author">por {item.author}</p>
                                <div className="product-footer">
                                    <span className="product-price">${item.price}</span>
                                    <span className={`stock-badge ${item.stock <= 5 ? 'low' : 'normal'}`}>
                                        Stock: {item.stock}
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

export default Merchandising;