import BaseCard from './BaseCard';
import { PromocionablesSectionIcon1, PromocionablesSectionIcon2, PromocionablesSectionIcon3 } from '../assets/icons';

export default function PromocionablesSection() {
  const materiasPromo = [
    {
      year: '1° Año',
      headerBg: 'bg-petrol-900', // #143340
      cuatrimestres: [
        {
          label: '1° CUATRIMESTRE',
          materias: [
            'Introducción a la Gastronomía',
            'Seguridad e Higiene en la Gastronomía'
          ]
        },
        {
          label: '2° CUATRIMESTRE',
          materias: [
            'Taller de Informática',
            'Taller de Comunicación Escrita'
          ]
        }
      ]
    },
    {
      year: '2° Año',
      headerBg: 'bg-petrol-700', // #235459
      cuatrimestres: [
        {
          label: '1° CUATRIMESTRE',
          materias: [
            'Nutrición'
          ]
        },
        {
          label: '2° CUATRIMESTRE',
          materias: [
            'Panadería básica',
            'Herramientas de Investigación'
          ]
        }
      ]
    },
    {
      year: '3° Año',
      headerBg: 'bg-petrol-600', // #518C8C
      cuatrimestres: [
        {
          label: '1° CUATRIMESTRE',
          materias: [
            'Seminario de actualización I'
          ]
        },
        {
          label: '2° CUATRIMESTRE',
          materias: [
            'Seminario de actualización II'
          ]
        }
      ]
    }
  ];

  return (
    <section id="carrera-promocionables" className="pt-4 pb-12 md:pb-16 px-4 bg-petrol-50 text-petrol-900 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        
        {/* Cabecera de la sección + Botón de Descarga PDF */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h3 className="font-display text-petrol-900 text-2xl md:text-3xl">
            Materias promocionables
          </h3>
          <a
            href="/docs/materias_promocionables.pdf"
            download
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-petrol-900 text-mint-300 hover:bg-petrol-800 text-xs font-bold px-4 py-2.5 rounded-lg transition-colors w-fit"
          >
            <PromocionablesSectionIcon1 />
            Descargar PDF
          </a>
        </div>

        {/* Caja de Alerta Informativa */}
        <div className="bg-mint-300/60 border border-mint-400 rounded-xl p-4 md:p-5 mb-10 flex gap-3.5 items-start">
          <PromocionablesSectionIcon2 />
          <p className="text-petrol-900 text-xs md:text-sm leading-relaxed">
            Una materia es <strong className="font-bold">promocional</strong> cuando se estipula que si se cumplen determinados requisitos no se deberá rendir examen final; una vez concluida la cursada se dará por aprobada la materia en su totalidad.
          </p>
        </div>

        {/* Grilla de Tarjetas por Año */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {materiasPromo.map((bloque, idx) => (
            <BaseCard key={idx} variant="default" padding="none" className="!p-0 border border-petrol-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col h-full bg-white">
              
              {/* Cabecera del Año */}
              <div className={`${bloque.headerBg} text-white px-6 py-3.5`}>
                <h4 className="font-display text-lg">{bloque.year}</h4>
              </div>

              {/* Contenido de Cuatrimestres */}
              <div className="p-5 flex flex-col gap-5 flex-grow">
                {bloque.cuatrimestres.map((cuatri, cIdx) => (
                  <div key={cIdx} className={cIdx > 0 ? "pt-4 border-t border-petrol-100" : ""}>
                    <p className="text-petrol-600 text-[0.68rem] font-bold tracking-wider uppercase mb-2.5">
                      {cuatri.label}
                    </p>
                    <ul className="flex flex-col gap-2">
                      {cuatri.materias.map((materia, mIdx) => (
                        <li key={mIdx} className="flex items-start gap-2.5 text-xs md:text-sm text-petrol-900">
                          {/* Pequeño ícono de tilde o viñeta institucional */}
                          <PromocionablesSectionIcon3 />
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