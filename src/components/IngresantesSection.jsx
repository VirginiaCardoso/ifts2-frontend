import { useState, useEffect } from 'react';
import { ingresantesService } from '../services/ingresantesService';
import { IconoEtapaIngresante } from '../assets/icons';
import { formatearFecha } from '../utils/dateUtils';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const TIPOS_ICONO = ['documento', 'libro', 'check', 'reloj'];

export default function IngresantesSection() {
  const [etapas, setEtapas] = useState([]);
  const [documento, setDocumento] = useState(null);
  const [loading, setLoading] = useState(true);
  const [documentoLoading, setDocumentoLoading] = useState(true);
  
  useEffect(() => {
    const cargarDatosPublicos = async () => {
      try {
        setLoading(true);
        const data = await ingresantesService.obtenerDatosIngresantes();
        setEtapas(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error al cargar los datos de ingresantes:", err);
      } finally {
        setLoading(false);
      }
    };

    const cargarDocumento = async () => {
      try {
        setDocumentoLoading(true);
        const data = await ingresantesService.obtenerDocumento();
        setDocumento(data);
      } catch (err) {
        setDocumento(null);
        console.error('Error al cargar el documento de ingresantes:', err);
      } finally {
        setDocumentoLoading(false);
      }
    };

    void cargarDatosPublicos();
    void cargarDocumento();
  }, []);

  const hayDocumento = Boolean(
    documento?.nombre || documento?.url_archivo || documento?.ruta_archivo
  );
  return (
    <section
      id="carrera-requisitos"
      className="bg-petrol-50 px-4 py-12 text-petrol-900 scroll-mt-20 md:px-4 md:py-16"
    >
      <div className="mx-auto max-w-7xl">
        {/* Cabecera de la sección */}
        <div className="mb-4">
          <h2 className="font-display text-petrol-900 text-2xl md:text-3xl">
            Fechas importantes para ingresantes
          </h2>
        </div>

        {/* Subtítulo*/}
        <p className="text-petrol-600 text-xs md:text-sm mb-8 leading-relaxed">
          El proceso de admisión al IFTS N.º 2 se desarrolla en etapas. A
          continuación encontrás el calendario orientativo de cada instancia.
        </p>

        {/* Tarjetas de las etapas */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {loading ? (
            <p className="text-sm text-petrol-600 col-span-full text-center py-6">
              Cargando etapas...
            </p>
          ) : etapas.length > 0 ? (
            etapas.map((etapa, index) => {
              const tipoIconoAsignado = TIPOS_ICONO[index % TIPOS_ICONO.length];

              return (
                <article
                  key={etapa.id || index}
                  className="flex min-h-40 gap-4 rounded-2xl border border-petrol-100 bg-white p-5 md:p-6"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-petrol-900 text-mint-400">
                    <IconoEtapaIngresante tipo={tipoIconoAsignado} />
                  </div>

                  <div className="min-w-0">
                    <span className="inline-block rounded bg-petrol-900 px-2.5 py-1 text-[11px] font-bold tracking-wider text-mint-400">
                      ETAPA {String(etapa.orden ?? index + 1).padStart(2, '0')}
                    </span>

                    <h3 className="mt-2 font-body text-base font-bold leading-snug text-petrol-900">
                      {etapa.nombre || etapa.titulo}
                    </h3>

                    <p className="mt-2 font-body text-sm leading-6 text-petrol-800">
                      {etapa.descripcion}
                    </p>

                    {(etapa.fecha_inicio || etapa.fecha_fin) && (
                      <span className="inline-block mt-2 text-xs font-semibold text-petrol-600">
                        📅 {formatearFecha(etapa.fecha_inicio)}
                        {etapa.fecha_inicio && etapa.fecha_fin && ' - '}
                        {etapa.fecha_fin && formatearFecha(etapa.fecha_fin)}
                      </span>
                    )}
                  </div>
                </article>
              );
            })
          ) : (
            <p className="text-sm text-petrol-600 col-span-full text-center py-6">
              No hay etapas disponibles en este momento.
            </p>
          )}
        </div>

        {/* Documento informativo dinámico */}
        <div className="mt-7 flex flex-col gap-4 rounded-2xl border border-petrol-100 bg-white p-5 sm:flex-row sm:items-center sm:justify-between md:px-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-mint-300 text-petrol-900">
              <IconoEtapaIngresante tipo="documento" />
            </div>

            <div>
              <h3 className="font-body font-bold text-petrol-900">
                Información completa para ingresantes
              </h3>

              <p className="mt-1 font-body text-sm text-petrol-600">
                {documento?.nombre ||
                  'Fechas, requisitos y detalles del proceso de admisión'}
              </p>
            </div>
          </div>
          {hayDocumento ? (
            <a
              href={`${API_URL}/api/documentos/ingresantes/descargar`}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-petrol-900 px-5 py-3 font-body text-xs font-bold text-mint-300 transition-colors hover:bg-petrol-800 focus:outline-none focus:ring-2 focus:ring-mint-400 w-fit"
            >
              Descargar documento
            </a>
          ) : (
            <button
              type="button"
              disabled
              title={documentoLoading ? 'Cargando documento' : 'No hay documento disponible'}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-gray-300 px-5 py-3 font-body text-xs font-bold text-gray-500 cursor-not-allowed w-fit"
            >
              Descargar documento
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
