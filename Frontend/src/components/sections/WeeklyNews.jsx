import React from 'react';
import './Sections.css';

const WeeklyNews = () => {
    return (
        <section className="section weekly-news">
            <h2>Novedades de la Semana</h2>
            <div className="cards-grid">
                {/* Sample items - replace with real data */}
                {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="news-card">
                        <div className="card-image placeholder"></div>
                        <h3>Nuevo Lanzamiento #{item}</h3>
                        <p>¡No te pierdas este nuevo título!</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default WeeklyNews;