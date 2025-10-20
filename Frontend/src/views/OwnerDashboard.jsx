import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddComicForm from '../components/AddComicForm';

const OwnerDashboard = () => {
    const [user, setUser] = useState(null);
    const [comics, setComics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddForm, setShowAddForm] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Verificar si el usuario está logueado y es admin
        const userData = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        
        if (!userData || !token) {
            navigate('/login');
            return;
        }

        const parsedUser = JSON.parse(userData);
        if (parsedUser.role !== 'ADMIN') {
            navigate('/user-dashboard');
            return;
        }

        setUser(parsedUser);

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

    const handleComicAdded = (newComic) => {
        setComics(prev => [...prev, newComic]);
        setShowAddForm(false);
    };

    const handleDeleteComic = async (comicId) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este cómic?')) {
            try {
                const response = await fetch(`http://localhost:8080/api/comics/${comicId}`, {
                    method: 'DELETE'
                });
                
                if (response.ok) {
                    setComics(prev => prev.filter(comic => comic.id !== comicId));
                } else {
                    alert('Error al eliminar el cómic');
                }
            } catch (error) {
                console.error('Error deleting comic:', error);
                alert('Error al eliminar el cómic');
            }
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        navigate('/');
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
                <h1 style={styles.title}>👑 Dashboard de Administrador</h1>
                <div style={styles.userInfo}>
                    <span style={styles.welcome}>¡Bienvenido, Admin {user?.name || user?.email}! 🛡️</span>
                    <button onClick={handleLogout} style={styles.logoutBtn}>
                        Cerrar Sesión
                    </button>
                </div>
            </div>

            <div style={styles.content}>
                <div style={styles.statsGrid}>
                    <div style={styles.statCard}>
                        <h3 style={styles.statTitle}>📚 Total Cómics</h3>
                        <p style={styles.statValue}>{comics.length}</p>
                    </div>
                    <div style={styles.statCard}>
                        <h3 style={styles.statTitle}>📦 Stock Total</h3>
                        <p style={styles.statValue}>{comics.reduce((sum, comic) => sum + comic.stock, 0)}</p>
                    </div>
                    <div style={styles.statCard}>
                        <h3 style={styles.statTitle}>💰 Valor Inventario</h3>
                        <p style={styles.statValue}>
                            ${comics.reduce((sum, comic) => sum + (comic.price * comic.stock), 0).toFixed(2)}
                        </p>
                    </div>
                </div>

                <div style={styles.section}>
                    <div style={styles.sectionHeader}>
                        <h2 style={styles.sectionTitle}>📊 Gestión de Inventario</h2>
                        <button 
                            onClick={() => setShowAddForm(true)}
                            style={styles.addBtn}
                        >
                            ➕ Agregar Cómic
                        </button>
                    </div>
                    {comics.length > 0 ? (
                        <div style={styles.comicsTable}>
                            <div style={styles.tableHeader}>
                                <span style={styles.headerCell}>Título</span>
                                <span style={styles.headerCell}>Autor</span>
                                <span style={styles.headerCell}>Precio</span>
                                <span style={styles.headerCell}>Stock</span>
                                <span style={styles.headerCell}>Acciones</span>
                            </div>
                            {comics.map(comic => (
                                <div key={comic.id} style={styles.tableRow}>
                                    <span style={styles.tableCell}>{comic.title}</span>
                                    <span style={styles.tableCell}>{comic.author}</span>
                                    <span style={styles.tableCell}>${comic.price}</span>
                                    <span style={styles.tableCell}>
                                        <span style={{
                                            ...styles.stockBadge,
                                            backgroundColor: comic.stock > 10 ? '#10b981' : comic.stock > 5 ? '#f59e0b' : '#ef4444'
                                        }}>
                                            {comic.stock}
                                        </span>
                                    </span>
                                    <span style={styles.tableCell}>
                                        <button style={styles.editBtn}>✏️ Editar</button>
                                        <button 
                                            style={styles.deleteBtn}
                                            onClick={() => handleDeleteComic(comic.id)}
                                        >
                                            🗑️ Eliminar
                                        </button>
                                    </span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p style={styles.noData}>No hay cómics en el inventario.</p>
                    )}
                </div>

                {showAddForm && (
                    <AddComicForm 
                        onComicAdded={handleComicAdded}
                        onCancel={() => setShowAddForm(false)}
                    />
                )}
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
    statsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
        marginBottom: '20px'
    },
    statCard: {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '12px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        textAlign: 'center'
    },
    statTitle: {
        margin: '0 0 10px 0',
        color: '#64748b',
        fontSize: '14px',
        fontWeight: '500'
    },
    statValue: {
        margin: 0,
        color: '#1e293b',
        fontSize: '24px',
        fontWeight: '700'
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
    sectionHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px'
    },
    addBtn: {
        padding: '10px 20px',
        backgroundColor: '#10b981',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '600',
        transition: 'all 0.2s ease'
    },
    comicsTable: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
    },
    tableHeader: {
        display: 'grid',
        gridTemplateColumns: '2fr 1.5fr 1fr 1fr 1.5fr',
        gap: '16px',
        padding: '12px 16px',
        backgroundColor: '#f1f5f9',
        borderRadius: '6px',
        fontWeight: '600',
        color: '#374151'
    },
    headerCell: {
        fontSize: '14px'
    },
    tableRow: {
        display: 'grid',
        gridTemplateColumns: '2fr 1.5fr 1fr 1fr 1.5fr',
        gap: '16px',
        padding: '12px 16px',
        borderBottom: '1px solid #e5e7eb',
        alignItems: 'center'
    },
    tableCell: {
        fontSize: '14px',
        color: '#374151',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    },
    stockBadge: {
        padding: '4px 8px',
        borderRadius: '12px',
        color: 'white',
        fontSize: '12px',
        fontWeight: '600',
        textAlign: 'center',
        minWidth: '30px'
    },
    editBtn: {
        padding: '4px 8px',
        backgroundColor: '#3b82f6',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '12px',
        marginRight: '4px'
    },
    deleteBtn: {
        padding: '4px 8px',
        backgroundColor: '#ef4444',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '12px'
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

export default OwnerDashboard;