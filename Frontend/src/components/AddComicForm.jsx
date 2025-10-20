import React, { useState } from 'react';

const AddComicForm = ({ onComicAdded, onCancel }) => {
    const [comic, setComic] = useState({
        title: '',
        author: '',
        description: '',
        price: '',
        stock: '',
        imageUrl: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setComic(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // Validaciones básicas
            if (!comic.title.trim() || !comic.author.trim() || !comic.price || !comic.stock) {
                throw new Error('Por favor completa todos los campos obligatorios');
            }

            if (parseFloat(comic.price) <= 0) {
                throw new Error('El precio debe ser mayor a 0');
            }

            if (parseInt(comic.stock) < 0) {
                throw new Error('El stock no puede ser negativo');
            }

            const comicData = {
                ...comic,
                price: parseFloat(comic.price),
                stock: parseInt(comic.stock),
                imageUrl: comic.imageUrl.trim() || null
            };

            const response = await fetch('http://localhost:8080/api/comics', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(comicData),
            });

            if (!response.ok) {
                throw new Error('Error al agregar el cómic');
            }

            const newComic = await response.json();
            onComicAdded(newComic);
            
            // Limpiar formulario
            setComic({
                title: '',
                author: '',
                description: '',
                price: '',
                stock: '',
                imageUrl: ''
            });

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <div style={styles.header}>
                    <h2 style={styles.title}>📚 Agregar Nuevo Cómic</h2>
                    <button onClick={onCancel} style={styles.closeBtn}>✕</button>
                </div>

                {error && <div style={styles.error}>{error}</div>}

                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.row}>
                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Título *</label>
                            <input
                                type="text"
                                name="title"
                                value={comic.title}
                                onChange={handleInputChange}
                                style={styles.input}
                                placeholder="Ej: Spider-Man #1"
                                required
                            />
                        </div>
                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Autor *</label>
                            <input
                                type="text"
                                name="author"
                                value={comic.author}
                                onChange={handleInputChange}
                                style={styles.input}
                                placeholder="Ej: Stan Lee"
                                required
                            />
                        </div>
                    </div>

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Descripción</label>
                        <textarea
                            name="description"
                            value={comic.description}
                            onChange={handleInputChange}
                            style={styles.textarea}
                            placeholder="Descripción del cómic..."
                            rows={3}
                        />
                    </div>

                    <div style={styles.row}>
                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Precio *</label>
                            <input
                                type="number"
                                name="price"
                                value={comic.price}
                                onChange={handleInputChange}
                                style={styles.input}
                                placeholder="0.00"
                                step="0.01"
                                min="0"
                                required
                            />
                        </div>
                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Stock *</label>
                            <input
                                type="number"
                                name="stock"
                                value={comic.stock}
                                onChange={handleInputChange}
                                style={styles.input}
                                placeholder="0"
                                min="0"
                                required
                            />
                        </div>
                    </div>

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>URL de Imagen</label>
                        <input
                            type="url"
                            name="imageUrl"
                            value={comic.imageUrl}
                            onChange={handleInputChange}
                            style={styles.input}
                            placeholder="https://ejemplo.com/imagen.jpg"
                        />
                    </div>

                    <div style={styles.actions}>
                        <button 
                            type="button" 
                            onClick={onCancel}
                            style={styles.cancelBtn}
                        >
                            Cancelar
                        </button>
                        <button 
                            type="submit" 
                            disabled={loading}
                            style={{...styles.submitBtn, ...(loading ? styles.submitBtnDisabled : {})}}
                        >
                            {loading ? '🔄 Agregando...' : '✅ Agregar Cómic'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        padding: '20px'
    },
    modal: {
        backgroundColor: 'white',
        borderRadius: '12px',
        width: '100%',
        maxWidth: '600px',
        maxHeight: '90vh',
        overflow: 'auto',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 24px',
        borderBottom: '1px solid #e5e7eb',
        backgroundColor: '#f9fafb',
        borderRadius: '12px 12px 0 0'
    },
    title: {
        margin: 0,
        color: '#1f2937',
        fontSize: '20px',
        fontWeight: '600'
    },
    closeBtn: {
        background: 'none',
        border: 'none',
        fontSize: '20px',
        cursor: 'pointer',
        color: '#6b7280',
        padding: '4px',
        borderRadius: '4px'
    },
    form: {
        padding: '24px'
    },
    row: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '16px'
    },
    inputGroup: {
        marginBottom: '20px'
    },
    label: {
        display: 'block',
        marginBottom: '6px',
        fontWeight: '500',
        color: '#374151',
        fontSize: '14px'
    },
    input: {
        width: '100%',
        padding: '12px 16px',
        border: '1px solid #d1d5db',
        borderRadius: '8px',
        fontSize: '14px',
        transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
        boxSizing: 'border-box'
    },
    textarea: {
        width: '100%',
        padding: '12px 16px',
        border: '1px solid #d1d5db',
        borderRadius: '8px',
        fontSize: '14px',
        resize: 'vertical',
        fontFamily: 'inherit',
        boxSizing: 'border-box'
    },
    error: {
        margin: '0 24px 20px 24px',
        padding: '12px 16px',
        backgroundColor: '#fee2e2',
        color: '#dc2626',
        borderRadius: '8px',
        fontSize: '14px',
        border: '1px solid #fecaca'
    },
    actions: {
        display: 'flex',
        gap: '12px',
        justifyContent: 'flex-end',
        marginTop: '30px',
        paddingTop: '20px',
        borderTop: '1px solid #e5e7eb'
    },
    cancelBtn: {
        padding: '10px 20px',
        border: '1px solid #d1d5db',
        backgroundColor: 'white',
        color: '#374151',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '500'
    },
    submitBtn: {
        padding: '10px 20px',
        backgroundColor: '#3b82f6',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '500'
    },
    submitBtnDisabled: {
        backgroundColor: '#9ca3af',
        cursor: 'not-allowed'
    }
};

export default AddComicForm;