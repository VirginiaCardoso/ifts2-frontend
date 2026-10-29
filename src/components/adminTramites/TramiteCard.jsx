import { useState } from 'react';
import {
  IconCardTramite,
  IconListTramite,
  IconCheckTramite,
  IconShieldTramite,
  IconSwapTramite,
  IconEditTramite,
} from '../../assets/icons';

export default function TramiteCard({ tramite, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [descripcion, setDescripcion] = useState(
    tramite.descripcion_requisitos || ''
  );
  const [isSaving, setIsSaving] = useState(false);

  const getIcon = (nombre) => {
    const n = nombre.toLowerCase();
    if (n.includes('analítico')) return <IconListTramite />;
    if (n.includes('asistencia')) return <IconCheckTramite />;
    if (n.includes('deuda')) return <IconShieldTramite />;
    if (n.includes('equivalencia')) return <IconSwapTramite />;
    return <IconCardTramite />;
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await onSave(tramite.id, {
        nombre_tramite: tramite.nombre_tramite,
        descripcion_requisitos: descripcion,
      });
      setIsEditing(false);
    } catch (error) {
      alert(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setDescripcion(tramite.descripcion_requisitos || '');
    setIsEditing(false);
  };

  return (
    <div
      className={`bg-white rounded-xl shadow-sm border ${isEditing ? 'border-[#8BD9CA]' : 'border-gray-200'} p-5 flex flex-col h-full transition-colors`}
    >
      {/* Cabecera */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-gray-50 text-gray-500 p-2 rounded-lg border border-gray-100">
            {getIcon(tramite.nombre_tramite)}
          </div>
          <h3 className="font-bold text-[#143340] text-sm md:text-base">
            {tramite.nombre_tramite}
          </h3>
        </div>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="p-1.5 text-gray-400 hover:text-[#518C8C] hover:bg-gray-50 rounded border border-transparent hover:border-gray-200 transition-all"
            title="Editar requisitos"
          >
            <IconEditTramite />
          </button>
        )}
      </div>

      {/* Cuerpo */}
      <div className="flex-grow flex flex-col">
        {isEditing ? (
          <div className="flex flex-col gap-3 h-full">
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="w-full flex-grow min-h-[100px] border border-gray-200 rounded-lg p-3 text-sm text-[#143340] resize-none outline-none focus:border-[#8BD9CA] bg-gray-50/30"
              placeholder="Ingrese los requisitos..."
            />
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="flex-1 bg-[#143340] text-white font-bold text-sm py-2.5 rounded-lg hover:bg-[#0a1c22] transition-colors"
              >
                {isSaving ? 'Guardando...' : 'Guardar cambios'}
              </button>
              <button
                onClick={handleCancel}
                disabled={isSaving}
                className="px-4 border border-gray-200 text-gray-400 rounded-lg hover:bg-gray-50 hover:text-gray-600 transition-colors"
              >
                ×
              </button>
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-600 leading-relaxed border-t border-gray-50 pt-4">
            {tramite.descripcion_requisitos || (
              <span className="text-gray-400 italic">
                Sin requisitos cargados.
              </span>
            )}
          </p>
        )}
      </div>
    </div>
  );
}
