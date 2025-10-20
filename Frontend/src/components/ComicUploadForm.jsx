import React, { useState } from 'react';
import { createComic } from '../services/api';
import './ComicUploadForm.css';

const ComicUploadForm = ({ onProductAdded }) => {
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        price: '',
        stock: '',
        description: '',
        imageUrl: '',
        category: 'comic'
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});

    const categories = [
        { value: 'comic', label: 'Cómic' },
        { value: 'manga', label: 'Manga' },
        { value: 'figura', label: 'Figura' },
        { value: 'tcg', label: 'TCG/Cartas' },
        { value: 'merchandising', label: 'Merchandising' }
    ];

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.title.trim()) newErrors.title = 'Título es requerido';
        if (!formData.author.trim()) newErrors.author = 'Autor es requerido';
        if (!formData.price || parseFloat(formData.price) <= 0) newErrors.price = 'Precio debe ser mayor a 0';
        if (formData.stock === '' || parseInt(formData.stock) < 0) newErrors.stock = 'Stock debe ser 0 o mayor';
        if (!formData.description.trim()) newErrors.description = 'Descripción es requerida';
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        
        // Limpiar error del campo
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setLoading(true);
        setMessage('');

        try {
            const productData = {
                title: formData.title,
                author: formData.author,
                description: formData.description,
                price: parseFloat(formData.price),
                stock: parseInt(formData.stock),
                imageUrl: formData.imageUrl || 'https://via.placeholder.com/300x400'
            };

            await createComic(productData);
            
            setMessage(`¡${categories.find(c => c.value === formData.category)?.label} agregado exitosamente!`);
            
            // Resetear formulario
            setFormData({
                title: '',
                author: '',
                price: '',
                stock: '',
                description: '',
                imageUrl: '',
                category: 'comic'
            });
            
            // Callback para notificar que se agregó un producto
            if (onProductAdded) {
                onProductAdded();
            }
            
        } catch (error) {
            console.error('Error creando producto:', error);
            setMessage('Error creando producto: ' + (error.response?.data?.message || error.message));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="comic-upload-form">
            <h2>Agregar Nuevo Producto</h2>
            
            <form onSubmit={handleSubmit} className="upload-form">
                <div className="form-group">
                    <label>Categoría *</label>
                    <select
                        value={formData.category}
                        onChange={(e) => handleInputChange('category', e.target.value)}
                        className="category-select"
                    >
                        {categories.map(cat => (
                            <option key={cat.value} value={cat.value}>
                                {cat.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label>Título *</label>
                    <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        className={errors.title ? 'error' : ''}
                        placeholder="Título del producto"
                    />
                    {errors.title && <span className="error-text">{errors.title}</span>}
                </div>

                <div className="form-group">
                    <label>Autor/Creador *</label>
                    <input
                        type="text"
                        value={formData.author}
                        onChange={(e) => handleInputChange('author', e.target.value)}
                        className={errors.author ? 'error' : ''}
                        placeholder="Autor, artista o marca"
                    />
                    {errors.author && <span className="error-text">{errors.author}</span>}
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Precio *</label>
                        <input
                            type="number"
                            step="0.01"
                            min="0"
                            value={formData.price}
                            onChange={(e) => handleInputChange('price', e.target.value)}
                            className={errors.price ? 'error' : ''}
                            placeholder="0.00"
                        />
                        {errors.price && <span className="error-text">{errors.price}</span>}
                    </div>

                    <div className="form-group">
                        <label>Stock *</label>
                        <input
                            type="number"
                            min="0"
                            value={formData.stock}
                            onChange={(e) => handleInputChange('stock', e.target.value)}
                            className={errors.stock ? 'error' : ''}
                            placeholder="0"
                        />
                        {errors.stock && <span className="error-text">{errors.stock}</span>}
                    </div>
                </div>

                <div className="form-group">
                    <label>Descripción *</label>
                    <textarea
                        value={formData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        className={errors.description ? 'error' : ''}
                        placeholder="Descripción detallada del producto"
                        rows="4"
                    />
                    {errors.description && <span className="error-text">{errors.description}</span>}
                </div>

                <div className="form-group">
                    <label>URL de Imagen</label>
                    <input
                        type="url"
                        value={formData.imageUrl}
                        onChange={(e) => handleInputChange('imageUrl', e.target.value)}
                        placeholder="https://ejemplo.com/imagen.jpg"
                    />
                    <small className="form-hint">Si no se proporciona, se usará una imagen por defecto</small>
                </div>

                <div className="form-actions">
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="submit-btn"
                    >
                        {loading ? 'Agregando...' : 'Agregar Producto'}
                    </button>
                </div>
            </form>

            {message && (
                <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>
                    {message}
                </div>
            )}
        </div>
    );
};

export default ComicUploadForm;