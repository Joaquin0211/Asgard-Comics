import React, { useState, useEffect } from 'react';
import { getComics, addToCart } from '../../services/api';
import './Sections.css';

const Preorders = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [addingToCart, setAddingToCart] = useState({});

    useEffect(() => {
        loadItems();
    }, []);

    const loadItems = async () => {
        try {
            const allComics = await getComics();
            // Simular preventas usando algunos cómics como base
            const preorderItems = allComics.slice(4, 8).map((comic, index) => {
                const releaseDates = ['Enero 2024', 'Febrero 2024', 'Marzo 2024', 'Abril 2024'];
                return {
                    ...comic,
                    id: `preorder-${comic.id}`,
                    originalId: comic.id,
                    title: `${comic.title} (Edición Especial)`,
                    description: `Preventa: ${comic.title} - Edición limitada`,
                    price: comic.price * 1.3, // Las preventas son un poco más caras
                    releaseDate: releaseDates[index] || 'Próximamente',
                    type: 'preorder'
                };
            });
            setItems(preorderItems);
        } catch (error) {
            console.error('Error cargando preventas:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = async (item) => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
        
        if (!currentUser.id) {
            alert('Por favor inicia sesión para hacer una reserva');
            return;
        }

        setAddingToCart(prev => ({ ...prev, [item.id]: true }));
        
        try {
            // Usar el ID original del cómic para el carrito
            await addToCart(currentUser.id, item.originalId, 1);
            alert('¡Preventa reservada exitosamente!');
            
            // Disparar evento personalizado para actualizar el contador del carrito
            window.dispatchEvent(new CustomEvent('cartUpdated'));
        } catch (error) {
            console.error('Error agregando al carrito:', error);
            alert('Error reservando la preventa');
        } finally {
            setAddingToCart(prev => ({ ...prev, [item.id]: false }));
        }
    };

    return (
        <section className="section preorders">
            <h2>Preventas</h2>
            <div className="cards-grid">
                {loading ? (
                    <div style={{ textAlign: 'center', gridColumn: '1/-1' }}>
                        <p>Cargando preventas...</p>
                    </div>
                ) : items.length > 0 ? (
                    items.map((item) => (
                        <div key={item.id} className="preorder-card">
                            <div 
                                className="card-image"
                                style={{
                                    backgroundImage: `url(${item.imageUrl || '/placeholder-preorder.jpg'})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    height: '200px',
                                    position: 'relative'
                                }}
                            >
                                <div style={{
                                    position: 'absolute',
                                    top: '10px',
                                    right: '10px',
                                    backgroundColor: '#ff6b35',
                                    color: 'white',
                                    padding: '4px 8px',
                                    borderRadius: '12px',
                                    fontSize: '10px',
                                    fontWeight: 'bold'
                                }}>
                                    PREVENTA
                                </div>
                            </div>
                            <h3>{item.title}</h3>
                            <p style={{ fontSize: '12px', color: '#666' }}>{item.description}</p>
                            <p className="price">${item.price.toFixed(2)}</p>
                            <p style={{ fontSize: '11px', color: '#ff6b35', fontWeight: 'bold' }}>
                                📅 {item.releaseDate}
                            </p>
                            <p style={{ fontSize: '11px', color: '#888' }}>Stock: {item.stock}</p>
                            <button 
                                className="preorder-button"
                                onClick={() => handleAddToCart(item)}
                                disabled={addingToCart[item.id] || item.stock === 0}
                                style={{
                                    backgroundColor: item.stock === 0 ? '#ccc' : '#ff6b35',
                                    color: 'white',
                                    border: 'none',
                                    padding: '10px 15px',
                                    borderRadius: '6px',
                                    cursor: item.stock === 0 ? 'not-allowed' : 'pointer',
                                    fontWeight: 'bold',
                                    fontSize: '14px'
                                }}
                            >
                                {addingToCart[item.id] ? 'Reservando...' : 
                                 item.stock === 0 ? 'Sin Stock' : 'Reservar'}
                            </button>
                        </div>
                    ))
                ) : (
                    <div style={{ textAlign: 'center', gridColumn: '1/-1' }}>
                        <p>No hay preventas disponibles.</p>
                        <p style={{ fontSize: '12px', color: '#666' }}>
                            Usa el botón "Crear Datos de Prueba" para agregar productos.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Preorders;