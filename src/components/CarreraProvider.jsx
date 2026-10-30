import { useEffect, useState } from 'react';
import { CarreraContext } from '../hooks/CarreraContext';
import { carreraRequest } from '../services/carreraService';
import { escucharCambiosCarrera } from '../services/carreraUpdates';
export default function CarreraProvider({ children }) {
  const [estado, setEstado] = useState({
    data: null,
    loading: true,
    error: '',
  });
  useEffect(() => {
    let activo = true;
    let version = 0;
    async function cargar() {
      const actual = ++version;
      try {
        const data = await carreraRequest('/carrera');
        if (activo && actual === version)
          setEstado({ data, loading: false, error: '' });
      } catch (err) {
        if (activo && actual === version)
          setEstado((anterior) => ({
            ...anterior,
            loading: false,
            error: err.message,
          }));
      }
    }
    void cargar();
    const dejarEscuchar = escucharCambiosCarrera(cargar);
    return () => {
      activo = false;
      dejarEscuchar();
    };
  }, []);
  return (
    <CarreraContext.Provider value={estado}>{children}</CarreraContext.Provider>
  );
}
