import React, { useState } from 'react';
import { createComic } from '../services/api';
import { initialProducts } from '../data/initialProducts';
import './DataInitializer.css';

function DataInitializer({ onDataLoaded }) {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState('');

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
        
        {!loading ? (
          <button onClick={initializeData} className="init-btn">
            Agregar Productos de Prueba
          </button>
        ) : (
          <div className="loading-section">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="progress-text">{progress}% - {message}</p>
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