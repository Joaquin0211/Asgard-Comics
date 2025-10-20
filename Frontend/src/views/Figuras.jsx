import React from 'react';
import CategoryLayout from './CategoryLayout';

export default function Figuras(){
  return (
    <CategoryLayout 
      title="Figuras" 
      subtitle="Estatuillas, articuladas y coleccionables de tus personajes favoritos"
      showProducts={true}
      customFilter={(comics) => {
        // Simular figuras basadas en cómics
        if (!Array.isArray(comics) || comics.length === 0) {
          return [];
        }
        
        return comics.slice(0, 4).map((comic) => {
          const characterName = comic.title ? comic.title.split(' ')[0] : 'Personaje';
          return {
            id: comic.id,
            originalId: comic.id,
            title: `Figura de ${characterName}`,
            author: `Figura Coleccionable`,
            price: Math.round((comic.price || 0) * 2.5 * 100) / 100,
            stock: comic.stock || 0,
            description: `Figura coleccionable de alta calidad de ${comic.title || 'personaje'}`,
            imageUrl: comic.imageUrl,
            category: 'figura'
          };
        });
      }}
    />
  );
}
