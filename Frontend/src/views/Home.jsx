import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import WeeklyNews from '../components/sections/WeeklyNews';
import Preorders from '../components/sections/Preorders';
import Figures from '../components/sections/Figures';
import Promotions from '../components/sections/Promotions';
import Comics from '../components/sections/Comics';
import TradingCards from '../components/sections/TradingCards';
import './Home.css';

const Home = () => {
    const [isCreating, setIsCreating] = useState(false);
    const [message, setMessage] = useState('');
    const [dataStatus, setDataStatus] = useState('');

    // Cargar estado al montar el componente
    useEffect(() => {
        checkDataStatus();
    }, []);

    const checkDataStatus = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/test/status');
            const status = await response.text();
            setDataStatus(status);
        } catch (error) {
            setDataStatus('Error verificando estado');
        }
    };

    const createTestData = async () => {
        setIsCreating(true);
        try {
            const response = await fetch('http://localhost:8080/api/test/create-sample-data', {
                method: 'POST'
            });
            const result = await response.text();
            setMessage(result);
            // Actualizar estado después de crear datos
            await checkDataStatus();
        } catch (error) {
            setMessage('Error creando datos: ' + error.message);
        } finally {
            setIsCreating(false);
        }
    };

    return (
        <div className="home-container">
            <header className="hero-section">
                <h1>Bienvenidos a Asgard Comics</h1>
                <p>Tu destino para comics, mangas, figuras y más</p>
                
                {/* Panel de control rápido */}
                <div style={quickAccessStyles.panel}>
                    <h3>🚀 Acceso Rápido</h3>
                    
                    {dataStatus && (
                        <div style={quickAccessStyles.status}>
                            📊 {dataStatus}
                        </div>
                    )}
                    
                    <div style={quickAccessStyles.buttons}>
                        <button 
                            onClick={createTestData} 
                            disabled={isCreating}
                            style={quickAccessStyles.button}
                        >
                            {isCreating ? '⏳ Creando...' : '📦 Crear Datos de Prueba'}
                        </button>
                        <Link to="/price-filter" style={quickAccessStyles.link}>
                            🔍 Filtrar por Precio
                        </Link>
                        <Link to="/test-endpoints" style={quickAccessStyles.link}>
                            🧪 Probar Endpoints
                        </Link>
                        <Link to="/cart-debug" style={quickAccessStyles.link}>
                            🛒 Debug Carrito
                        </Link>
                    </div>
                    {message && (
                        <div style={quickAccessStyles.message}>
                            {message}
                        </div>
                    )}
                </div>
            </header>

            <main>
                <WeeklyNews />
                <Promotions />
                <Comics />
                <Preorders />
                <Figures />
                <TradingCards />
            </main>
        </div>
    );
};

// Estilos para el panel de acceso rápido
const quickAccessStyles = {
    panel: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        padding: '20px',
        borderRadius: '12px',
        marginTop: '20px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        border: '1px solid rgba(0, 0, 0, 0.1)',
        position: 'relative',
        zIndex: 10
    },
    buttons: {
        display: 'flex',
        gap: '15px',
        flexWrap: 'wrap',
        alignItems: 'center',
        marginTop: '15px'
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#28a745',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontWeight: '500',
        fontSize: '14px',
        transition: 'all 0.2s ease'
    },
    link: {
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '6px',
        fontWeight: '500',
        fontSize: '14px',
        transition: 'all 0.2s ease'
    },
    status: {
        backgroundColor: '#e3f2fd',
        padding: '10px',
        borderRadius: '4px',
        marginBottom: '15px',
        fontSize: '14px',
        color: '#1565c0'
    },
    message: {
        marginTop: '15px',
        padding: '10px',
        backgroundColor: '#d4edda',
        border: '1px solid #c3e6cb',
        borderRadius: '4px',
        color: '#155724'
    }
};

export default Home;