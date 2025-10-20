import React from 'react';
import CategoryLayout from './CategoryLayout';

export default function TCGJuegos(){
  return (
    <CategoryLayout 
      title="TCG y Juegos" 
      subtitle="Cartas coleccionables y juegos de mesa para todos los gustos"
      showProducts={true}
      customFilter={(comics) => {
        // Simular packs de TCG basados en cómics
        if (!Array.isArray(comics) || comics.length === 0) {
          return [];
        }
        
        const tcgTypes = ['Pokémon', 'Yu-Gi-Oh!', 'Magic TCG', 'Dragon Ball Super'];
        
        return comics.slice(2, 6).map((comic, index) => {
          const tcgGame = tcgTypes[index] || 'TCG Genérico';
          return {
            id: comic.id,
            originalId: comic.id,
            title: `Pack de Cartas ${tcgGame}`,
            author: `Booster Pack`,
            price: Math.round((comic.price || 0) * 0.8 * 100) / 100,
            stock: comic.stock || 0,
            description: `Pack de cartas coleccionables ${tcgGame} - Edición especial`,
            imageUrl: comic.imageUrl,
            category: 'tcg'
          };
        });
      }}
    />
  );
}
