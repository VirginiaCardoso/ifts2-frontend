import { useState, useEffect } from 'react';
import { getTramites, updateTramite } from '../../services/tramitesService';
import TramiteCard from './TramiteCard';

export default function TramitesView() {
  const [tramites, setTramites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        setLoading(true);
        const data = await getTramites();
        setTramites(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDatos();
  }, []);

  const handleUpdateTramite = async (id, updatedData) => {
    await updateTramite(id, updatedData);

    setTramites((prevTramites) =>
      prevTramites.map((t) =>
        t.id === id
          ? { ...t, descripcion_requisitos: updatedData.descripcion_requisitos }
          : t
      )
    );
  };

  if (loading)
    return <div className="p-8 text-gray-500">Cargando trámites...</div>;
  if (error) return <div className="p-8 text-red-500">Error: {error}</div>;

  return (
    <div className="animate-fade-in p-4 md:p-8 max-w-7xl mx-auto">
      {/* Encabezado Principal */}
      <div className="mb-10">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-[#143340] mb-3">
          Trámites y Enlaces Rápidos
        </h1>
        <p className="text-gray-500 text-sm md:text-base">
          Editá los requisitos de cada trámite de Bedelía y actualizá las URLs
          de los sistemas institucionales.
        </p>
      </div>

      {/* Sección Requisitos de Trámites */}
      <div>
        <h2 className="text-[#518C8C] font-bold text-xs md:text-sm uppercase tracking-widest mb-6">
          Requisitos de Trámites
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {tramites.map((tramite) => (
            <TramiteCard
              key={tramite.id}
              tramite={tramite}
              onSave={handleUpdateTramite}
            />
          ))}
          {tramites.length === 0 && (
            <div className="col-span-full text-center py-10 text-gray-400">
              No hay trámites registrados en el sistema.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
