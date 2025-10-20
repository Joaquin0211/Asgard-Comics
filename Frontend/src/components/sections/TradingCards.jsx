import React, { useState, useEffect } from 'react';
import { getComics, addToCart } from '../../services/api';
import './Sections.css';

const TradingCards = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [addingToCart, setAddingToCart] = useState({});

    useEffect(() => {
        loadItems();
    }, []);

    const loadItems = async () => {
        try {
            const allComics = await getComics();
            // Filtrar solo productos de categoría 'tcg'
            const tcgItems = allComics.filter(comic => 
                comic.category === 'tcg' || comic.type === 'tcg'
            );
            setItems(tcgItems);
        } catch (error) {
            console.error('Error cargando TCG:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = async (item) => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
        
        if (!currentUser.id) {
            alert('Por favor inicia sesión para agregar productos al carrito');
            return;
        }

        setAddingToCart(prev => ({ ...prev, [item.id]: true }));
        
        try {
            // Usar el ID original del cómic para el carrito
            await addToCart(currentUser.id, item.originalId, 1);
            alert('¡Pack de cartas agregado al carrito!');
            
            // Disparar evento personalizado para actualizar el contador del carrito
            window.dispatchEvent(new CustomEvent('cartUpdated'));
        } catch (error) {
            console.error('Error agregando al carrito:', error);
            alert('Error agregando pack al carrito');
        } finally {
            setAddingToCart(prev => ({ ...prev, [item.id]: false }));
        }
    };

    return (
        <section className="section tcg">
            <h2>Trading Card Games</h2>
            <div className="cards-grid">
                {loading ? (
                    <div style={{ textAlign: 'center', gridColumn: '1/-1' }}>
                        <p>Cargando packs de cartas...</p>
                    </div>
                ) : items.length > 0 ? (
                    items.map((item) => (
                        <div key={item.id} className="tcg-card">
                            <div 
                                className="card-image"
                                style={{
                                    backgroundImage: `url(${item.imageUrl || '/placeholder-tcg.jpg'})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    height: '200px'
                                }}
                            ></div>
                            <h3>{item.title}</h3>
                            <p style={{ fontSize: '12px', color: '#666' }}>{item.description}</p>
                            <p className="price">${item.price.toFixed(2)}</p>
                            <div className="tags">
                                <span style={{
                                    backgroundColor: '#e3f2fd',
                                    color: '#1565c0',
                                    padding: '2px 8px',
                                    borderRadius: '12px',
                                    fontSize: '10px',
                                    fontWeight: 'bold'
                                }}>
                                    {item.tcgType}
                                </span>
                            </div>
                            <p style={{ fontSize: '11px', color: '#888' }}>Stock: {item.stock}</p>
                            <button 
                                className="buy-button"
                                onClick={() => handleAddToCart(item)}
                                disabled={addingToCart[item.id] || item.stock === 0}
                                style={{
                                    backgroundColor: item.stock === 0 ? '#ccc' : '#28a745',
                                    cursor: item.stock === 0 ? 'not-allowed' : 'pointer'
                                }}
                            >
                                {addingToCart[item.id] ? 'Agregando...' : 
                                 item.stock === 0 ? 'Sin Stock' : 'Agregar al Carrito'}
                            </button>
                        </div>
                    ))
                ) : (
                    <div style={{ textAlign: 'center', gridColumn: '1/-1' }}>
                        <p>No hay packs de cartas disponibles.</p>
                        <p style={{ fontSize: '12px', color: '#666' }}>
                            Usa el botón "Crear Datos de Prueba" para agregar productos.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default TradingCards;