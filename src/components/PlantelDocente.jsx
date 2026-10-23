import React, { useState, useEffect } from 'react';
import ProfileCard from './ProfileCard';
import { getAutoridades, getProfesores, getBedeles } from '../services/docentesService';

// Datos oficiales actualizados
/*const AUTORIDADES = [
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
*/
export default function PlantelDocente() {
  const [autoridades, setAutoridades] = useState([]);
  const [docentes, setDocentes] = useState([]);
  const [ayudantes, setAyudantes] = useState([]);
  const [bedeles, setBedeles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function cargarPlantelPublico() {
      try {
        setLoading(true);
        const [autosData, profsData, bedsData] = await Promise.all([
          getAutoridades().catch(() => []),
          getProfesores().catch(() => []),
          getBedeles().catch(() => [])
        ]);

        setAutoridades(Array.isArray(autosData) ? autosData : []);

        const profsArray = Array.isArray(profsData) ? profsData : [];

        // 1. Docentes Titulares
        setDocentes(
          profsArray.filter((p) => !p.materias_detalle?.some((m) => m.rol === 'ayudante'))
        );

        // 2. Ayudantes de Trabajos Prácticos (ATP)
        setAyudantes(
          profsArray.filter((p) => p.materias_detalle?.some((m) => m.rol === 'ayudante'))
        );

        setBedeles(Array.isArray(bedsData) ? bedsData : []);
      } catch (err) {
        console.error('Error al cargar plantel en la vista pública:', err);
      } finally {
        setLoading(false);
      }
    }

    cargarPlantelPublico();
  }, []);

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
           {autoridades.map((a) => (
              <ProfileCard 
                key={a.id} 
                variant="dark" 
                title={a.nombre_responsable} 
                subtitle={a.cargo} 
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
            {docentes.map((d) => (
              <ProfileCard 
                key={d.id} 
                title={d.nombre_completo} 
                subtitle={d.materias_texto || 'Cátedra a designar'} 
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
            <div className="space-y-3">
              {ayudantes.length === 0 ? (
                <div className="bg-white border border-petrol-100 rounded-xl p-4 text-xs text-petrol-600">
                  No hay ayudantes registrados.
                </div>
              ) : (
                ayudantes.map((a) => (
                  <div
                    key={a.id}
                    className="bg-white border border-petrol-100 rounded-xl p-4 flex items-center gap-3 shadow-xs"
                  >
                    <span className="w-2 h-2 rounded-full bg-mint-400 shrink-0"></span>
                    <span className="text-sm font-semibold text-petrol-900">
                      {a.nombre_completo}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Bedeles */}
          <div>
            <h3 className="font-display text-petrol-900 text-[1.25rem] mb-4">
              Bedeles
            </h3>
            <div className="space-y-3">
              {bedeles.length === 0 ? (
                <div className="bg-white border border-petrol-100 rounded-xl p-4 text-xs text-petrol-600">
                  No hay bedeles registrados.
                </div>
              ) : (
                bedeles.map((b) => (
                  <div
                    key={b.id}
                    className="bg-white border border-petrol-100 rounded-xl p-4 flex items-center justify-between shadow-xs"
                  >
                    <span className="text-[0.7rem] uppercase tracking-widest font-bold text-petrol-600">
                      {b.anio_asignado}
                    </span>
                    <span className="text-sm font-semibold text-petrol-900">
                      {b.nombre}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}