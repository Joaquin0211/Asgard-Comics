import React from 'react';
import './Sections.css';

const Figures = () => {
    return (
        <section className="section figures">
            <h2>Figuras</h2>
            <div className="cards-grid">
                {/* Sample items - replace with real data */}
                {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="figure-card">
                        <div className="card-image placeholder"></div>
                        <h3>Figura #{item}</h3>
                        <p className="price">$XX.XX</p>
                        <button className="buy-button">Comprar</button>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Figures;