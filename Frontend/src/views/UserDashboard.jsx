import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../services/api';

const UserDashboard = () => {
    const [user, setUser] = useState(null);
    const [comics, setComics] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // Verificar si el usuario está logueado
        const userData = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        
        if (!userData || !token) {
            navigate('/login');
            return;
        }

        setUser(JSON.parse(userData));

        // Fetch comics desde el backend
        const fetchComics = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/comics');
                if (response.ok) {
                    const data = await response.json();
                    setComics(data);
                }
            } catch (error) {
                console.error('Error fetching comics:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchComics();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        navigate('/');
    };

    const handleAddToCart = async (comicId) => {
        try {
            await addToCart(user.id, comicId, 1);
            alert('¡Producto agregado al carrito!');
        } catch (error) {
            console.error('Error adding to cart:', error);
            alert('Error al agregar al carrito');
        }
    };

    if (loading) {
        return (
            <div style={styles.container}>
                <div style={styles.loading}>Cargando...</div>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h1 style={styles.title}>🎮 Dashboard de Usuario</h1>
                <div style={styles.userInfo}>
                    <span style={styles.welcome}>¡Bienvenido, {user?.name || user?.email}! 👋</span>
                    <button onClick={handleLogout} style={styles.logoutBtn}>
                        Cerrar Sesión
                    </button>
                </div>
            </div>

            <div style={styles.content}>
                <div style={styles.section}>
                    <h2 style={styles.sectionTitle}>📚 Catálogo de Cómics</h2>
                    {comics.length > 0 ? (
                        <div style={styles.comicsGrid}>
                            {comics.map(comic => (
                                <div key={comic.id} style={styles.comicCard}>
                                    <img 
                                        src={comic.imageUrl || '/placeholder-comic.jpg'} 
                                        alt={comic.title}
                                        style={styles.comicImage}
                                    />
                                    <div style={styles.comicInfo}>
                                        <h3 style={styles.comicTitle}>{comic.title}</h3>
                                        <p style={styles.comicAuthor}>Por: {comic.author}</p>
                                        <p style={styles.comicPrice}>${comic.price}</p>
                                        <p style={styles.comicStock}>Stock: {comic.stock}</p>
                                        <button 
                                            style={styles.addToCartBtn}
                                            onClick={() => handleAddToCart(comic.id)}
                                        >
                                            🛒 Agregar al Carrito
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p style={styles.noData}>No hay cómics disponibles en este momento.</p>
                    )}
                </div>

                <div style={styles.section}>
                    <h2 style={styles.sectionTitle}>🛍️ Mis Compras</h2>
                    <p style={styles.comingSoon}>Historial de compras próximamente...</p>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        minHeight: '100vh',
        backgroundColor: '#f8fafc',
        padding: '20px'
    },
    loading: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '200px',
        fontSize: '18px',
        color: '#64748b'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '30px',
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    title: {
        margin: 0,
        color: '#1e293b',
        fontSize: '28px'
    },
    userInfo: {
        display: 'flex',
        alignItems: 'center',
        gap: '15px'
    },
    welcome: {
        color: '#475569',
        fontSize: '16px',
        fontWeight: '500'
    },
    logoutBtn: {
        padding: '8px 16px',
        backgroundColor: '#ef4444',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '500'
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        gap: '30px'
    },
    section: {
        backgroundColor: 'white',
        padding: '24px',
        borderRadius: '12px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    sectionTitle: {
        margin: '0 0 20px 0',
        color: '#1e293b',
        fontSize: '20px'
    },
    comicsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '20px'
    },
    comicCard: {
        border: '1px solid #e2e8f0',
        borderRadius: '8px',
        overflow: 'hidden',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease'
    },
    comicImage: {
        width: '100%',
        height: '200px',
        objectFit: 'cover',
        backgroundColor: '#f1f5f9'
    },
    comicInfo: {
        padding: '16px'
    },
    comicTitle: {
        margin: '0 0 8px 0',
        fontSize: '16px',
        fontWeight: '600',
        color: '#1e293b'
    },
    comicAuthor: {
        margin: '0 0 8px 0',
        fontSize: '14px',
        color: '#64748b'
    },
    comicPrice: {
        margin: '0 0 8px 0',
        fontSize: '16px',
        fontWeight: '600',
        color: '#059669'
    },
    comicStock: {
        margin: '0 0 12px 0',
        fontSize: '14px',
        color: '#64748b'
    },
    addToCartBtn: {
        width: '100%',
        padding: '8px 16px',
        backgroundColor: '#3b82f6',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '500'
    },
    noData: {
        textAlign: 'center',
        color: '#64748b',
        fontSize: '16px',
        padding: '40px'
    },
    comingSoon: {
        textAlign: 'center',
        color: '#64748b',
        fontSize: '16px',
        fontStyle: 'italic',
        padding: '20px'
    }
};

export default UserDashboard;