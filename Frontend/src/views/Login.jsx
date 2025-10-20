import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch('http://localhost:8080/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Error en el login');
            }

            // Guardar datos del usuario en localStorage
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            localStorage.setItem('currentUser', JSON.stringify(data.user)); // Para el carrito
            
            console.log('Login exitoso:', data);
            
            // Disparar evento personalizado para notificar al Navbar
            window.dispatchEvent(new Event('userLoggedIn'));
            
            // Redirigir según el rol del usuario
            if (data.user.role === 'ADMIN') {
                navigate('/owner-dashboard');
            } else {
                navigate('/user-dashboard');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container" style={styles.container}>
            <div style={styles.formBox}>
                <h2 style={styles.title}>✨ Iniciar Sesión</h2>
                {error && <p style={styles.error}>{error}</p>}
                <form onSubmit={handleLogin} style={styles.form}>
                    <div style={styles.inputGroup}>
                        <label htmlFor="email" style={styles.label}>Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={styles.input}
                            placeholder="tu@email.com"
                            onFocus={(e) => {
                                e.target.style.borderColor = '#667eea';
                                e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                                e.target.style.backgroundColor = 'white';
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = '#e1e8ed';
                                e.target.style.boxShadow = 'none';
                                e.target.style.backgroundColor = '#fafbfc';
                            }}
                        />
                    </div>
                    <div style={styles.inputGroup}>
                        <label htmlFor="password" style={styles.label}>Contraseña:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={styles.input}
                            placeholder="Tu contraseña"
                            onFocus={(e) => {
                                e.target.style.borderColor = '#667eea';
                                e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                                e.target.style.backgroundColor = 'white';
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = '#e1e8ed';
                                e.target.style.boxShadow = 'none';
                                e.target.style.backgroundColor = '#fafbfc';
                            }}
                        />
                    </div>
                    <button 
                        type="submit" 
                        disabled={loading}
                        style={{...styles.button, ...(loading ? styles.buttonDisabled : {})}}
                        onMouseEnter={(e) => {
                            if (!loading) {
                                e.target.style.transform = 'translateY(-2px)';
                                e.target.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.6)';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (!loading) {
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
                            }
                        }}
                    >
                        {loading ? '🔄 Iniciando...' : '🚀 Iniciar Sesión'}
                    </button>
                </form>
                
                <div style={styles.testCredentials}>
                    <h4 style={styles.testTitle}>👥 Usuarios de prueba:</h4>
                    
                    <div 
                        style={styles.credentialItem}
                        onClick={() => {setEmail('admin@asgard.com'); setPassword('admin123')}}
                        onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                        onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                    >
                        <span style={styles.credentialLabel}>🔐 Admin</span>
                        <span style={styles.credentialData}>admin@asgard.com / admin123</span>
                    </div>
                    
                    <div 
                        style={styles.credentialItem}
                        onClick={() => {setEmail('juan@email.com'); setPassword('user123')}}
                        onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                        onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                    >
                        <span style={styles.credentialLabel}>👤 Usuario</span>
                        <span style={styles.credentialData}>juan@email.com / user123</span>
                    </div>
                    
                    <div 
                        style={styles.credentialItem}
                        onClick={() => {setEmail('maria@email.com'); setPassword('user123')}}
                        onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                        onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                    >
                        <span style={styles.credentialLabel}>👤 Usuario</span>
                        <span style={styles.credentialData}>maria@email.com / user123</span>
                    </div>
                </div>
                
                <p style={styles.register}>
                    ¿No tienes cuenta? <a href="/register" style={styles.link}>Registrarse</a>
                </p>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)',
        padding: '20px',
        position: 'relative'
    },
    formBox: {
        backgroundColor: 'rgba(255, 255, 255, 0.98)',
        padding: '50px 40px',
        borderRadius: '20px',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)',
        width: '100%',
        maxWidth: '450px',
        position: 'relative',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(180, 180, 180, 0.2)'
    },
    title: {
        textAlign: 'center',
        marginBottom: '35px',
        color: '#2c3e50',
        fontSize: '32px',
        fontWeight: '700',
        letterSpacing: '-1px',
        position: 'relative'
    },
    form: {
        display: 'flex',
        flexDirection: 'column'
    },
    inputGroup: {
        marginBottom: '25px',
        position: 'relative'
    },
    label: {
        display: 'block',
        marginBottom: '8px',
        fontWeight: '600',
        color: '#34495e',
        fontSize: '14px',
        letterSpacing: '0.5px'
    },
    input: {
        width: '100%',
        padding: '16px 20px',
        border: '2px solid #e1e8ed',
        borderRadius: '12px',
        fontSize: '16px',
        boxSizing: 'border-box',
        transition: 'all 0.3s ease',
        backgroundColor: '#fafbfc',
        fontWeight: '500'
    },
    button: {
        padding: '16px 24px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        border: 'none',
        borderRadius: '12px',
        fontSize: '16px',
        fontWeight: '600',
        cursor: 'pointer',
        marginBottom: '25px',
        transition: 'all 0.3s ease',
        letterSpacing: '0.5px',
        textTransform: 'uppercase',
        boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
    },
    buttonDisabled: {
        background: 'linear-gradient(135deg, #bdc3c7 0%, #95a5a6 100%)',
        cursor: 'not-allowed',
        boxShadow: 'none'
    },
    error: {
        color: '#e74c3c',
        textAlign: 'center',
        marginBottom: '25px',
        padding: '12px 16px',
        backgroundColor: '#fdf2f2',
        border: '1px solid #fecaca',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: '500'
    },
    testCredentials: {
        backgroundColor: '#f8fafc',
        padding: '20px',
        borderRadius: '12px',
        marginBottom: '25px',
        fontSize: '14px',
        border: '1px solid #e2e8f0',
        position: 'relative'
    },
    testTitle: {
        color: '#4a5568',
        fontWeight: '700',
        marginBottom: '12px',
        fontSize: '16px'
    },
    credentialItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '8px 12px',
        margin: '6px 0',
        backgroundColor: 'white',
        borderRadius: '8px',
        border: '1px solid #e2e8f0',
        cursor: 'pointer',
        transition: 'all 0.2s ease'
    },
    credentialLabel: {
        fontWeight: '600',
        color: '#2d3748'
    },
    credentialData: {
        fontSize: '12px',
        color: '#718096',
        fontFamily: 'monospace'
    },
    register: {
        textAlign: 'center',
        marginTop: '25px',
        fontSize: '15px',
        color: '#64748b'
    },
    link: {
        color: '#667eea',
        textDecoration: 'none',
        fontWeight: '600',
        transition: 'color 0.2s ease'
    }
};

export default Login;