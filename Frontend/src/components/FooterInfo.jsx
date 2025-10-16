import React from "react";
import { Facebook, Instagram } from "react-feather";
import "./FooterInfo.css";

const paymentLogos = [
  "visa.png", "mastercard.png", "american.png", "banelco.png", "cabal.png", "link.png", "naranja.png", "shopping.png", "dinero.png", "nativa.png", "argencard.png", "cabal2.png", "pagofacil.png", "rapipago.png", "visa2.png", "mastercard2.png", "mastercard3.png"
];
const shippingLogos = [
  "envio.png", "andreani.png", "correo.png"
];

const FooterInfo = () => (
  <div className="ac-footer-info">
    <div className="ac-footer-info__container">
      <div className="ac-footer-info__contact">
        <span>¡Escribinos!</span>
        <div className="ac-footer-info__social">
          <a href="#" aria-label="Instagram"><Instagram size={22} /></a>
          <a href="#" aria-label="Facebook"><Facebook size={22} /></a>
        </div>
      </div>
      <div className="ac-footer-info__details">
        <div className="ac-footer-info__payments">
          <span className="ac-footer-info__label">Medios de pago</span>
          <div className="ac-footer-info__logos">
            {paymentLogos.map((logo, i) => (
              <img src={`/logos/${logo}`} alt="Medio de pago" key={i} />
            ))}
          </div>
        </div>
        <div className="ac-footer-info__shipping">
          <span className="ac-footer-info__label">Medios de envío</span>
          <div className="ac-footer-info__logos">
            {shippingLogos.map((logo, i) => (
              <img src={`/logos/${logo}`} alt="Medio de envío" key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default FooterInfo;
