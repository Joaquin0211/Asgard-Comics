import React from 'react';
import './Sections.css';

const TradingCards = () => {
    return (
        <section className="section tcg">
            <h2>Trading Card Games</h2>
            <div className="cards-grid">
                {/* Sample items - replace with real data */}
                {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="tcg-card">
                        <div className="card-image placeholder"></div>
                        <h3>TCG Set #{item}</h3>
                        <p className="price">$XX.XX</p>
                        <div className="tags">
                            <span>Pokémon</span>
                            <span>Yu-Gi-Oh!</span>
                            <span>Magic</span>
                        </div>
                        <button className="buy-button">Comprar</button>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default TradingCards;