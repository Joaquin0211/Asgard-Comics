import React from 'react';
import CategoryLayout from './CategoryLayout';

export default function Merchandising(){
  return (
    <CategoryLayout 
      title="Merchandising" 
      subtitle="Remeras, tazas, pósters y más productos de tus franquicias favoritas"
      showProducts={true}
      customFilter={(comics) => {
        // Simular merchandising basado en cómics
        if (!Array.isArray(comics) || comics.length === 0) {
          return [];
        }
        
        const merchTypes = [
          { type: 'Remera', category: 'Ropa' },
          { type: 'Taza', category: 'Hogar' },
          { type: 'Póster', category: 'Decoración' },
          { type: 'Llavero', category: 'Accesorios' },
          { type: 'Stickers', category: 'Decoración' },
          { type: 'Gorra', category: 'Ropa' }
        ];
        
        return comics.slice(0, 6).map((comic, index) => {
          const merchItem = merchTypes[index % merchTypes.length];
          const characterName = comic.title ? comic.title.split(' ')[0] : 'Personaje';
          return {
            id: comic.id,
            originalId: comic.id,
            title: `${merchItem.type} de ${characterName}`,
            author: `${merchItem.category} Oficial`,
            price: Math.round((comic.price || 0) * 0.6 * 100) / 100,
            stock: comic.stock || 0,
            description: `${merchItem.type} oficial con diseño de ${comic.title || 'personaje'} - Alta calidad`,
            imageUrl: comic.imageUrl,
            category: 'merchandising'
          };
        });
      }}
    />
  );
}
