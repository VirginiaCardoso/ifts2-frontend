import React from 'react';
import ProfileCard from './ProfileCard';

// Datos oficiales actualizados
const AUTORIDADES = [
  { cargo: 'RECTORA', nombre: 'Prof. Alicia E. Ruidiaz' },
  { cargo: 'SECRETARIO ACADÉMICO', nombre: 'Lic. Leonardo Bermudez' },
  { cargo: 'SECRETARIA ADMINISTRATIVA', nombre: 'Prof. María Belén Orellano Camu' },
  { cargo: 'JEFATURA DE TRABAJOS PRÁCTICOS', nombre: 'Prof. Pedro Perez' },
  { cargo: 'TUTOR', nombre: 'Prof. Axel Trebino' }
];

const DOCENTES = [
  { nombre: 'Prof. Miguel Colloca', materias: 'Seguridad e Higiene en la Gastronomía' },
  { nombre: 'Prof. Daniel Buczel', materias: 'Elementos de Química' },
  { nombre: 'Prof. Evangelina Calderón', materias: 'Taller de Primeros Auxilios' },
  { nombre: 'Prof. Grisel de Landeta', materias: 'Introducción al Idioma Inglés · Inglés técnico' },
  { nombre: 'Prof. Iris Leyte', materias: 'Panadería básica · Pastelería · Repostería' },
  { nombre: 'Prof. Julia Sboro', materias: 'Laboratorio de Tecnología de los alimentos' },
  { nombre: 'Prof. Walter Albarracin', materias: 'Seminario de actualización y profundización I y II' },
  { nombre: 'Prof. Evangelina Aguilar Corcuera', materias: 'Nutrición' },
  { nombre: 'Prof. Camila Sabalsagaray Montera', materias: 'Introducción a la gastronomía · Industria de la hospitalidad' },
  { nombre: 'Prof. Axel Trebino', materias: 'Organización de eventos gastronómicos' },
  { nombre: 'Prof. Viviana Ferraro', materias: 'Taller de Francés técnico' }
];

const AYUDANTES = [
  'Prof. Gladis Casalegno',
  'Prof. Camila Sabalsagaray',
  'Prof. Julia Sboro'
];

const BEDELES = [
  { year: 'PRIMER AÑO', nombre: 'Sra. Andrea Barrios' },
  { year: 'SEGUNDO AÑO', nombre: 'Sra. Verónica Alarcón' },
  { year: 'TERCER AÑO', nombre: 'Sr. Esteban Suárez' }
];

export default function PlantelDocente() {
  return (
    <section id="plantel-docente" className="py-16 md:py-24 px-4 bg-petrol-50">
      <div className="max-w-7xl mx-auto">
        
        {/* Cabecera de la sección */}
        <div className="mb-12">
          <p className="text-petrol-600 text-[0.7rem] font-bold tracking-[0.14em] uppercase mb-2">
            IFTS N° 2 · Personal Académico
          </p>
          <h2 className="font-display text-petrol-900 text-[clamp(2rem,4vw,2.8rem)] leading-[1.1]">
            Plantel docente
          </h2>
        </div>

        {/* --- AUTORIDADES --- */}
        <div className="mb-12">
          <h3 className="font-display text-petrol-900 text-[1.4rem] mb-6">
            Autoridades
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {AUTORIDADES.map((autoridad, idx) => (
              <ProfileCard 
                key={idx} 
                variant="dark" 
                title={autoridad.nombre} 
                subtitle={autoridad.cargo} 
              />
            ))}
          </div>
        </div>

        {/* --- DOCENTES --- */}
        <div className="mb-12">
          <h3 className="font-display text-petrol-900 text-[1.4rem] mb-6">
            Docentes
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {DOCENTES.map((docente, idx) => (
              <ProfileCard 
                key={idx} 
                title={docente.nombre} 
                subtitle={docente.materias} 
              />
            ))}
          </div>
        </div>

        {/* --- AYUDANTES Y BEDELES (NUEVO BLOQUE) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10 pt-10 border-t border-petrol-100">
          
          {/* Profesores Ayudantes de Trabajos */}
          <div>
            <h3 className="font-display text-petrol-900 text-[1.25rem] mb-4">
              Profesores Ayudantes de Trabajos
            </h3>
            <div className="flex flex-col gap-2.5">
              {AYUDANTES.map((nombreAyudante, idx) => (
                <div key={idx} className="bg-white border border-petrol-100 rounded-xl p-3.5 flex items-center gap-3 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-mint-400 shrink-0" />
                  <span className="text-petrol-900 text-sm font-semibold">{nombreAyudante}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bedeles */}
          <div>
            <h3 className="font-display text-petrol-900 text-[1.25rem] mb-4">
              Bedeles
            </h3>
            <div className="flex flex-col gap-2.5">
              {BEDELES.map((bedel, idx) => (
                <div key={idx} className="bg-white border border-petrol-100 rounded-xl p-3.5 flex items-center justify-between shadow-sm">
                  <span className="text-petrol-600 text-xs font-bold tracking-wider uppercase">
                    {bedel.year}
                  </span>
                  <span className="text-petrol-900 text-sm font-bold">
                    {bedel.nombre}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}