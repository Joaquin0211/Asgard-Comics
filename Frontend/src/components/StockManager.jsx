import React, { useEffect, useState } from 'react';
import { getComics, deleteComic } from '../services/api';
import { getProductImage } from '../utils/imageUtils';
import EditComicModal from './EditComicModal';
import ComicUploadForm from './ComicUploadForm';
import DataInitializer from './DataInitializer';
import './StockManager.css';

const StockManager = () => {
    console.log('StockManager se está renderizando');
    
    const [comics, setComics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedComic, setSelectedComic] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        loadComics();
    }, []);

    const loadComics = async () => {
        setLoading(true);
        try {
            const data = await getComics();
            console.log('Cómics cargados:', data);
            setComics(data);
            setError(null);
        } catch (err) {
            console.error('Error loading comics:', err);
            setError('Error cargando productos');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (comic) => {
        console.log('Editando comic:', comic);
        setSelectedComic(comic);
        setShowEditModal(true);
    };

    const handleDelete = async (comic) => {
        if (window.confirm(`¿Estás seguro de eliminar "${comic.title}"?`)) {
            try {
                await deleteComic(comic.id);
                await loadComics(); // Recargar lista
                alert('Producto eliminado exitosamente');
            } catch (error) {
                console.error('Error eliminando producto:', error);
                alert('Error eliminando producto');
            }
        }
    };

    const filteredComics = comics.filter(comic =>
        comic.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        comic.author?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStockStatus = (stock) => {
        if (stock === 0) return 'out-of-stock';
        if (stock <= 5) return 'low-stock';
        return 'in-stock';
    };

    const getStockText = (stock) => {
        if (stock === 0) return 'Agotado';
        if (stock <= 5) return 'Stock bajo';
        return 'En stock';
    };

    if (loading) return <div className="loading">Cargando productos...</div>;

    return (
        <div className="stock-manager">
            <div className="stock-header">
                <h2>Gestión de Inventario</h2>
                <button 
                    onClick={() => setShowAddForm(!showAddForm)} 
                    className="add-product-btn"
                >
                    {showAddForm ? 'Ver Inventario' : 'Agregar Producto'}
                </button>
            </div>

            {showAddForm ? (
                <div className="admin-forms">
                    <ComicUploadForm onProductAdded={() => {
                        loadComics();
                        setShowAddForm(false);
                    }} />
                    
                    {comics.length === 0 && (
                        <DataInitializer onDataLoaded={() => {
                            loadComics();
                        }} />
                    )}
                </div>
            ) : (
                <>
                    <div className="search-section">
                        <input
                            type="text"
                            placeholder="Buscar productos..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-input"
                        />
                        <div className="stats">
                            <span>Total: {comics.length} productos</span>
                            <span>Agotados: {comics.filter(c => c.stock === 0).length}</span>
                            <span>Stock bajo: {comics.filter(c => c.stock > 0 && c.stock <= 5).length}</span>
                        </div>
                    </div>

                    {error && <div className="error-message">{error}</div>}

                    <div className="products-grid">
                        {filteredComics.length === 0 ? (
                            <div className="no-products">
                                {searchTerm ? 'No se encontraron productos' : 'No hay productos disponibles'}
                            </div>
                        ) : (
                            filteredComics.map(comic => (
                                <div key={comic.id} className="product-card">
                                    <img 
                                        src={getProductImage(comic.title, comic.category, comic.imageUrl)} 
                                        alt={comic.title}
                                        className="product-image"
                                        onError={(e) => {
                                            e.target.src = getProductImage(comic.title, comic.category);
                                        }}
                                        loading="lazy"
                                    />
                                    <div className="product-info">
                                        <h3 className="product-title">{comic.title}</h3>
                                        <p className="product-author">por {comic.author}</p>
                                        <p className="product-price">${comic.price}</p>
                                        <div className={`stock-badge ${getStockStatus(comic.stock)}`}>
                                            {getStockText(comic.stock)} ({comic.stock})
                                        </div>
                                        {comic.description && (
                                            <p className="product-description">
                                                {comic.description.length > 100 
                                                    ? comic.description.substring(0, 100) + '...'
                                                    : comic.description
                                                }
                                            </p>
                                        )}
                                    </div>
                                    <div className="product-actions">
                                        <button 
                                            onClick={(e) => {
                                                console.log('Click en botón detectado!', comic);
                                                e.preventDefault();
                                                handleEdit(comic);
                                            }}
                                            className="edit-btn"
                                        >
                                            ✏️ Editar
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(comic)}
                                            className="delete-btn"
                                        >
                                            🗑️ Eliminar
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </>
            )}

            {/* Modal de Edición */}
            <EditComicModal
                comic={selectedComic}
                isVisible={showEditModal}
                onClose={() => {
                    setShowEditModal(false);
                    setSelectedComic(null);
                }}
                onUpdate={() => {
                    loadComics();
                }}
            />
        </div>
    );
};

export default StockManager;