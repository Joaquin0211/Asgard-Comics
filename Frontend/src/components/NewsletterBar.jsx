import React from "react";
import "./NewsletterBar.css";

const NewsletterBar = () => {
  return (
    <div className="ac-newsletter-bar">
      <div className="ac-newsletter-bar__container">
        <h2 className="ac-newsletter-bar__title">Registrate y recibí nuestras novedades</h2>
        <form className="ac-newsletter-bar__form" onSubmit={e => e.preventDefault()}>
          <input type="email" placeholder="Ingresá tu email..." className="ac-newsletter-bar__input" />
          <button type="submit" className="ac-newsletter-bar__btn">Enviar</button>
        </form>
      </div>
    </div>
  );
};

export default NewsletterBar;
