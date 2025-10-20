import React, { useState, useEffect } from 'react';
import { 
    getComics, 
    getComicsByPriceRange, 
    getInventoryStats,
    createComic 
} from '../services/api';

const TestEndpoints = () => {
    const [testResults, setTestResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const addResult = (test, success, data, error = null) => {
        setTestResults(prev => [...prev, {
            test,
            success,
            data,
            error,
            timestamp: new Date().toLocaleTimeString()
        }]);
    };

    const runAllTests = async () => {
        setLoading(true);
        setTestResults([]);

        // Test 1: Obtener todos los cómics
        try {
            const allComics = await getComics();
            addResult('📚 GET /comics', true, `${allComics.length} cómics obtenidos`);
        } catch (error) {
            addResult('📚 GET /comics', false, null, error.message);
        }

        // Test 2: Crear un cómic de prueba
        try {
            const testComic = {
                title: "Test Comic " + Date.now(),
                author: "Test Author",
                price: 25.99,
                stock: 10,
                description: "Comic de prueba para testing"
            };
            const created = await createComic(testComic);
            addResult('➕ POST /comics', true, `Cómic creado con ID: ${created.id}`);
        } catch (error) {
            addResult('➕ POST /comics', false, null, error.message);
        }

        // Test 3: Filtrar por rango de precios
        try {
            const filteredComics = await getComicsByPriceRange(10, 30);
            addResult('💰 GET /comics/price-range', true, `${filteredComics.length} cómics entre $10-$30`);
        } catch (error) {
            addResult('💰 GET /comics/price-range', false, null, error.message);
        }

        // Test 4: Obtener estadísticas
        try {
            const stats = await getInventoryStats();
            addResult('📊 GET /comics/stats', true, 
                `Total: ${stats.totalComics} | Stock: ${stats.totalStock} | Promedio: $${stats.averagePrice}`
            );
        } catch (error) {
            addResult('📊 GET /comics/stats', false, null, error.message);
        }

        setLoading(false);
    };

    return (
        <div style={styles.container}>
            <h2>🧪 Test de Endpoints</h2>
            <p>Esta página prueba todos los endpoints para verificar que funcionan correctamente.</p>
            
            <button 
                onClick={runAllTests}
                disabled={loading}
                style={styles.testButton}
            >
                {loading ? '⏳ Ejecutando pruebas...' : '🚀 Ejecutar Todas las Pruebas'}
            </button>

            {testResults.length > 0 && (
                <div style={styles.resultsContainer}>
                    <h3>Resultados de las Pruebas:</h3>
                    {testResults.map((result, index) => (
                        <div 
                            key={index} 
                            style={{
                                ...styles.resultItem,
                                backgroundColor: result.success ? '#d4edda' : '#f8d7da',
                                borderColor: result.success ? '#c3e6cb' : '#f5c6cb'
                            }}
                        >
                            <div style={styles.resultHeader}>
                                <span style={styles.resultStatus}>
                                    {result.success ? '✅' : '❌'}
                                </span>
                                <strong>{result.test}</strong>
                                <span style={styles.timestamp}>{result.timestamp}</span>
                            </div>
                            
                            {result.success ? (
                                <div style={styles.resultData}>
                                    📋 {result.data}
                                </div>
                            ) : (
                                <div style={styles.resultError}>
                                    ⚠️ Error: {result.error}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            <div style={styles.infoContainer}>
                <h3>📝 Información de los Endpoints:</h3>
                <div style={styles.endpointsList}>
                    <div style={styles.endpointItem}>
                        <strong>GET /api/comics</strong>
                        <p>Obtiene todos los cómics disponibles</p>
                    </div>
                    <div style={styles.endpointItem}>
                        <strong>POST /api/comics</strong>
                        <p>Crea un nuevo cómic</p>
                    </div>
                    <div style={styles.endpointItem}>
                        <strong>GET /api/comics/price-range?minPrice=X&maxPrice=Y</strong>
                        <p>Filtra cómics por rango de precio</p>
                    </div>
                    <div style={styles.endpointItem}>
                        <strong>GET /api/comics/stats</strong>
                        <p>Obtiene estadísticas del inventario</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        maxWidth: '800px',
        margin: '0 auto'
    },
    testButton: {
        padding: '12px 24px',
        backgroundColor: '#28a745',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '16px',
        marginBottom: '20px'
    },
    resultsContainer: {
        marginTop: '20px'
    },
    resultItem: {
        padding: '15px',
        margin: '10px 0',
        border: '1px solid',
        borderRadius: '6px'
    },
    resultHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '8px'
    },
    resultStatus: {
        fontSize: '16px'
    },
    timestamp: {
        marginLeft: 'auto',
        fontSize: '12px',
        color: '#666'
    },
    resultData: {
        padding: '8px',
        backgroundColor: 'rgba(0,0,0,0.05)',
        borderRadius: '4px',
        fontFamily: 'monospace'
    },
    resultError: {
        padding: '8px',
        backgroundColor: 'rgba(220,53,69,0.1)',
        borderRadius: '4px',
        color: '#721c24'
    },
    infoContainer: {
        marginTop: '30px',
        padding: '20px',
        backgroundColor: '#f8f9fa',
        borderRadius: '6px'
    },
    endpointsList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px'
    },
    endpointItem: {
        padding: '10px',
        backgroundColor: 'white',
        borderRadius: '4px',
        border: '1px solid #dee2e6'
    }
};

export default TestEndpoints;