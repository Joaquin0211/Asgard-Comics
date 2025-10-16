import React from 'react';
import './Sections.css';

const Comics = () => {
    return (
        <section className="section comics">
            <h2>Comics</h2>
            <div className="category-tabs">
                <button className="tab active">DC Comics</button>
                <button className="tab">Marvel</button>
                <button className="tab">Manga</button>
                <button className="tab">Independientes</button>
            </div>
            <div className="cards-grid">
                {/* Sample items - replace with real data */}
                {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="comic-card">
                        <div className="card-image placeholder"></div>
                        <h3>Comic #{item}</h3>
                        <p className="price">$XX.XX</p>
                        <button className="buy-button">Comprar</button>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Comics;