import React from 'react';
import './ComicCard.css';

const ComicCard = ({ comic, onPurchase }) => {
    const handlePurchase = () => {
        onPurchase?.(comic.id);
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
                    <span className="price">${'{'}comic.price{'}'}</span>
                    {comic.stock > 0 ? (
                        <span className="stock in">En stock</span>
                    ) : (
                        <span className="stock out">Sin stock</span>
                    )}
                </div>
                {onPurchase && (
                    <button className="buy" onClick={handlePurchase} disabled={comic.stock === 0}>
                        {comic.stock > 0 ? 'Comprar' : 'Agotado'}
                    </button>
                )}
            </div>
        </div>
    );
};

export default ComicCard;