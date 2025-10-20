import React from 'react';
import CategoryLayout from './CategoryLayout';

export default function Merchandising(){
  return (
    <CategoryLayout 
      title="Merchandising" 
      subtitle="Remeras, tazas, pósters y más productos de tus franquicias favoritas"
      showProducts={true}
      filterType="merchandising"
    />
  );
}
