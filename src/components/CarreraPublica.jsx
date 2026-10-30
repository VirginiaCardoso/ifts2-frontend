import { PlanEstudiosSectionIcon1 } from '../assets/icons';
import { useCarreraData } from '../hooks/useCarreraData';
import { carreraFileUrl } from '../services/carreraService';
export function CarreraAviso() {
  const estado = useCarreraData();
  return (
    <p className="font-display text-xl leading-snug">
      {estado?.loading
        ? 'Cargando ciclo lectivo…'
        : estado?.error
          ? 'Información del ciclo no disponible'
          : estado?.data?.aviso ||
            'Consultá las fechas de inscripción en Bedelía.'}
    </p>
  );
}
export default function CarreraPublica({ tipo }) {
  const estado = useCarreraData();
  if (!estado) return null;
  const { data, loading, error } = estado;
  const correlativas = tipo === 'correlatividades';
  const promocionables = tipo === 'promocionables';
  const titulo = correlativas
    ? 'Correlatividades'
    : promocionables
      ? 'Materias promocionables'
      : 'Plan de estudios';
  const id = correlativas
    ? 'carrera-correlativas'
    : promocionables
      ? 'carrera-promocionables'
      : 'carrera-plan';
  const pdf =
    data?.documentos[
      correlativas
        ? 'correlatividades'
        : promocionables
          ? 'promocionables'
          : 'resolucion'
    ];
  const etiquetaPdf =
    correlativas || promocionables
      ? 'Descargar PDF'
      : 'Resolución oficial (PDF)';
  const clasePdf =
    'inline-flex items-center justify-center gap-2 rounded-xl bg-petrol-900 px-5 py-3 text-sm font-bold text-mint-300 transition-colors hover:bg-petrol-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-petrol-700';
  const materias = (data?.materias || []).filter(
    (m) => !promocionables || m.es_promocional
  );
  return (
    <section
      id={id}
      className="py-12 px-4 bg-petrol-50 text-petrol-900 scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <h3 className="text-3xl">{titulo}</h3>
          {pdf ? (
            <a
              className={clasePdf}
              href={`${carreraFileUrl(pdf.url)}?descargar=1`}
              download={pdf.nombre}
              aria-label={`${etiquetaPdf}: ${titulo}`}
            >
              <PlanEstudiosSectionIcon1 />
              {etiquetaPdf}
            </a>
          ) : (
            <button
              type="button"
              disabled
              className={`${clasePdf} cursor-not-allowed opacity-50`}
              title="Todavía no se cargó este PDF desde el panel"
              aria-label={`${etiquetaPdf}: ${titulo}. PDF no disponible`}
            >
              <PlanEstudiosSectionIcon1 />
              {etiquetaPdf}
            </button>
          )}
        </div>
        {loading && <p role="status">Cargando información…</p>}
        {error && (
          <p role="alert">
            No se pudo cargar la información de Carrera. Intentá nuevamente más
            tarde.
          </p>
        )}
        {!loading && !error && correlativas && data.nota_correlatividades && (
          <p className="mb-5 rounded-lg bg-petrol-100 p-3 text-xs text-petrol-700">
            {data.nota_correlatividades}
          </p>
        )}
        {!loading &&
          !error &&
          (correlativas ? (
            <div className="overflow-x-auto bg-white border border-petrol-100 rounded-xl">
              <table className="w-full text-left text-sm">
                <thead className="bg-petrol-100">
                  <tr>
                    <th className="p-4">Para cursar</th>
                    <th className="p-4">Requiere cursada</th>
                    <th className="p-4">Requiere aprobación</th>
                  </tr>
                </thead>
                <tbody>
                  {data.correlatividades.map((r) => (
                    <tr
                      key={r.materia_id}
                      className="border-t border-petrol-100"
                    >
                      <th className="p-4">{r.materia_nombre}</th>
                      <td className="p-4">
                        {r.cursadas.map((m) => m.nombre).join(' · ') || '—'}
                      </td>
                      <td className="p-4">
                        {r.aprobadas.map((m) => m.nombre).join(' · ') || '—'}
                      </td>
                    </tr>
                  ))}
                  {!data.correlatividades.length && (
                    <tr>
                      <td colSpan={3} className="p-4">
                        No hay reglas de correlatividad cargadas.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <>
              <p className="text-petrol-600 mb-6">
                {promocionables
                  ? 'Materias que permiten aprobar sin rendir examen final, cumpliendo los requisitos académicos.'
                  : 'Tecnicatura Superior en Emprendimientos Gastronómicos · Plan organizado por año y cuatrimestre.'}
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                {[1, 2, 3].map((anio) => (
                  <article
                    key={anio}
                    className="rounded-xl border border-petrol-100 bg-white overflow-hidden"
                  >
                    <h4 className="bg-petrol-900 text-white px-5 py-4 text-xl">
                      {anio}º Año
                    </h4>
                    {[1, 2].map((cuatrimestre) => (
                      <div key={cuatrimestre} className="p-5">
                        <p className="uppercase text-xs font-bold text-petrol-600 mb-3">
                          {cuatrimestre}º cuatrimestre
                        </p>
                        <ul className="space-y-2">
                          {materias
                            .filter(
                              (m) =>
                                Number(m.anio_carrera) === anio &&
                                (m.es_anual || m.cuatrimestre === cuatrimestre)
                            )
                            .map((m) => (
                              <li key={m.id} className="text-sm">
                                • {m.nombre}
                                {m.es_anual ? ' (anual)' : ''}
                              </li>
                            ))}
                        </ul>
                        {!materias.some(
                          (m) =>
                            Number(m.anio_carrera) === anio &&
                            (m.es_anual || m.cuatrimestre === cuatrimestre)
                        ) && (
                          <p className="text-sm text-petrol-600">
                            Sin materias cargadas.
                          </p>
                        )}
                      </div>
                    ))}
                  </article>
                ))}
              </div>
              {materias.some(
                (m) => !m.es_anual && ![1, 2].includes(m.cuatrimestre)
              ) && (
                <p className="mt-4 text-sm">
                  Hay materias pendientes de asignar a un cuatrimestre desde el
                  panel.
                </p>
              )}
            </>
          ))}
      </div>
    </section>
  );
}
