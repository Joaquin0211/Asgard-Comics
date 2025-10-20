import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Search, User, ShoppingCart, LogOut } from "react-feather";
import CartComponent from './CartComponent';
import { getCartItemCount, searchComicsByTitle } from '../services/api';
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
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItemCount, setCartItemCount] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showSearchResults, setShowSearchResults] = useState(false);
    const [user, setUser] = useState(null);
    const [showUserMenu, setShowUserMenu] = useState(false);
    
    const navigate = useNavigate();
    
    // ID de usuario (obtenerlo del contexto de autenticación)
    const userId = user?.id || 1;

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

    // Verificar si hay usuario logueado al cargar
    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    // Cargar contador del carrito
    useEffect(() => {
        loadCartCount();
    }, [userId]);

    const loadCartCount = async () => {
        try {
            const count = await getCartItemCount(userId);
            setCartItemCount(count);
        } catch (error) {
            console.error('Error cargando contador del carrito:', error);
        }
    };

    // Búsqueda en tiempo real
    const handleSearch = async (term) => {
        setSearchTerm(term);
        if (term.length > 2) {
            try {
                const results = await searchComicsByTitle(term);
                setSearchResults(results.slice(0, 5)); // Mostrar solo los primeros 5
                setShowSearchResults(true);
            } catch (error) {
                console.error('Error en búsqueda:', error);
                setSearchResults([]);
            }
        } else {
            setShowSearchResults(false);
        }
    };

    const handleCartClick = () => {
        setIsCartOpen(true);
    };

    const handleCartClose = () => {
        setIsCartOpen(false);
        loadCartCount(); // Recargar contador cuando se cierre el carrito
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setUser(null);
        setShowUserMenu(false);
        navigate('/');
    };

    const handleUserMenuClick = () => {
        if (user) {
            setShowUserMenu(!showUserMenu);
        } else {
            navigate('/login');
        }
    };

    return (
        <>
            <nav className={`ac-navbar ${isCompact ? 'is-compact' : ''}`}>
                {/* Top bar */}
                <div className="ac-navbar__top">
                    <div className="ac-container ac-top__content">
                        {/* Search */}
                        <div className="ac-search">
                            <input 
                                type="text" 
                                placeholder="Buscar comics..." 
                                className="ac-search__input"
                                value={searchTerm}
                                onChange={(e) => handleSearch(e.target.value)}
                                onFocus={() => searchTerm.length > 2 && setShowSearchResults(true)}
                                onBlur={() => setTimeout(() => setShowSearchResults(false), 200)}
                            />
                            <button className="ac-search__btn" aria-label="Buscar">
                                <Search size={18} />
                            </button>
                            
                            {/* Resultados de búsqueda */}
                            {showSearchResults && searchResults.length > 0 && (
                                <div className="search-results">
                                    {searchResults.map((comic) => (
                                        <Link 
                                            key={comic.id} 
                                            to={`/comic/${comic.id}`}
                                            className="search-result-item"
                                            onClick={() => setShowSearchResults(false)}
                                        >
                                            <img src={comic.imageUrl || '/placeholder-comic.jpg'} alt={comic.title} />
                                            <div>
                                                <h4>{comic.title}</h4>
                                                <p>{comic.author}</p>
                                                <span>${comic.price}</span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Logo */}
                        <div className="ac-logo">
                            <Link to="/" aria-label="Inicio">
                                <img src="/logo.svg" alt="Asgard Comics Logo" />
                            </Link>
                        </div>

                        {/* Icons */}
                        <div className="ac-icons">
                            <div className="user-menu-container">
                                <button 
                                    onClick={handleUserMenuClick}
                                    className={`ac-icon ${user ? 'logged-in' : ''}`}
                                    aria-label={user ? "Menú de usuario" : "Iniciar sesión"}
                                >
                                    <User size={22} />
                                </button>
                                
                                {/* Menú desplegable del usuario */}
                                {showUserMenu && user && (
                                    <div className="user-dropdown">
                                        <div className="user-info">
                                            <span className="user-name">{user.name}</span>
                                            <span className="user-role">{user.role}</span>
                                        </div>
                                        <hr />
                                        <Link 
                                            to={user.role === 'ADMIN' ? '/owner-dashboard' : '/user-dashboard'}
                                            className="dropdown-item"
                                            onClick={() => setShowUserMenu(false)}
                                        >
                                            Mi Dashboard
                                        </Link>
                                        <button 
                                            onClick={handleLogout}
                                            className="dropdown-item logout-btn"
                                        >
                                            <LogOut size={16} />
                                            Cerrar Sesión
                                        </button>
                                    </div>
                                )}
                                
                                {/* Mostrar "Iniciar Sesión" si no hay usuario */}
                                {!user && (
                                    <div className="login-prompt">
                                        <Link to="/login" className="login-link">
                                            Iniciar Sesión
                                        </Link>
                                    </div>
                                )}
                            </div>
                            
                            <button 
                                onClick={handleCartClick}
                                className="ac-icon ac-icon--cart" 
                                aria-label="Carrito"
                            >
                                <ShoppingCart size={22} />
                                {cartItemCount > 0 && (
                                    <span className="ac-badge">{cartItemCount}</span>
                                )}
                            </button>
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

            {/* Componente del Carrito */}
            <CartComponent 
                userId={userId}
                isOpen={isCartOpen}
                onClose={handleCartClose}
            />
        </>
    );
};

export default Navbar;