import React from 'react';
import './CategoryLayout.css';

const CategoryLayout = ({ title, subtitle, children }) => {
  return (
    <div className="category-container">
      <header className="category-hero">
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </header>
      <div className="category-content">
        {children || (
          <div className="category-placeholder">
            <p>Estamos preparando el contenido de {title}. ¡Vuelve pronto!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryLayout;
