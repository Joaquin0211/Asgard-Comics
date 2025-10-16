import React from 'react';
import './Sections.css';

const Promotions = () => {
    return (
        <section className="section promotions">
            <h2>Promociones</h2>
            <div className="cards-grid">
                {/* Sample items - replace with real data */}
                {[1, 2, 3].map((item) => (
                    <div key={item} className="promotion-card">
                        <div className="card-image placeholder"></div>
                        <div className="promotion-content">
                            <h3>Promoción #{item}</h3>
                            <p className="discount">¡30% OFF!</p>
                            <p>Válido hasta: DD/MM/YYYY</p>
                            <button className="promo-button">Ver Más</button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Promotions;