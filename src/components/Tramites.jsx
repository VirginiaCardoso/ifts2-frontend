import React from 'react';
import BaseCard from './BaseCard';
import { TramitesIcon1, TramitesIcon2, TramitesIcon3, TramitesIcon4, TramitesIcon5, TramitesIcon6, TramitesIcon7, TramitesIcon8, TramitesIcon9 } from '../assets/icons';

// Iconos SVG de ejemplo para las tarjetas de trámites oscuras
const IconFile = (props) => (
  <TramitesIcon1 {...props} />
);
const IconArrow = () => (
  <TramitesIcon2 />
);
const IconStar = () => (
  <TramitesIcon3 />
);
const IconArrows = () => (
  <TramitesIcon4 />
);
const IconCallendar = () => (
  <TramitesIcon5 />
);
const IconTickets = () => (
  <TramitesIcon6 />
);
const IconHome = (props) => (
  <TramitesIcon7 {...props} />
);
const IconScholarship = (props) => (
  <TramitesIcon8 {...props} />
);
const IconClipboard = () => (
  <TramitesIcon9 />
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
