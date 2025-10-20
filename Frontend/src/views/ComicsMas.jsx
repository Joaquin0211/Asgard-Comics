import React from 'react';
import CategoryLayout from './CategoryLayout';

export default function ComicsMas(){
  return (
    <CategoryLayout 
      title="Comics y Más" 
      subtitle="Superhéroes, independientes y colecciones de cómics"
      showProducts={true}
      filterType="comic"
    />
  );
}
