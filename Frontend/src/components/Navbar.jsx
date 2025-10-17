import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Search, User, ShoppingCart } from "react-feather";
import "./Navbar.css";

const Navbar = () => {
    // Definición de enlaces para la fila inferior
    const navLinks = [
        { name: "Inicio", path: "/" },
        { name: "Mangas", path: "/mangas" },
        { name: "Comics y Más", path: "/comics" },
        { name: "Figuras", path: "/figuras" },
        { name: "Merchandising", path: "/merchandising" },
        { name: "TCG y Juegos", path: "/tcg" },
        { name: "Comida y Bebida", path: "/food-drink" },
        { name: "Indumentaria", path: "/clothing" },
        { name: "Extras y Más", path: "/extras" },
        { name: "Utilidades", path: "/utilities" },
        { name: "FAQ / News", path: "/news" },
    ];

    const [isCompact, setIsCompact] = useState(false);

    useEffect(() => {
        const ENTER_COMPACT = 100; // entra en modo compacto al pasar este valor
        const EXIT_COMPACT = 60;   // sale del modo compacto por debajo de este valor

        let ticking = false;
        const update = () => {
            const y = window.scrollY || document.documentElement.scrollTop;
            setIsCompact(prev => {
                const next = prev ? y > EXIT_COMPACT : y > ENTER_COMPACT;
                return next;
            });
            ticking = false;
        };
        const onScroll = () => {
            if (!ticking) {
                ticking = true;
                requestAnimationFrame(update);
            }
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <nav className={`ac-navbar ${isCompact ? 'is-compact' : ''}`}>
            {/* Top bar */}
            <div className="ac-navbar__top">
                <div className="ac-container ac-top__content">
                    {/* Search */}
                    <div className="ac-search">
                        <input type="text" placeholder="Buscar" className="ac-search__input" />
                        <button className="ac-search__btn" aria-label="Buscar">
                            <Search size={18} />
                        </button>
                    </div>

                    {/* Logo */}
                    <div className="ac-logo">
                        <Link to="/" aria-label="Inicio">
                            <img src="/logo.svg" alt="Asgard Comics Logo" />
                        </Link>
                    </div>

                    {/* Icons */}
                    <div className="ac-icons">
                        <Link to="/profile" className="ac-icon" aria-label="Perfil">
                            <User size={22} />
                        </Link>
                        <Link to="/cart" className="ac-icon ac-icon--cart" aria-label="Carrito">
                            <ShoppingCart size={22} />
                            <span className="ac-badge">0</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Menu row */}
            <div className="ac-navbar__menu">
                <div className="ac-container">
                    <ul className="ac-menu">
                        {navLinks.map((link, index) => (
                            <li key={index} className="ac-menu__item">
                                <Link to={link.path} className="ac-menu__link">{link.name}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Promo ticker (permanece en el DOM y colapsa suavemente) */}
            <div className={`ac-ticker ${isCompact ? 'is-hidden' : ''}`} aria-hidden={isCompact}>
                <div className="ac-ticker__track">
                    <span>¡ENVIOS GRATIS A PARTIR DE LOS $78000! POR CORREO ARGENTINO Y/O ANDREANI</span>
                    <span>DESCUENTOS DE HASTA EL 20% TODO EL AÑO</span>
                    <span>¡REGALOS CON TUS PREVENTAS! DESDE POSTALES, SEÑALADORES Y MÁS</span>
                    <span>¡NUEVOS INGRESOS TODAS LAS SEMANAS!</span>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;