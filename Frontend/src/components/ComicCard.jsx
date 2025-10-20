import React, { useState } from 'react';
import { addToCart } from '../services/api';
import './ComicCard.css';

const ComicCard = ({ comic, onPurchase, onAddToCart }) => {
    const [loading, setLoading] = useState(false);
    const [added, setAdded] = useState(false);

    const handlePurchase = () => {
        onPurchase?.(comic.id);
    };

    const handleAddToCart = async () => {
        if (loading || comic.stock === 0) return;

        // Obtener usuario actual del localStorage
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
        
        if (!currentUser.id) {
            alert('Por favor inicia sesión para agregar productos al carrito');
            return;
        }
        
        setLoading(true);
        try {
            // Usar originalId si existe, sino usar id normal
            const productId = comic.originalId || comic.id;
            await addToCart(currentUser.id, productId, 1);
            
            // Guardar información del producto transformado en localStorage para el carrito
            const transformedProducts = JSON.parse(localStorage.getItem('transformedProducts') || '{}');
            transformedProducts[productId] = {
                title: comic.title,
                author: comic.author,
                price: comic.price,
                category: comic.category || 'comic',
                description: comic.description
            };
            localStorage.setItem('transformedProducts', JSON.stringify(transformedProducts));
            
            setAdded(true);
            onAddToCart?.(); // Callback para actualizar contador del carrito
            
            // Disparar evento personalizado para actualizar el contador del carrito
            window.dispatchEvent(new CustomEvent('cartUpdated'));
            
            // Resetear estado después de 2 segundos
            setTimeout(() => setAdded(false), 2000);
        } catch (error) {
            console.error('Error agregando al carrito:', error);
            
            // Mensaje de error más específico
            const errorMessage = error.response?.data?.message || error.message || 'Error agregando producto al carrito';
            alert(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="comic-card">
            <div className="comic-thumb">
                {comic.imageUrl ? (
                    <img src={comic.imageUrl} alt={comic.title} />
                ) : (
                    <div className="placeholder" aria-hidden>
                        <span>Sin imagen</span>
                    </div>
                )}
            </div>
            <div className="comic-body">
                <h3 title={comic.title}>{comic.title}</h3>
                <p className="author">{comic.author}</p>
                <div className="meta">
                    <span className="price">${comic.price}</span>
                    {comic.stock > 0 ? (
                        <span className="stock in">Stock: {comic.stock}</span>
                    ) : (
                        <span className="stock out">Sin stock</span>
                    )}
                </div>
                <div className="actions">
                    <button 
                        className={`add-to-cart ${added ? 'added' : ''}`}
                        onClick={handleAddToCart} 
                        disabled={comic.stock === 0 || loading}
                    >
                        {loading ? '...' : added ? '✓ Agregado' : '🛒 Agregar'}
                    </button>
                    {onPurchase && (
                        <button className="buy-now" onClick={handlePurchase} disabled={comic.stock === 0}>
                            Comprar
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ComicCard;