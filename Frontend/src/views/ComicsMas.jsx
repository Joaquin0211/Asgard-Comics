import React, { useEffect, useState } from 'react';
import CategoryLayout from './CategoryLayout';
import { getComics } from '../services/api';
import ComicCard from '../components/ComicCard';

export default function ComicsMas(){
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try{
        setLoading(true);
        const data = await getComics();
        setItems(Array.isArray(data) ? data : []);
      }catch(err){
        setError('No se pudieron cargar los comics');
      }finally{
        setLoading(false);
      }
    })();
  },[]);

  return (
    <CategoryLayout title="Comics y Más" subtitle="Superhéroes, independientes y colecciones">
      {loading && <p>Cargando...</p>}
      {error && <p style={{color:'#9b1c1c'}}>{error}</p>}
      {!loading && !error && (
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(220px,1fr))', gap:'16px'}}>
          {items.map(c => (
            <ComicCard key={c.id} comic={c} />
          ))}
        </div>
      )}
    </CategoryLayout>
  );
}
