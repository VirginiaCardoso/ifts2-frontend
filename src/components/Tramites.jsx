import React from 'react';
import BaseCard from './BaseCard';

// Iconos SVG de ejemplo para las tarjetas de trámites oscuras
const IconFile = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="21"
    height="21"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinejoin="round"
  >
    <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" />
    <path d="M14 2v5a1 1 0 0 0 1 1h5" />
    <path d="M10 9H8" />
    <path d="M16 13H8" />
    <path d="M16 17H8" />
  </svg>
);
const IconArrow = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="21"
    height="21"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinejoin="round"
  >
    <path d="M16 7h6v6" />
    <path d="m22 7-8.5 8.5-5-5L2 17" />
  </svg>
);
const IconStar = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="21"
    height="21"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinejoin="round"
  >
    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
  </svg>
);
const IconArrows = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="21"
    height="21"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinejoin="round"
  >
    <path d="M8 3 4 7l4 4" />
    <path d="M4 7h16" />
    <path d="m16 21 4-4-4-4" />
    <path d="M20 17H4" />
  </svg>
);
const IconCallendar = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="21"
    height="21"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinejoin="round"
  >
    <path d="M8 2v3" />
    <path d="M16 2v3" />
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M3 9h18" />
    <path d="M8 13h.01" />
    <path d="M12 13h.01" />
    <path d="M16 13h.01" />
    <path d="M8 17h.01" />
    <path d="M12 17h.01" />
    <path d="M16 17h.01" />
  </svg>
);
const IconTickets = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="21"
    height="21"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinejoin="round"
  >
    <path d="m3.173 8.18 11-5a2 2 0 0 1 2.647.993L18.56 8" />
    <path d="M6 10V8" />
    <path d="M6 14v1" />
    <path d="M6 19v2" />
    <rect x="2" y="8" width="20" height="13" rx="2" />
  </svg>
);
const IconHome = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinejoin="round"
  >
    <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
    <path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
  </svg>
);
const IconScholarship = (props) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="8" r="7" />
    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
  </svg>
);
const IconClipboard = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="12" x="2" y="6" rx="2" />
    <circle cx="12" cy="12" r="2" />
    <path d="M6 12h.01M18 12h.01" />
  </svg>
);

const TRAMITES_CLAROS = [
  {
    title: 'Certificado de alumno regular',
    desc: 'Solicitalo con 48 hs de anticipación. Completar y dejar en Caja Azul de Rectoría para firma.',
    icon: IconFile,
  },
  {
    title: 'Analítico Parcial',
    desc: 'Para becas, concursos y traslados. Incluir Nombre, DNI, año de cursada, horarios y fecha.',
    icon: IconArrow,
  },
  {
    title: 'Certificado de asistencia a examen',
    desc: 'Solicitalo en Bedelía. Necesario para acreditar presentación a mesa de examen final.',
    icon: IconStar,
  },
  {
    title: 'Presentación de Equivalencias',
    desc: 'Primeras 2 semanas de inicio de cuatrimestre. Presentar programa de materia con carátula foliada.',
    icon: IconArrows,
  },
  {
    title: 'Inscripción a materias',
    desc: 'Realizá tu inscripción vía SIU Guaraní. Los horarios se visualizan en el sistema.',
    icon: IconCallendar,
  },
  {
    title: 'Boleto Estudiantil',
    desc: 'Información del GCBA para el trámite del Boleto Estudiantil de nivel terciario.',
    icon: IconTickets,
  },
];

const TRAMITES_OSCUROS = [
  {
    title: 'Mi Argentina • Título Digital',
    desc: 'Verificá tu título emitido por GCBA en sistema SITED',
    href: 'https://www.argentina.gob.ar/',
    icon: IconScholarship,
  },
  {
    title: 'Becas PROGRESAR Superior',
    desc: 'Becas educativas - ANSES',
    href: 'https://www.anses.gob.ar/',
    icon: IconClipboard,
  },
  {
    title: 'SIU Guaraní • Gestión Académica',
    desc: 'Acceso para profesores y secretaria',
    href: 'https://guarani-gestionagencia.bue.edu.ar/',
    icon: IconHome,
  },
];
export default function Tramites() {
  return (
    <section
      id="tramites"
      className="bg-petrol-50 py-5 px-6 md:px-12 font-sans w-full"
    >
      <div className="max-w-7xl mx-auto">
        <div className=" flex flex-col items-center justify-center">
          {/* Cabecera de la sección */}

          <p className="text-petrol-600 text-[0.7rem] font-bold tracking-[0.14em] uppercase mb-2">
            Bedelía • Secretaría Académica
          </p>
          <h2 className="font-display text-petrol-900 text-[clamp(1.8rem,4vw,2.8rem)] leading-[1.1]">
            Trámites y gestiones
          </h2>
          <p className="flex items-center gap-2 mt-2 text-sm text-gray-400 font-small">
            Contacto Bedelía:
            <a
              href="mailto:bedelia.ifts2@gmail.com"
              className="text-petrol-900 "
            >
              bedelia.ifts2@gmail.com
            </a>
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 w-full">
          {TRAMITES_CLAROS.map((item, index) => (
            <BaseCard
              variant="default"
              key={index}
              padding="md"
              className="h-full flex flex-col items-start gap-3 hover:shadow-lg transition-all duration-200"
            >
              {/* Contenedor del ícono */}

              {item.icon && (
                <div className="bg-petrol-50 text-petrol-700 rounded-lg w-9 h-9 flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5" />
                </div>
              )}
              <p className="text-petrol-700 font-bold text-sm leading-snug">
                <span>{item.title}</span>
              </p>
              {item.desc && (
                <p className="text-gray-500 text-[0.8rem] leading-relaxed">
                  {item.desc}
                </p>
              )}
            </BaseCard>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 w-full">
          {TRAMITES_OSCUROS.map((item, index) => (
            <a
              key={index}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="block group no-underline  "
            >
              <BaseCard
                variant="dark"
                padding="sm"
                className="h-full flex items-center gap-3.5 
                                hover:bg-petrol-800"
              >
                {/* Contenedor del ícono */}
                {item.icon && (
                  <div className="bg-petrol-700 text-[#8BD9CA] rounded-lg w-9 h-9 flex border-1 border-[var(--color-mint-500)] items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-mint-300 font-bold text-sm leading-snug flex items-center gap-1 ">
                    <span className="truncate">{item.title}</span>
                    <span className="text-mint-400 text-xs font-normal shrink-0 bg-transparent p-0 m-0 border-none">
                      ↗
                    </span>
                  </p>
                  {item.desc && (
                    <p className="text-gray-500 text-[0.8rem] mt-0.5 truncate">
                      {item.desc}
                    </p>
                  )}
                </div>
              </BaseCard>
            </a>
          ))}
        </div>
        <div className="mt-9 pt-6 border-t border-mint-400"></div>
      </div>
    </section>
  );
}
