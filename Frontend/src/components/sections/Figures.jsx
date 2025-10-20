import React, { useState, useEffect } from 'react';
import { getComics, addToCart } from '../../services/api';
import './Sections.css';

const Figures = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [addingToCart, setAddingToCart] = useState({});

    useEffect(() => {
        loadItems();
    }, []);

    const loadItems = async () => {
        try {
            const allComics = await getComics();
            // Simular figuras usando algunos cómics como base
            const figureItems = allComics.slice(0, 4).map((comic, index) => ({
                ...comic,
                id: `figure-${comic.id}`,
                originalId: comic.id,
                title: `Figura ${comic.title.split(' ')[0]}`,
                description: `Figura coleccionable de ${comic.title}`,
                price: comic.price * 2.5, // Las figuras son más caras
                type: 'figure'
            }));
            setItems(figureItems);
        } catch (error) {
            console.error('Error cargando figuras:', error);
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
            alert('¡Figura agregada al carrito!');
            
            // Disparar evento personalizado para actualizar el contador del carrito
            window.dispatchEvent(new CustomEvent('cartUpdated'));
        } catch (error) {
            console.error('Error agregando al carrito:', error);
            alert('Error agregando figura al carrito');
        } finally {
            setAddingToCart(prev => ({ ...prev, [item.id]: false }));
        }
    };

    return (
        <section className="section figures">
            <h2>Figuras Coleccionables</h2>
            <div className="cards-grid">
                {loading ? (
                    <div style={{ textAlign: 'center', gridColumn: '1/-1' }}>
                        <p>Cargando figuras...</p>
                    </div>
                ) : items.length > 0 ? (
                    items.map((item) => (
                        <div key={item.id} className="figure-card">
                            <div 
                                className="card-image"
                                style={{
                                    backgroundImage: `url(${item.imageUrl || '/placeholder-figure.jpg'})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    height: '200px'
                                }}
                            ></div>
                            <h3>{item.title}</h3>
                            <p style={{ fontSize: '12px', color: '#666' }}>{item.description}</p>
                            <p className="price">${item.price.toFixed(2)}</p>
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
                        <p>No hay figuras disponibles.</p>
                        <p style={{ fontSize: '12px', color: '#666' }}>
                            Usa el botón "Crear Datos de Prueba" para agregar productos.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Figures;