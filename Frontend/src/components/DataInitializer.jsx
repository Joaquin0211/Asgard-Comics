import React, { useState } from 'react';
import { createComic, getComics } from '../services/api';
import { initialProducts } from '../data/initialProducts';
import axios from 'axios';
import './DataInitializer.css';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8080/api';

function DataInitializer({ onDataLoaded }) {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState('');
  const [clearingData, setClearingData] = useState(false);

  const clearAllData = async () => {
    setClearingData(true);
    setMessage('Limpiando base de datos...');
    
    try {
      // Obtener todos los comics y eliminarlos
      const allComics = await getComics();
      for (const comic of allComics) {
        try {
          await axios.delete(`${API_BASE}/comics/${comic.id}`);
        } catch (error) {
          console.log(`Error eliminando comic ${comic.id}:`, error);
        }
      }
      setMessage('Base de datos limpiada exitosamente.');
    } catch (error) {
      console.error('Error limpiando datos:', error);
      setMessage('Error limpiando la base de datos.');
    } finally {
      setClearingData(false);
    }
  };

  const initializeData = async () => {
    setLoading(true);
    setProgress(0);
    setMessage('Inicializando datos...');

    try {
      for (let i = 0; i < initialProducts.length; i++) {
        const product = initialProducts[i];
        
        try {
          await createComic(product);
          setProgress(Math.round(((i + 1) / initialProducts.length) * 100));
          setMessage(`Creado: ${product.title} (${i + 1}/${initialProducts.length})`);
          
          // Pequeña pausa para que el usuario pueda ver el progreso
          await new Promise(resolve => setTimeout(resolve, 200));
        } catch (error) {
          console.log(`Producto ya existe o error: ${product.title}`, error.message);
        }
      }

      setMessage(`¡Datos inicializados exitosamente! ${initialProducts.length} productos agregados.`);
      
      // Disparar evento para notificar que se inicializaron datos
      window.dispatchEvent(new Event('dataInitialized'));
      
      // Notificar que los datos fueron cargados
      if (onDataLoaded) {
        setTimeout(() => {
          onDataLoaded();
        }, 1000);
      }

    } catch (error) {
      console.error('Error inicializando datos:', error);
      setMessage('Error inicializando datos: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="data-initializer">
      <div className="initializer-content">
        <h3>Inicializar Datos de Prueba</h3>
        <p>Esto agregará productos de ejemplo con imágenes para probar el sistema.</p>
        
        {!loading && !clearingData ? (
          <div>
            <button onClick={initializeData} className="init-btn">
              Agregar Productos de Prueba
            </button>
            <button 
              onClick={clearAllData} 
              className="init-btn"
              style={{ marginLeft: '10px', backgroundColor: '#dc3545' }}
            >
              🗑️ Limpiar Base de Datos
            </button>
          </div>
        ) : (
          <div className="loading-section">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="progress-text">
              {clearingData ? 'Limpiando base de datos...' : `${progress}% - ${message}`}
            </p>
          </div>
        )}
        
        {message && !loading && (
          <div className={`result-message ${message.includes('Error') ? 'error' : 'success'}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default DataInitializer;