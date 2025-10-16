import React from 'react';

const ComicCard = ({ comic, onPurchase }) => {
    const handlePurchase = () => {
        onPurchase(comic.id);
    };

    return (
        <div className="comic-card">
            <h3>{comic.title}</h3>
            <p>Author: {comic.author}</p>
            <p>Price: ${comic.price}</p>
            <p>Stock: {comic.stock}</p>
            <button onClick={handlePurchase} disabled={comic.stock === 0}>
                {comic.stock > 0 ? 'Purchase' : 'Out of Stock'}
            </button>
        </div>
    );
};

export default ComicCard;