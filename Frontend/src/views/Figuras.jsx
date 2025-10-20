import React from 'react';
import CategoryLayout from './CategoryLayout';

export default function Figuras(){
  return (
    <CategoryLayout 
      title="Figuras" 
      subtitle="Estatuillas, articuladas y coleccionables de tus personajes favoritos"
      showProducts={true}
      filterType="figura"
    />
  );
}
