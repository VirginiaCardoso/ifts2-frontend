import { useEffect, useState } from 'react';
import { getNovedades } from '../services/novedadesService';

export default function usePublicNovedades() {
  const [newsList, setNewsList] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadNews() {
      try {
        const data = await getNovedades();
        if (isMounted && Array.isArray(data)) setNewsList(data);
      } catch (loadError) {
        if (isMounted) {
          setError(loadError.message || 'No se pudieron cargar las novedades');
          console.error('Error al cargar las novedades públicas:', loadError);
        }
      }
    }

    void loadNews();
    return () => {
      isMounted = false;
    };
  }, []);

  return { newsList, error };
}
