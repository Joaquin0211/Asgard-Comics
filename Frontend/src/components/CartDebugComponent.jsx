import React, { useState } from 'react';
import { 
    getCart, 
    addToCart, 
    getCartItemCount,
    createComic 
} from '../services/api';

const CartDebugComponent = () => {
    const [userId, setUserId] = useState('');
    const [comicId, setComicId] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [cartData, setCartData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const testGetCart = async () => {
        if (!userId) {
            setError('Por favor ingresa un ID de usuario');
            return;
        }

        setLoading(true);
        setError('');
        
        try {
            console.log('🔍 Obteniendo carrito para usuario:', userId);
            const cart = await getCart(parseInt(userId));
            console.log('✅ Carrito obtenido:', cart);
            setCartData(cart);
        } catch (err) {
            console.error('❌ Error obteniendo carrito:', err);
            setError('Error: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const testAddToCart = async () => {
        if (!userId || !comicId) {
            setError('Por favor ingresa ID de usuario y cómic');
            return;
        }

        setLoading(true);
        setError('');
        
        try {
            console.log('➕ Agregando al carrito:', { userId, comicId, quantity });
            const result = await addToCart(parseInt(userId), parseInt(comicId), quantity);
            console.log('✅ Agregado al carrito:', result);
            
            // Recargar carrito
            await testGetCart();
        } catch (err) {
            console.error('❌ Error agregando al carrito:', err);
            setError('Error: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const testGetCartCount = async () => {
        if (!userId) {
            setError('Por favor ingresa un ID de usuario');
            return;
        }

        setLoading(true);
        setError('');
        
        try {
            console.log('🔢 Obteniendo contador carrito para usuario:', userId);
            const count = await getCartItemCount(parseInt(userId));
            console.log('✅ Contador obtenido:', count);
            alert(`Contador del carrito: ${count}`);
        } catch (err) {
            console.error('❌ Error obteniendo contador:', err);
            setError('Error: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const createTestComic = async () => {
        setLoading(true);
        setError('');
        
        try {
            const testComic = {
                title: "Test Comic " + Date.now(),
                author: "Test Author",
                price: 25.99,
                stock: 10,
                description: "Cómic de prueba para testing del carrito",
                imageUrl: "https://via.placeholder.com/300x400"
            };
            
            console.log('📦 Creando cómic de prueba:', testComic);
            const created = await createComic(testComic);
            console.log('✅ Cómic creado:', created);
            
            setComicId(created.id.toString());
            alert(`Cómic creado con ID: ${created.id}`);
        } catch (err) {
            console.error('❌ Error creando cómic:', err);
            setError('Error: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <h2>🛒 Debug del Carrito</h2>
            
            {error && (
                <div style={styles.error}>
                    ⚠️ {error}
                </div>
            )}

            <div style={styles.controls}>
                <div style={styles.inputGroup}>
                    <label>ID de Usuario:</label>
                    <input
                        type="number"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        placeholder="Ej: 1"
                        style={styles.input}
                    />
                </div>

                <div style={styles.inputGroup}>
                    <label>ID de Cómic:</label>
                    <input
                        type="number"
                        value={comicId}
                        onChange={(e) => setComicId(e.target.value)}
                        placeholder="Ej: 1"
                        style={styles.input}
                    />
                </div>

                <div style={styles.inputGroup}>
                    <label>Cantidad:</label>
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                        min="1"
                        style={styles.input}
                    />
                </div>
            </div>

            <div style={styles.buttons}>
                <button 
                    onClick={createTestComic}
                    disabled={loading}
                    style={styles.button}
                >
                    📦 Crear Cómic de Prueba
                </button>
                
                <button 
                    onClick={testAddToCart}
                    disabled={loading}
                    style={styles.button}
                >
                    ➕ Agregar al Carrito
                </button>
                
                <button 
                    onClick={testGetCart}
                    disabled={loading}
                    style={styles.button}
                >
                    🔍 Ver Carrito
                </button>
                
                <button 
                    onClick={testGetCartCount}
                    disabled={loading}
                    style={styles.button}
                >
                    🔢 Contador Carrito
                </button>
            </div>

            {loading && (
                <div style={styles.loading}>
                    ⏳ Cargando...
                </div>
            )}

            {cartData && (
                <div style={styles.results}>
                    <h3>📋 Datos del Carrito:</h3>
                    <pre style={styles.json}>
                        {JSON.stringify(cartData, null, 2)}
                    </pre>
                </div>
            )}

            <div style={styles.instructions}>
                <h3>📝 Instrucciones:</h3>
                <ol>
                    <li>Primero crea datos de prueba en la página principal</li>
                    <li>Usa ID de usuario: 2 o 3 (usuarios normales)</li>
                    <li>Crea un cómic de prueba o usa ID 1-8</li>
                    <li>Prueba agregar al carrito</li>
                    <li>Verifica que aparezca en el carrito</li>
                </ol>
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
    controls: {
        display: 'flex',
        gap: '15px',
        marginBottom: '20px',
        flexWrap: 'wrap'
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column'
    },
    input: {
        padding: '8px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        marginTop: '5px'
    },
    buttons: {
        display: 'flex',
        gap: '10px',
        marginBottom: '20px',
        flexWrap: 'wrap'
    },
    button: {
        padding: '10px 15px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
    },
    error: {
        backgroundColor: '#f8d7da',
        color: '#721c24',
        padding: '10px',
        borderRadius: '4px',
        marginBottom: '15px'
    },
    loading: {
        textAlign: 'center',
        padding: '20px',
        fontSize: '16px'
    },
    results: {
        backgroundColor: '#f8f9fa',
        padding: '15px',
        borderRadius: '4px',
        marginTop: '20px'
    },
    json: {
        backgroundColor: '#fff',
        padding: '10px',
        borderRadius: '4px',
        overflow: 'auto',
        fontSize: '12px'
    },
    instructions: {
        backgroundColor: '#e7f3ff',
        padding: '15px',
        borderRadius: '4px',
        marginTop: '20px'
    }
};

export default CartDebugComponent;