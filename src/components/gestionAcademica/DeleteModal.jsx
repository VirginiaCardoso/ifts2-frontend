import { MesaTacho } from '../../assets/icons';

export default function DeleteModal({ mesa, onConfirm, onCancel }) {
  if (!mesa) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl relative animate-fade-in-up">
        <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center mb-4">
          <MesaTacho />
        </div>

        <h3 className="text-2xl font-bold text-[#143340] mb-2 font-display">
          ¿Eliminar mesa?
        </h3>
        <p className="text-gray-500 text-sm mb-6">
          La mesa{' '}
          <span className="font-bold text-[#143340]">
            "{mesa.materia_nombre} -{' '}
            {mesa.fecha?.split('T')[0].split('-').reverse().join('/')} -{' '}
            {mesa.hora?.slice(0, 5)} hs
          </span>
          " será eliminada permanentemente.
        </p>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-3 border border-gray-200 text-[#143340] font-bold rounded-xl hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={() => onConfirm(mesa.id)}
            className="flex-1 px-4 py-3 bg-[#C92A2A] text-white font-bold rounded-xl hover:bg-red-800 transition-colors"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
