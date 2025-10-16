import React from 'react';
import './Sections.css';

const Preorders = () => {
    return (
        <section className="section preorders">
            <h2>Preventas</h2>
            <div className="cards-grid">
                {/* Sample items - replace with real data */}
                {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="preorder-card">
                        <div className="card-image placeholder"></div>
                        <h3>Preventa #{item}</h3>
                        <p>Fecha de lanzamiento: Próximamente</p>
                        <button className="preorder-button">Reservar</button>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Preorders;