import React, { useState } from 'react';
import { addToCart } from '../services/api';
import './ComicCard.css';

const ComicCard = ({ comic, onPurchase, onAddToCart, userId = 1 }) => {
    const [loading, setLoading] = useState(false);
    const [added, setAdded] = useState(false);

    const handlePurchase = () => {
        onPurchase?.(comic.id);
    };

    const handleAddToCart = async () => {
        if (loading || comic.stock === 0) return;
        
        setLoading(true);
        try {
            await addToCart(userId, comic.id, 1);
            setAdded(true);
            onAddToCart?.(); // Callback para actualizar contador del carrito
            
            // Resetear estado después de 2 segundos
            setTimeout(() => setAdded(false), 2000);
        } catch (error) {
            console.error('Error agregando al carrito:', error);
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