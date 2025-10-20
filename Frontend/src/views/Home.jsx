import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import WeeklyNews from '../components/sections/WeeklyNews';
import Preorders from '../components/sections/Preorders';
import Figures from '../components/sections/Figures';
import Promotions from '../components/sections/Promotions';
import Comics from '../components/sections/Comics';
import TradingCards from '../components/sections/TradingCards';
import { getComics, createComic } from '../services/api';
import { initialProducts } from '../data/initialProducts';
import axios from 'axios';
import './Home.css';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8080/api';

const Home = () => {
    const [isCreating, setIsCreating] = useState(false);
    const [message, setMessage] = useState('');
    const [dataStatus, setDataStatus] = useState('');

    // Cargar estado al montar el componente
    useEffect(() => {
        checkDataStatus();

        // Escuchar eventos de login/logout para recargar estado
        const handleUserChange = () => {
            checkDataStatus();
            // Forzar actualización de componentes hijos
            setDataStatus(''); // Reset temporal para forzar re-render
            setTimeout(() => checkDataStatus(), 100);
        };

        window.addEventListener('userLoggedIn', handleUserChange);
        window.addEventListener('userLoggedOut', handleUserChange);

        return () => {
            window.removeEventListener('userLoggedIn', handleUserChange);
            window.removeEventListener('userLoggedOut', handleUserChange);
        };
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
        setMessage('Creando datos de prueba...');
        try {
            // Usar los datos de initialProducts.js
            for (let i = 0; i < initialProducts.length; i++) {
                const product = initialProducts[i];
                try {
                    await createComic(product);
                    setMessage(`Creando: ${product.title} (${i + 1}/${initialProducts.length})`);
                    await new Promise(resolve => setTimeout(resolve, 100));
                } catch (error) {
                    console.log(`Producto ya existe: ${product.title}`);
                }
            }
            setMessage(`¡Datos creados exitosamente! ${initialProducts.length} productos agregados.`);
            
            // Disparar evento para notificar cambios
            window.dispatchEvent(new Event('dataInitialized'));
            await checkDataStatus();
        } catch (error) {
            setMessage('Error creando datos: ' + error.message);
        } finally {
            setIsCreating(false);
        }
    };

    const clearAllData = async () => {
        setIsCreating(true);
        setMessage('Limpiando base de datos...');
        try {
            const allComics = await getComics();
            for (const comic of allComics) {
                try {
                    await axios.delete(`${API_BASE}/comics/${comic.id}`);
                } catch (error) {
                    console.log(`Error eliminando ${comic.title}:`, error);
                }
            }
            setMessage('¡Base de datos limpiada exitosamente!');
            window.dispatchEvent(new Event('dataInitialized'));
            await checkDataStatus();
        } catch (error) {
            setMessage('Error limpiando datos: ' + error.message);
        } finally {
            setIsCreating(false);
        }
    };

    const createTestUsers = async () => {
        setIsCreating(true);
        setMessage('Creando usuarios de prueba...');
        try {
            // Crear usuario admin
            const adminUser = {
                name: "Admin",
                email: "admin@asgard.com", 
                password: "admin123",
                role: "ADMIN"
            };
            
            // Crear usuarios regulares
            const user1 = {
                name: "Juan Pérez",
                email: "juan@email.com",
                password: "user123", 
                role: "USER"
            };
            
            const user2 = {
                name: "María García",
                email: "maria@email.com",
                password: "user123",
                role: "USER"
            };

            const user3 = {
                name: "Pedro López",
                email: "pedro@email.com",
                password: "user123",
                role: "USER"
            };

            // Intentar crear cada usuario
            const users = [adminUser, user1, user2, user3];
            let createdCount = 0;
            
            for (const user of users) {
                try {
                    await axios.post(`${API_BASE}/auth/register`, user);
                    createdCount++;
                    setMessage(`Creando usuario: ${user.name} (${createdCount}/${users.length})`);
                } catch (error) {
                    console.log(`Usuario ya existe o error: ${user.email}`, error.response?.data || error.message);
                }
            }
            
            setMessage(`¡Usuarios creados exitosamente! ${createdCount} usuarios agregados.`);
            await checkDataStatus();
        } catch (error) {
            setMessage('Error creando usuarios: ' + error.message);
        } finally {
            setIsCreating(false);
        }
    };

    const fixAdminRole = async () => {
        setIsCreating(true);
        setMessage('Corrigiendo rol de admin...');
        try {
            // Primero, eliminar el usuario admin actual (si existe)
            const allUsers = await axios.get(`${API_BASE}/test/users`);
            const adminUser = allUsers.data.find(user => user.email === 'admin@asgard.com');
            
            if (adminUser) {
                await axios.delete(`${API_BASE}/users/${adminUser.id}`);
            }
            
            // Crear nuevo usuario admin con rol correcto usando el endpoint de test
            await axios.post(`${API_BASE}/test/create-sample-data`);
            
            setMessage('¡Rol de admin corregido! Por favor, cierra sesión y vuelve a iniciar sesión.');
        } catch (error) {
            console.error('Error corrigiendo rol:', error);
            setMessage('Error corrigiendo rol. Intenta reiniciar el backend y usar "Crear Usuarios" nuevamente.');
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
                        <button 
                            onClick={createTestUsers} 
                            disabled={isCreating}
                            style={{...quickAccessStyles.button, backgroundColor: '#17a2b8'}}
                        >
                            {isCreating ? '⏳ Creando...' : '👥 Crear Usuarios'}
                        </button>
                        <button 
                            onClick={fixAdminRole} 
                            disabled={isCreating}
                            style={{...quickAccessStyles.button, backgroundColor: '#ffc107', color: '#000'}}
                        >
                            {isCreating ? '⏳ Corrigiendo...' : '🔧 Corregir Admin'}
                        </button>
                        <button 
                            onClick={clearAllData} 
                            disabled={isCreating}
                            style={{...quickAccessStyles.button, backgroundColor: '#dc3545'}}
                        >
                            {isCreating ? '⏳ Limpiando...' : '🗑️ Limpiar Base de Datos'}
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