import React, { useState, useEffect } from 'react';
import { getComics, addToCart } from '../../services/api';
import './Sections.css';

const Promotions = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [addingToCart, setAddingToCart] = useState({});

    useEffect(() => {
        loadItems();
    }, []);

    const loadItems = async () => {
        try {
            const allComics = await getComics();
            // Simular promociones usando algunos cómics con descuentos
            const promoItems = allComics.slice(0, 3).map((comic, index) => {
                const discounts = [30, 40, 25];
                const discount = discounts[index] || 20;
                const originalPrice = comic.price;
                const salePrice = originalPrice * (1 - discount / 100);
                
                return {
                    ...comic,
                    id: `promo-${comic.id}`,
                    originalId: comic.id,
                    title: `${comic.title} - ¡OFERTA!`,
                    description: `${comic.description} - Precio especial`,
                    originalPrice: originalPrice,
                    price: salePrice,
                    discount: discount,
                    validUntil: '31/12/2024',
                    type: 'promotion'
                };
            });
            setItems(promoItems);
        } catch (error) {
            console.error('Error cargando promociones:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = async (item) => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
        
        if (!currentUser.id) {
            alert('Por favor inicia sesión para aprovechar esta promoción');
            return;
        }

        setAddingToCart(prev => ({ ...prev, [item.id]: true }));
        
        try {
            // Usar el ID original del cómic para el carrito
            await addToCart(currentUser.id, item.originalId, 1);
            alert('¡Promoción agregada al carrito!');
            
            // Disparar evento personalizado para actualizar el contador del carrito
            window.dispatchEvent(new CustomEvent('cartUpdated'));
        } catch (error) {
            console.error('Error agregando al carrito:', error);
            alert('Error agregando la promoción al carrito');
        } finally {
            setAddingToCart(prev => ({ ...prev, [item.id]: false }));
        }
    };

    return (
        <section className="section promotions">
            <h2>Promociones</h2>
            <div className="cards-grid">
                {loading ? (
                    <div style={{ textAlign: 'center', gridColumn: '1/-1' }}>
                        <p>Cargando promociones...</p>
                    </div>
                ) : items.length > 0 ? (
                    items.map((item) => (
                        <div key={item.id} className="promotion-card">
                            <div 
                                className="card-image"
                                style={{
                                    backgroundImage: `url(${item.imageUrl || '/placeholder-promo.jpg'})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    height: '200px',
                                    position: 'relative'
                                }}
                            >
                                <div style={{
                                    position: 'absolute',
                                    top: '10px',
                                    left: '10px',
                                    backgroundColor: '#e74c3c',
                                    color: 'white',
                                    padding: '8px 12px',
                                    borderRadius: '20px',
                                    fontSize: '14px',
                                    fontWeight: 'bold',
                                    transform: 'rotate(-5deg)'
                                }}>
                                    -{item.discount}%
                                </div>
                            </div>
                            <div className="promotion-content">
                                <h3>{item.title}</h3>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                                    <span style={{ 
                                        textDecoration: 'line-through', 
                                        color: '#999', 
                                        fontSize: '14px' 
                                    }}>
                                        ${item.originalPrice.toFixed(2)}
                                    </span>
                                    <span className="price" style={{ 
                                        color: '#e74c3c', 
                                        fontWeight: 'bold',
                                        fontSize: '18px'
                                    }}>
                                        ${item.price.toFixed(2)}
                                    </span>
                                </div>
                                <p style={{ fontSize: '12px', color: '#666' }}>{item.description}</p>
                                <p style={{ fontSize: '11px', color: '#e74c3c', fontWeight: 'bold' }}>
                                    ⏰ Válido hasta: {item.validUntil}
                                </p>
                                <p style={{ fontSize: '11px', color: '#888' }}>Stock: {item.stock}</p>
                                <button 
                                    className="promo-button"
                                    onClick={() => handleAddToCart(item)}
                                    disabled={addingToCart[item.id] || item.stock === 0}
                                    style={{
                                        backgroundColor: item.stock === 0 ? '#ccc' : '#e74c3c',
                                        color: 'white',
                                        border: 'none',
                                        padding: '10px 15px',
                                        borderRadius: '6px',
                                        cursor: item.stock === 0 ? 'not-allowed' : 'pointer',
                                        fontWeight: 'bold',
                                        fontSize: '14px'
                                    }}
                                >
                                    {addingToCart[item.id] ? 'Agregando...' : 
                                     item.stock === 0 ? 'Sin Stock' : '¡Aprovechar Oferta!'}
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div style={{ textAlign: 'center', gridColumn: '1/-1' }}>
                        <p>No hay promociones disponibles.</p>
                        <p style={{ fontSize: '12px', color: '#666' }}>
                            Usa el botón "Crear Datos de Prueba" para agregar productos.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Promotions;