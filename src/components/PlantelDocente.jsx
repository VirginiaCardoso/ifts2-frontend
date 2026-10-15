import React from 'react';
import ProfileCard from './ProfileCard';

// Datos
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
  { nombre: 'Prof. Evangelina Calderón', materias: 'Taller de Primeros Auxilios' }
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
        <div>
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

      </div>
    </section>
  );
}