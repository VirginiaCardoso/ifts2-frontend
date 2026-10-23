import BaseCard from './BaseCard';
import { PlanEstudiosSectionIcon1 } from '../assets/icons';

export default function PlanEstudiosSection() {
  const planEstudios = [
    {
      anio: '1º Año',
      headerBg: 'bg-petrol-900',
      cuatrimestres: [
        {
          titulo: '1º CUATRIMESTRE',
          materias: [
            'Introducción a la Gastronomía',
            'Seguridad e Higiene en la Gastronomía',
            'Elementos de Química',
            'Taller de Primeros Auxilios'
          ]
        },
        {
          titulo: '2º CUATRIMESTRE',
          materias: [
            'Industria de la Hospitalidad',
            'Taller de Informática',
            'Taller de Comunicación Escrita',
            'Introducción al Idioma Inglés'
          ]
        }
      ]
    },
    {
      anio: '2º Año',
      headerBg: 'bg-petrol-700',
      cuatrimestres: [
        {
          titulo: '1º CUATRIMESTRE',
          materias: [
            'Elaboraciones a base de Vegetales',
            'Elaboraciones a base de Carnes',
            'Pizzas y Pastas',
            'Nutrición'
          ]
        },
        {
          titulo: '2º CUATRIMESTRE',
          materias: [
            'Panadería básica',
            'Herramientas de Investigación',
            'Organización empresarial',
            'Inglés técnico'
          ]
        }
      ]
    },
    {
      anio: '3º Año',
      headerBg: 'bg-petrol-600',
      cuatrimestres: [
        {
          titulo: '1º CUATRIMESTRE',
          materias: [
            'Buffet',
            'Cocina nacional e internacional',
            'Seminario de actualización I',
            'Práctica Profesional II'
          ]
        },
        {
          titulo: '2º CUATRIMESTRE',
          materias: [
            'Pastelería y Repostería',
            'Organización de eventos gastronómicos',
            'Seminario de actualización II',
            'Taller de Francés técnico'
          ]
        }
      ]
    }
  ];

  return (
    <section id="carrera-plan" className="py-10 md:py-14 px-4 bg-petrol-50 text-petrol-900 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        
        {/* Encabezado / Descripción de la carrera */}
        <div className="mb-10">
          <p className="text-petrol-600 text-xs font-bold tracking-[0.14em] uppercase mb-2">
            Hotelería y Gastronomía
          </p>
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] leading-[1.1] mb-4 text-petrol-900">
            Tecnicatura Superior en<br />
            <span style={{ fontStyle: 'italic' }} className="text-petrol-700">Emprendimientos Gastronómicos</span>
          </h2>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-4xl">
            Carrera presencial de 3 años, gratuita, con título oficial de alcance nacional. Turno vespertino, lunes a viernes de 18:00 a 22:00 hs. Sede: Cañada de Gómez 3850, Villa Lugano, CABA.
          </p>
        </div>

        {/* Título de la sección + Botón de Resolución PDF */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <h3 className="font-display text-petrol-900 text-2xl md:text-3xl">
            Plan de estudios
          </h3>
          <a
            href="#resolucion"
            onClick={(e) => { e.preventDefault(); alert('Descarga de resolución oficial (PDF)'); }}
            className="inline-flex items-center gap-2 bg-petrol-900 text-mint-300 hover:bg-petrol-800 text-xs font-bold px-4 py-2.5 rounded-lg transition-colors w-fit"
          >
            <PlanEstudiosSectionIcon1 />
            Resolución oficial (PDF)
          </a>
        </div>

        {/* Tarjetas de los 3 Años - Margen inferior reducido (mb-0) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-0">
          {planEstudios.map((bloque, idx) => (
            <BaseCard key={idx} variant="default" padding="none" className="!p-0 border border-petrol-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col h-full bg-white">
              
              <div className={`${bloque.headerBg} text-white px-6 py-3.5`}>
                <h4 className="font-display text-lg">{bloque.anio}</h4>
              </div>

              <div className="p-5 flex flex-col gap-4 flex-grow bg-white">
                {bloque.cuatrimestres.map((cuatri, cIdx) => (
                  <div key={cIdx} className={cIdx > 0 ? "pt-3 border-t border-petrol-100" : ""}>
                    <p className="text-petrol-600 text-[0.65rem] font-bold tracking-wider uppercase mb-2">
                      {cuatri.titulo}
                    </p>
                    <ul className="flex flex-col gap-1.5">
                      {cuatri.materias.map((materia, mIdx) => (
                        <li key={mIdx} className="flex items-start gap-2 text-xs md:text-sm text-petrol-900">
                          <span className="w-1.5 h-1.5 rounded-full bg-mint-400 mt-1.5 shrink-0" />
                          <span className="leading-snug">{materia}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

            </BaseCard>
          ))}
        </div>

      </div>
    </section>
  );
}