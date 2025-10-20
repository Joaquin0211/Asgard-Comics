import { useState, useEffect } from 'react';
import { updateComic } from '../services/api';
import './EditComicModal.css';

function EditComicModal({ comic, isVisible, onClose, onUpdate }) {
  const [editData, setEditData] = useState({
    title: '',
    author: '',
    price: '',
    stock: '',
    description: '',
    imageUrl: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (comic && isVisible) {
      setEditData({
        title: comic.title || '',
        author: comic.author || '',
        price: comic.price || '',
        stock: comic.stock || '',
        description: comic.description || '',
        imageUrl: comic.imageUrl || ''
      });
      setErrors({});
    }
  }, [comic, isVisible]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!editData.title.trim()) newErrors.title = 'Título es requerido';
    if (!editData.author.trim()) newErrors.author = 'Autor es requerido';
    if (!editData.price || editData.price <= 0) newErrors.price = 'Precio debe ser mayor a 0';
    if (editData.stock === '' || editData.stock < 0) newErrors.stock = 'Stock debe ser 0 o mayor';
    if (!editData.description.trim()) newErrors.description = 'Descripción es requerida';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setEditData(prev => ({ ...prev, [field]: value }));
    
    // Limpiar error del campo cuando el usuario empiece a escribir
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
    
    try {
      const updatedComic = {
        ...editData,
        price: parseFloat(editData.price),
        stock: parseInt(editData.stock, 10)
      };

      await updateComic(comic.id, updatedComic);
      
      alert('Producto actualizado exitosamente');
      onUpdate(); // Callback para refrescar la lista
      onClose();
    } catch (error) {
      console.error('Error actualizando producto:', error);
      alert('Error actualizando producto: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="edit-modal-overlay">
      <div className="edit-modal">
        <div className="edit-modal-header">
          <h2>Editar Producto</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="edit-modal-content">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Título *</label>
              <input
                type="text"
                value={editData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className={errors.title ? 'error' : ''}
                placeholder="Título del producto"
              />
              {errors.title && <span className="error-text">{errors.title}</span>}
            </div>

            <div className="form-group">
              <label>Autor *</label>
              <input
                type="text"
                value={editData.author}
                onChange={(e) => handleInputChange('author', e.target.value)}
                className={errors.author ? 'error' : ''}
                placeholder="Autor del producto"
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
                  value={editData.price}
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
                  value={editData.stock}
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
                value={editData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className={errors.description ? 'error' : ''}
                placeholder="Descripción del producto"
                rows="4"
              />
              {errors.description && <span className="error-text">{errors.description}</span>}
            </div>

            <div className="form-group">
              <label>URL de Imagen</label>
              <input
                type="url"
                value={editData.imageUrl}
                onChange={(e) => handleInputChange('imageUrl', e.target.value)}
                placeholder="https://ejemplo.com/imagen.jpg"
              />
            </div>

            <div className="form-actions">
              <button 
                type="button" 
                onClick={onClose} 
                className="cancel-btn"
                disabled={loading}
              >
                Cancelar
              </button>
              <button 
                type="submit" 
                disabled={loading}
                className="save-btn"
              >
                {loading ? 'Guardando...' : 'Guardar Cambios'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditComicModal;