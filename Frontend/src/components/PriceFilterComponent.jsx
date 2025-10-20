import React, { useState, useEffect } from 'react';
import { getComicsByPriceRange, getInventoryStats } from '../services/api';

const PriceFilterComponent = () => {
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [filteredComics, setFilteredComics] = useState([]);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(false);

    // Cargar estadísticas al montar el componente
    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = async () => {
        try {
            const inventoryStats = await getInventoryStats();
            setStats(inventoryStats);
        } catch (error) {
            console.error('Error loading stats:', error);
        }
    };

    const handlePriceFilter = async () => {
        if (!minPrice || !maxPrice) {
            alert('Por favor ingresa ambos precios');
            return;
        }

        setLoading(true);
        try {
            const comics = await getComicsByPriceRange(
                parseFloat(minPrice), 
                parseFloat(maxPrice)
            );
            setFilteredComics(comics);
        } catch (error) {
            console.error('Error filtering comics:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <h2>🔍 Filtrar por Precio</h2>
            
            {/* Estadísticas */}
            {stats && (
                <div style={styles.statsContainer}>
                    <h3>📊 Estadísticas del Inventario</h3>
                    <div style={styles.statsGrid}>
                        <div style={styles.statCard}>
                            <span style={styles.statLabel}>Total Cómics</span>
                            <span style={styles.statValue}>{stats.totalComics}</span>
                        </div>
                        <div style={styles.statCard}>
                            <span style={styles.statLabel}>Stock Total</span>
                            <span style={styles.statValue}>{stats.totalStock}</span>
                        </div>
                        <div style={styles.statCard}>
                            <span style={styles.statLabel}>Precio Promedio</span>
                            <span style={styles.statValue}>${stats.averagePrice.toFixed(2)}</span>
                        </div>
                        <div style={styles.statCard}>
                            <span style={styles.statLabel}>Valor Total</span>
                            <span style={styles.statValue}>${stats.totalValue.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            )}

            {/* Filtro de precio */}
            <div style={styles.filterContainer}>
                <div style={styles.inputGroup}>
                    <label>Precio Mínimo:</label>
                    <input
                        type="number"
                        step="0.01"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        placeholder="0.00"
                        style={styles.input}
                    />
                </div>
                <div style={styles.inputGroup}>
                    <label>Precio Máximo:</label>
                    <input
                        type="number"
                        step="0.01"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        placeholder="100.00"
                        style={styles.input}
                    />
                </div>
                <button 
                    onClick={handlePriceFilter}
                    disabled={loading}
                    style={styles.filterButton}
                >
                    {loading ? '🔄 Buscando...' : '🔍 Filtrar'}
                </button>
            </div>

            {/* Resultados */}
            {filteredComics.length > 0 && (
                <div style={styles.resultsContainer}>
                    <h3>Resultados ({filteredComics.length} cómics encontrados)</h3>
                    <div style={styles.comicsGrid}>
                        {filteredComics.map(comic => (
                            <div key={comic.id} style={styles.comicCard}>
                                <img 
                                    src={comic.imageUrl || '/placeholder-comic.jpg'} 
                                    alt={comic.title}
                                    style={styles.comicImage}
                                />
                                <div style={styles.comicInfo}>
                                    <h4>{comic.title}</h4>
                                    <p>Por: {comic.author}</p>
                                    <p style={styles.price}>${comic.price}</p>
                                    <p>Stock: {comic.stock}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        maxWidth: '1200px',
        margin: '0 auto'
    },
    statsContainer: {
        marginBottom: '30px',
        padding: '20px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px'
    },
    statsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '15px',
        marginTop: '15px'
    },
    statCard: {
        display: 'flex',
        flexDirection: 'column',
        padding: '15px',
        backgroundColor: 'white',
        borderRadius: '6px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        textAlign: 'center'
    },
    statLabel: {
        fontSize: '12px',
        color: '#666',
        marginBottom: '5px'
    },
    statValue: {
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#333'
    },
    filterContainer: {
        display: 'flex',
        gap: '15px',
        alignItems: 'end',
        marginBottom: '30px',
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column'
    },
    input: {
        padding: '8px 12px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        marginTop: '5px'
    },
    filterButton: {
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: '500'
    },
    resultsContainer: {
        marginTop: '20px'
    },
    comicsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '20px',
        marginTop: '15px'
    },
    comicCard: {
        border: '1px solid #ddd',
        borderRadius: '8px',
        overflow: 'hidden',
        backgroundColor: 'white'
    },
    comicImage: {
        width: '100%',
        height: '200px',
        objectFit: 'cover'
    },
    comicInfo: {
        padding: '15px'
    },
    price: {
        color: '#28a745',
        fontWeight: 'bold',
        fontSize: '16px'
    }
};

export default PriceFilterComponent;