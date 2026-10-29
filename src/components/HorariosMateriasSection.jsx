import { useState, useEffect } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from './Table';
import BaseCard from './BaseCard';
import { getHorarios } from '../services/horariosService';

export default function HorariosMateriasSection() {
  const [horariosData, setHorariosData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        setLoading(true);
        const data = await getHorarios();
        setHorariosData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDatos();
  }, []);

  // Verificamos si hay alguna clase el sábado
  const tieneSabado = horariosData.some((h) => h.dia_semana === 'Sábado');
  const DIAS_SEMANA = tieneSabado
    ? ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
    : ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

  const formatearHora = (hora) => (hora ? hora.slice(0, 5) : '');

  // Obtener todas las franjas horarias únicas ordenadas
  const franjasUnicas = Array.from(
    new Set(
      horariosData.map(
        (h) => `${formatearHora(h.hora_inicio)} – ${formatearHora(h.hora_fin)}`
      )
    )
  ).sort();

  // Construir las filas de la grilla
  const grilla = franjasUnicas.map((franja) => {
    const [inicio, fin] = franja.split(' – ');

    // Filtrar los registros que caen en esta franja
    const itemsEnFranja = horariosData.filter(
      (h) =>
        formatearHora(h.hora_inicio) === inicio &&
        formatearHora(h.hora_fin) === fin
    );

    // Si hay un registro llamado "Recreo" (sin importar mayúsculas), toda la fila es recreo
    const esRecreo = itemsEnFranja.some((h) =>
      h.materia_nombre?.toLowerCase().includes('recreo')
    );

    const fila = { hora: franja, isRecreo: esRecreo };

    DIAS_SEMANA.forEach((dia) => {
      const item = itemsEnFranja.find((h) => h.dia_semana === dia);
      fila[dia.toLowerCase()] = item
        ? { materia: item.materia_nombre, prof: item.profesor_nombre }
        : null;
    });

    return fila;
  });

  const coloresPaleta = ['#143340', '#235459', '#518C8C', '#8BD9CA', '#0A1C22'];
  const resumenMateriasMap = new Map();

  horariosData.forEach((h) => {
    // Omitimos el recreo del resumen de tarjetas
    if (h.materia_nombre?.toLowerCase().includes('recreo')) return;

    const diaCorto = h.dia_semana.slice(0, 3); // Ej: Lun, Mar, Mié

    if (resumenMateriasMap.has(h.materia_id)) {
      const existente = resumenMateriasMap.get(h.materia_id);
      if (!existente.dias.includes(diaCorto)) {
        existente.dias.push(diaCorto);
      }
    } else {
      resumenMateriasMap.set(h.materia_id, {
        materia: h.materia_nombre,
        dias: [diaCorto],
        color: coloresPaleta[resumenMateriasMap.size % coloresPaleta.length],
      });
    }
  });

  const resumenMaterias = Array.from(resumenMateriasMap.values()).map((r) => ({
    ...r,
    dias: r.dias.join(' · '),
  }));

  if (loading)
    return (
      <div className="py-12 text-center text-petrol-600">
        Cargando grilla de horarios...
      </div>
    );
  if (error)
    return <div className="py-12 text-center text-red-600">Error: {error}</div>;

  return (
    <section
      id="horarios-materias"
      className="py-12 md:py-16 px-4 bg-petrol-50 text-petrol-900 animate-fade-in"
    >
      <div className="max-w-7xl mx-auto">
        {/* Encabezado */}
        <div className="mb-8">
          <h2 className="font-display text-petrol-900 text-[clamp(1.8rem,3.5vw,2.4rem)] leading-[1.1] mb-2">
            Horarios de materias
          </h2>
          <p className="text-petrol-600 text-xs md:text-sm">
            Grilla de cursada
          </p>
        </div>

        {/* Grilla Semanal */}
        <div className="overflow-x-auto">
          <Table className="border-petrol-100 shadow-sm overflow-hidden mb-6 min-w-[800px]">
            <Thead>
              <Tr className="bg-petrol-900 text-white">
                <Th className="text-mint-300 font-bold border-r border-white/10 w-36 py-4">
                  HORA
                </Th>
                {DIAS_SEMANA.map((dia) => (
                  <Th
                    key={dia}
                    align="center"
                    className="text-mint-300 font-bold border-r border-white/10 last:border-r-0 uppercase py-4"
                  >
                    {dia}
                  </Th>
                ))}
              </Tr>
            </Thead>

            <Tbody>
              {grilla.map((row, idx) => (
                /* Fila Normal */
                <Tr
                  key={idx}
                  className={idx % 2 === 0 ? 'bg-white' : 'bg-petrol-50/40'}
                >
                  <Td className="font-bold text-petrol-900 text-[0.78rem] border-r border-petrol-100 whitespace-nowrap py-3">
                    {row.hora}
                  </Td>
                  {DIAS_SEMANA.map((diaStr) => {
                    const cell = row[diaStr.toLowerCase()];
                    return (
                      <Td
                        key={diaStr}
                        className="border-r border-petrol-100 last:border-r-0 align-top py-3 px-3"
                      >
                        {cell ? (
                          <div className="flex flex-col gap-0.5">
                            <span className="font-semibold text-petrol-900 text-[0.8rem] leading-snug">
                              {cell.materia}
                            </span>
                            {cell.prof && (
                              <span className="text-petrol-600 text-[0.7rem]">
                                Prof. {cell.prof}
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="text-petrol-200 text-center block">
                            —
                          </span>
                        )}
                      </Td>
                    );
                  })}
                </Tr>
              ))}
              {grilla.length === 0 && (
                <Tr>
                  <Td
                    colSpan={DIAS_SEMANA.length + 1}
                    className="text-center py-8 text-petrol-400"
                  >
                    No hay horarios cargados para este cuatrimestre.
                  </Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </div>

        {/* Resumen inferior (BaseCard) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mt-8">
          {resumenMaterias.map((item, idx) => (
            <BaseCard
              key={idx}
              variant="default"
              padding="sm"
              className="bg-white border border-petrol-100 rounded-lg p-3 shadow-none flex flex-col justify-between"
            >
              <div>
                <span
                  className="inline-block w-2.5 h-2.5 rounded-full mb-2"
                  style={{ backgroundColor: item.color }}
                />
                <p className="font-bold text-petrol-900 text-[0.75rem] leading-snug">
                  {item.materia}
                </p>
              </div>
              <p className="text-petrol-500 text-[0.7rem] mt-2 capitalize font-semibold tracking-wide">
                {item.dias}
              </p>
            </BaseCard>
          ))}
        </div>
      </div>
    </section>
  );
}
