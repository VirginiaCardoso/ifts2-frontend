import {
  MesaCalendar,
  MesaLapiz,
  MesaReloj,
  MesaTacho,
} from '../../assets/icons';

export default function MesaCard({ mesa, onEdit, onDelete }) {
  const formatearFecha = (fechaString) => {
    if (!fechaString) return '';
    const fecha = new Date(fechaString + 'T00:00:00');
    return fecha.toLocaleDateString('es-AR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const formatearHora = (horaString) => {
    if (!horaString) return '';
    return horaString.slice(0, 5) + ' hs';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col h-full">
      <div className="bg-[#143340] p-4 ">
        <>
          <div className="flex justify-between">
            <div className="flex items-center gap-2 text-white font-bold text-lg">
              <MesaCalendar />
              {mesa.periodo}
            </div>
            <p className="bg-[#C2F2E9] text-[#143340] text-[0.65rem] font-bold px-1 py-1 rounded uppercase tracking-wider shrink-0 ml-2">
              FINAL
            </p>
          </div>

          <p className="text-[#8BD9CA] text-sm font-semibold mt-1 truncate">
            {mesa.materia_nombre || 'Materia no asignada'}
          </p>
        </>
      </div>

      <div className="p-4 flex-1 flex flex-col gap-3">
        <div className="text-sm text-gray-600 flex items-center gap-2">
          <MesaReloj />
          {formatearHora(mesa.hora)}
        </div>

        <p className="font-bold text-[#143340] text-sm capitalize">
          {formatearFecha(mesa.fecha)}
        </p>

        <div className="mt-2 flex-1">
          <p className="text-[0.7rem] font-bold text-gray-400 uppercase tracking-widest mb-2">
            Tribunal
          </p>
          <ul className="space-y-1">
            {mesa.tribunal?.map((prof, idx) => (
              <li
                key={idx}
                className="text-sm text-[#143340] flex items-center gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#8BD9CA]"></span>
                {prof.nombre_completo}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex gap-3 pt-3 mt-auto border-t border-gray-100">
          <button
            onClick={() => onEdit(mesa)}
            className="flex-1 bg-[#C2F2E9]/50 hover:bg-[#C2F2E9] text-[#143340] text-xs font-bold py-2 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <MesaLapiz />
            Editar
          </button>
          <button
            onClick={() => onDelete(mesa)}
            className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold py-2 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <MesaTacho />
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
