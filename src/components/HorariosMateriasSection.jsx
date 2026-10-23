import { Table, Thead, Tbody, Tr, Th, Td } from './Table';
import BaseCard from './BaseCard';

// Datos de la grilla
const HORARIOS_GRILLA = [
  {
    hora: '18:00 – 18:40',
    lunes: { materia: 'Seguridad e Higiene', prof: 'Prof. Miguel Colloca' },
    martes: { materia: 'Elab. a base de vegetales', prof: 'Prof. Matías Pelaez' },
    miercoles: { materia: 'Nutrición', prof: 'Prof. Evangelina Aguilar' },
    jueves: { materia: 'Elab. a base de vegetales', prof: 'Prof. Matías Pelaez' },
    viernes: { materia: 'Intro a la Gastronomía', prof: '' },
  },
  {
    hora: '18:40 – 19:20',
    lunes: { materia: 'Seguridad e Higiene', prof: 'Prof. Miguel Colloca' },
    martes: { materia: 'Elab. a base de vegetales', prof: 'Prof. Matías Pelaez' },
    miercoles: { materia: 'Nutrición', prof: 'Prof. Evangelina Aguilar' },
    jueves: { materia: 'Elab. a base de vegetales', prof: 'Prof. Matías Pelaez' },
    viernes: { materia: 'Intro a la Gastronomía', prof: '' },
  },
  {
    hora: '19:20 – 20:00',
    lunes: { materia: 'Seguridad e Higiene', prof: 'Prof. Miguel Colloca' },
    martes: { materia: 'Elab. a base de vegetales', prof: 'Prof. Matías Pelaez' },
    miercoles: { materia: 'Nutrición', prof: 'Prof. Evangelina Aguilar' },
    jueves: { materia: 'Elab. a base de vegetales', prof: 'Prof. Matías Pelaez' },
    viernes: { materia: 'Intro a la Gastronomía', prof: '' },
  },
  {
    hora: '20:00 – 20:15',
    recreo: true,
  },
  {
    hora: '20:15 – 20:55',
    lunes: { materia: 'Primeros Auxilios', prof: 'Prof. Evangelina Calderón' },
    martes: { materia: 'T. de Comunicación Escrita', prof: 'Prof. Luciana Estevez' },
    miercoles: { materia: 'Nutrición', prof: 'Prof. Evangelina Aguilar' },
    jueves: { materia: 'Elab. a base de vegetales', prof: 'Prof. Matías Pelaez' },
    viernes: null,
  },
  {
    hora: '20:55 – 21:35',
    lunes: { materia: 'Primeros Auxilios', prof: 'Prof. Evangelina Calderón' },
    martes: { materia: 'T. de Comunicación Escrita', prof: 'Prof. Luciana Estevez' },
    miercoles: null,
    jueves: { materia: 'Elab. a base de vegetales', prof: 'Prof. Matías Pelaez' },
    viernes: null,
  },
  {
    hora: '21:35 – 22:15',
    lunes: { materia: 'Primeros Auxilios', prof: 'Prof. Evangelina Calderón' },
    martes: { materia: 'T. de Comunicación Escrita', prof: 'Prof. Luciana Estevez' },
    miercoles: null,
    jueves: { materia: 'Elab. a base de vegetales', prof: 'Prof. Matías Pelaez' },
    viernes: null,
  },
];

// reumen materias
const RESUMEN_MATERIAS = [
  { materia: 'Seguridad e Higiene', dias: 'Lunes', color: '#143340' },
  { materia: 'Elab. a base de vegetales', dias: 'Mar · Jue', color: '#235459' },
  { materia: 'Nutrición', dias: 'Miércoles', color: '#235459' },
  { materia: 'Intro a la Gastronomía', dias: 'Viernes', color: '#518C8C' },
  { materia: 'Primeros Auxilios', dias: 'Lunes', color: '#518C8C' },
  { materia: 'T. de Com. Escrita', dias: 'Martes', color: '#143340' },
];

export default function HorariosMateriasSection() {
  const DIAS = ['LUNES', 'MARTES', 'MIÉRCOLES', 'JUEVES', 'VIERNES'];

  return (
    <section id="horarios-materias" className="py-12 md:py-16 px-4 bg-petrol-50 text-petrol-900">
      <div className="max-w-7xl mx-auto">
        
        {/* Encabezado */}
        <div className="mb-8">
          <h2 className="font-display text-petrol-900 text-[clamp(1.8rem,3.5vw,2.4rem)] leading-[1.1] mb-2">
            Horarios de materias
          </h2>
          <p className="text-petrol-600 text-xs md:text-sm">
            Grilla de cursada · Primer Cuatrimestre 2026 · Turno vespertino
          </p>
        </div>

        {/* Grilla Semanal */}
        <Table className="border-petrol-100 shadow-sm overflow-hidden mb-6">
          <Thead>
            <Tr className="bg-petrol-900 text-white">
              <Th className="text-mint-300 font-bold border-r border-white/10 w-36">HORA</Th>
              {DIAS.map(dia => (
                <Th key={dia} align="center" className="text-mint-300 font-bold border-r border-white/10 last:border-r-0">
                  {dia}
                </Th>
              ))}
            </Tr>
          </Thead>

          <Tbody>
            {HORARIOS_GRILLA.map((row, idx) => (
              row.recreo ? (
                <Tr key={idx} isSpecial={true} className="!bg-[#fffbe6]">
                  <Td className="font-bold text-[#856404] text-[0.75rem] border-r border-petrol-100 whitespace-nowrap">
                    {row.hora}
                  </Td>
                  <Td colSpan={5} align="center" className="text-[#856404] font-bold tracking-widest text-[0.72rem] uppercase py-2">
                    RECREO
                  </Td>
                </Tr>
              ) : (
                <Tr key={idx} className={idx % 2 === 0 ? 'bg-petrol-50/40' : 'bg-white'}>
                  <Td className="font-bold text-petrol-900 text-[0.78rem] border-r border-petrol-100 whitespace-nowrap">
                    {row.hora}
                  </Td>
                  {[row.lunes, row.martes, row.miercoles, row.jueves, row.viernes].map((cell, cIdx) => (
                    <Td key={cIdx} className="border-r border-petrol-100 last:border-r-0 align-top py-3 px-3">
                      {cell ? (
                        <div className="flex flex-col gap-0.5">
                          <span className="font-semibold text-petrol-900 text-[0.8rem] leading-snug">
                            {cell.materia}
                          </span>
                          {cell.prof && (
                            <span className="text-petrol-600 text-[0.7rem]">
                              {cell.prof}
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-petrol-200 text-center block">—</span>
                      )}
                    </Td>
                  ))}
                </Tr>
              )
            ))}
          </Tbody>
        </Table>

        {/* Resumen inferior usando BaseCard */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {RESUMEN_MATERIAS.map((item, idx) => (
            <BaseCard
              key={idx}
              variant="default"
              padding="sm"
              className="bg-white border border-petrol-100 rounded-lg p-3 shadow-none flex flex-col justify-between"
            >
              <div>
                <span
                  className="inline-block w-2 h-2 rounded-full mb-2"
                  style={{ backgroundColor: item.color }}
                />
                <p className="font-semibold text-petrol-900 text-[0.78rem] leading-snug">
                  {item.materia}
                </p>
              </div>
              <p className="text-petrol-600 text-[0.7rem] mt-2">
                {item.dias}
              </p>
            </BaseCard>
          ))}
        </div>

      </div>
    </section>
  );
}