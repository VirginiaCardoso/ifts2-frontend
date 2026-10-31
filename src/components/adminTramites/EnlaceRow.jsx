import { useState } from 'react';
import { IconLinkEnlace, IconEditEnlace, IconCheckEnlace } from '../../assets/icons';
import { notifyActionError } from '../../utils/userRoles';

export default function EnlaceRow({ enlace, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [url, setUrl] = useState(enlace.url_destino);
  const [isSaving, setIsSaving] = useState(false);

  const descripciones = {
    'SIU Guaraní': 'Sistema académico de gestión universitaria',
    'Moodle / Aulas Virtuales': 'Plataforma de educación a distancia',
    'Becas PROGRESAR': 'Portal de becas del Ministerio de Educación',
    'Mi Argentina': 'Trámites y servicios del Estado Nacional',
  };

  const handleSave = async () => {
    if (url.trim() === '') return;
    try {
      setIsSaving(true);
      await onSave(enlace.id, url);
      setIsEditing(false);
    } catch (error) {
      notifyActionError(error, 'Error al actualizar el enlace');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between p-5 gap-4 hover:bg-gray-50/30 transition-colors">
      {/* Información del Sistema */}
      <div className="md:w-1/3 flex flex-col gap-0.5">
        <h3 className="font-bold text-[#143340] text-sm md:text-base">
          {enlace.nombre_sistema}
        </h3>
        <p className="text-gray-400 text-xs md:text-sm">
          {descripciones[enlace.nombre_sistema] ||
            'Enlace institucional externo'}
        </p>
      </div>

      {/* Input / Display de URL */}
      <div className="flex-1 w-full">
        {isEditing ? (
          <div className="flex items-center gap-2 bg-white border border-[#8BD9CA] rounded-lg px-3 py-2 w-full focus-within:ring-2 focus-within:ring-[#8BD9CA]/20 transition-shadow">
            <IconLinkEnlace />
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1 text-[#143340] text-sm outline-none bg-transparent"
              autoFocus
            />
          </div>
        ) : (
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-lg px-3 py-2.5 w-full">
            <IconLinkEnlace />
            <span className="text-gray-500 text-sm truncate">
              {enlace.url_destino}
            </span>
          </div>
        )}
      </div>

      {/* Botón de Acción */}
      <div className="shrink-0 w-full md:w-auto flex justify-end">
        {isEditing ? (
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="w-full md:w-auto bg-[#8BD9CA] text-[#143340] px-4 py-2 rounded-lg flex items-center justify-center gap-2 text-sm font-bold hover:bg-[#7bc8b9] transition-colors"
          >
            <IconCheckEnlace />
            {isSaving ? 'Guardando...' : 'Actualizar Link'}
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="w-full md:w-auto border border-gray-200 text-gray-600 px-4 py-2 rounded-lg flex items-center justify-center gap-2 text-sm font-bold hover:bg-gray-50 transition-colors"
          >
            <IconEditEnlace />
            Editar
          </button>
        )}
      </div>
    </div>
  );
}
