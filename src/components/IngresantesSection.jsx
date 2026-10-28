
const etapas = [
  {
    numero: "01",
    titulo: "Período de pre-inscripción y carga de documentación",
    descripcion:
      "Los aspirantes a la carrera completan el formulario de pre-inscripción en línea y adjuntan la documentación requerida.",
    icono: "documento",
  },
  {
    numero: "02",
    titulo: "Curso de preingreso",
    descripcion:
      "Jornadas de introducción a la carrera, metodología de estudio y presentación institucional.",
    icono: "libro",
  },
  {
    numero: "03",
    titulo: "Examen de preingreso",
    descripcion:
      "Evaluación de los conocimientos adquiridos durante el curso de preingreso.",
    icono: "check",
  },
  {
    numero: "04",
    titulo: "Confirmación de vacantes",
    descripcion:
      "Publicación de los resultados y confirmación de ingreso a la carrera para el ciclo lectivo.",
    icono: "reloj",
  },
];

function IconoEtapa({ tipo }) {
  const paths = {
    documento: (
      <>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6M8 13h8M8 17h8" />
      </>
    ),
    libro: (
      <>
        <path d="M12 7v14" />
        <path d="M3 5.5A2.5 2.5 0 0 1 5.5 3H12v18H5.5A2.5 2.5 0 0 1 3 18.5z" />
        <path d="M21 5.5A2.5 2.5 0 0 0 18.5 3H12v18h6.5a2.5 2.5 0 0 0 2.5-2.5z" />
      </>
    ),
    check: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="m7 12 3 3 7-7" />
      </>
    ),
    reloj: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
  };

  return (
    <svg
      width="23"
      height="23"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[tipo]}
    </svg>
  );
}

export default function IngresantesSection() {
  return (
    <section
      id="fechas-ingresantes"
      className="bg-petrol-50 px-4 py-12 text-petrol-900 scroll-mt-20 md:px-4 md:py-16"
    >
      <div className="mx-auto max-w-7xl">
        {/* Cabecera de la sección */}
        <div className="mb-4">
          <h2 className="font-display text-petrol-900 text-2xl md:text-3xl">
            Fechas importantes para ingresantes
          </h2>
        </div>

        {/* Subtítulo aclaratorio */}
        <p className="text-petrol-600 text-xs md:text-sm mb-8 leading-relaxed">
          El proceso de admisión al IFTS N.º 2 se desarrolla en etapas.
          A continuación encontrás el calendario orientativo de cada instancia.
        </p>

        {/* Tarjetas de las etapas */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {etapas.map((etapa) => (
            <article
              key={etapa.numero}
              className="flex min-h-40 gap-4 rounded-2xl border border-petrol-100 bg-white p-5 md:p-6"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-petrol-900 text-mint-400">
                <IconoEtapa tipo={etapa.icono} />
              </div>

              <div className="min-w-0">
                <span className="inline-block rounded bg-petrol-900 px-2.5 py-1 text-[11px] font-bold tracking-wider text-mint-400">
                  ETAPA {etapa.numero}
                </span>

                <h3 className="mt-2 font-body text-base font-bold leading-snug text-petrol-900">
                  {etapa.titulo}
                </h3>

                <p className="mt-2 font-body text-sm leading-6 text-petrol-800">
                  {etapa.descripcion}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* Documento informativo */}
        <div className="mt-7 flex flex-col gap-4 rounded-2xl border border-petrol-100 bg-white p-5 sm:flex-row sm:items-center sm:justify-between md:px-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-mint-300 text-petrol-900">
              <IconoEtapa tipo="documento" />
            </div>

            <div>
              <h3 className="font-body font-bold text-petrol-900">
                Información completa para ingresantes
              </h3>

              <p className="mt-1 font-body text-sm text-petrol-600">
                Fechas, requisitos y detalles del proceso de admisión
              </p>
            </div>
          </div>

          <a
            href="#contacto"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-petrol-900 px-5 py-3 font-body text-xs font-bold text-mint-300 transition-colors hover:bg-petrol-800 focus:outline-none focus:ring-2 focus:ring-mint-400 w-fit"
          >
            Ver documento
          </a>
        </div>
      </div>
    </section>
  );
}
