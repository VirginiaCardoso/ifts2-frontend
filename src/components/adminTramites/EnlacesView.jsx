import { useState, useEffect } from 'react';
import { getEnlaces, updateEnlace } from '../../services/enlacesServices';
import EnlaceRow from './EnlaceRow';

export default function EnlacesView() {
  const [enlaces, setEnlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        setLoading(true);
        const data = await getEnlaces();
        setEnlaces(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDatos();
  }, []);

  const handleUpdate = async (id, nuevaUrl) => {
    await updateEnlace(id, nuevaUrl);

    setEnlaces((prevEnlaces) =>
      prevEnlaces.map((e) =>
        e.id === id ? { ...e, url_destino: nuevaUrl } : e
      )
    );
  };

  if (loading)
    return (
      <div className="p-8 text-gray-500">
        Cargando enlaces institucionales...
      </div>
    );
  if (error) return <div className="p-8 text-red-500">Error: {error}</div>;

  return (
    <div className="animate-fade-in mt-10">
      {/* Cabecera de Sección */}
      <div className="mb-4">
        <h2 className="text-[#518C8C] font-bold text-xs md:text-sm uppercase tracking-widest mb-1">
          URLs de Sistemas Institucionales
        </h2>
        <p className="text-gray-400 text-xs md:text-sm">
          Estos enlaces aparecen como accesos rápidos en la página principal y
          el footer del sitio.
        </p>
      </div>

      {/* Contenedor de la Grilla */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="divide-y divide-gray-100">
          {enlaces.map((enlace) => (
            <EnlaceRow key={enlace.id} enlace={enlace} onSave={handleUpdate} />
          ))}

          {enlaces.length === 0 && (
            <div className="p-10 text-center text-gray-400">
              No hay enlaces institucionales configurados.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
