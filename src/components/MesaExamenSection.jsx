import { useState, useEffect } from 'react';
import MesaExamenCard from './MesaExamenCard';
import { getMesas } from '../services/mesasService';
import { formatearFecha } from '../utils/dateUtils';
const normalizar = (texto = '') =>
  texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();

export default function MesaExamenSection() {
  const [mesas, setMesas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [busqueda, setBusqueda] = useState('');
  const [anioCarrera, setAnioCarrera] = useState('');

  useEffect(() => {
    const fetchMesas = async () => {
      try {
        setLoading(true);
        const data = await getMesas();
        setMesas(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMesas();
  }, []);
  
  const mesasFiltradas = mesas.filter(
  (mesa) =>
    normalizar(mesa.materia_nombre).includes(normalizar(busqueda)) &&
    (!anioCarrera || Number(mesa.anio_carrera) === Number(anioCarrera))
  );


  const formatearHora = (horaString) => {
    if (!horaString) return '';
    return horaString.slice(0, 5) + ' hs';
  };

  return (
    <section
      id="carrera-mesas"
      className="pt-3 pb-14 px-6 md:px-12 bg-petrol-50 text-petrol-900 font-sans w-full"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex-col">
          {/* Cabecera de la sección */}
          <h2 className="max-w-7xl mx-auto font-display text-petrol-900 text-[1.6rem] leading-[1.1]">
            Mesas de exámenes finales
          </h2>
        </div>

        {loading ? (
          <div className="py-12 text-center text-petrol-600">
            Cargando mesas de exámenes...
          </div>
        ) : error ? (
          <div className="py-12 text-center text-red-600">Error: {error}</div>
        ) : (
          <>
   {mesas.length > 0 && (
     <div className="flex flex-col sm:flex-row gap-3 mt-6">
       <input
         type="search"
         aria-label="Buscar materia"
         placeholder="Buscar materia..."
         value={busqueda}
         onChange={(e) => setBusqueda(e.target.value)}
         className="w-full sm:max-w-sm border border-petrol-100 rounded-lg px-3 py-2 text-sm bg-white"
       />
       <select
         aria-label="Año de la carrera"
         value={anioCarrera}
         onChange={(e) => setAnioCarrera(e.target.value)}
         className="border border-petrol-100 rounded-lg px-3 py-2 text-sm bg-white"
       >
         <option value="">Todos los años</option>
         {[1, 2, 3].map((n) => <option key={n} value={n}>{n}º año</option>)}
       </select>
     </div>
   )}

 <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-8 w-full">
   {mesasFiltradas.map((mesa) => {
              const anioStr = String(mesa.anio_vigencia || '');
              const periodoStr = String(mesa.periodo || '');
              const anioAMostrar = periodoStr.includes(anioStr) ? '' : anioStr;
              return (
                <MesaExamenCard
                  key={mesa.id}
                  turno={mesa.periodo}
                  anio={anioAMostrar}
                  materia={mesa.materia_nombre}
                  fechas={formatearFecha(mesa.fecha, {
                    day: 'numeric',
                    month: 'long',
                  })}
                  horario={formatearHora(mesa.hora)}
                  tribunal={mesa.tribunal?.map((p) => p.nombre_completo) || []}
                />
              );
            })}
          </div>
          
            {mesas.length > 0 && mesasFiltradas.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No encontramos mesas con esos filtros.
              </div>
            )}
          </>

        )}

        {mesas.length === 0 && !loading && !error && (
          <div className="text-center py-8 text-gray-500">
            No hay mesas de exámenes publicadas en este momento.
          </div>
        )}

        <p className="text-xs text-gray-500 mt-8">
          * Para rendir exámenes finales debés inscribirte previamente en el
          sistema{' '}
          <a
            href="https://guarani-gestionagencia.bue.edu.ar/"
            target="_blank"
            rel="noreferrer"
            className="text-gray-500 font-bold hover:underline"
          >
            SIU Guaraní
          </a>
          . Las fechas pueden estar sujetas a cambios — consultá Bedelía para
          confirmación.
        </p>
      </div>
    </section>
  );
}
