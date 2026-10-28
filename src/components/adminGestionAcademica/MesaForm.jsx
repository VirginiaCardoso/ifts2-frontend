import { useState} from 'react';

export default function MesaForm({
  initialData,
  materias,
  profesores,
  onSave,
  onCancel,
  isInline = false,
}) {
  const [formData, setFormData] = useState(() => {
    if (initialData) {
      return {
        periodo: initialData.periodo || '',
        materia_id: initialData.materia_id || '',
        fecha: initialData.fecha?.split('T')[0] || '',
        hora: initialData.hora || '',
        anio_vigencia: initialData.anio_vigencia || new Date().getFullYear(),
        profesores_ids:
          initialData.profesores_ids ||
          initialData.tribunal?.map((p) => p.id) ||
          [],
      };
    }

    return {
      periodo: '',
      materia_id: '',
      fecha: '',
      hora: '',
      anio_vigencia: new Date().getFullYear(),
      profesores_ids: [],
    };
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const toggleProfesor = (id) => {
    setFormData((prev) => ({
      ...prev,
      profesores_ids: prev.profesores_ids.includes(id)
        ? prev.profesores_ids.filter((pId) => pId !== id)
        : [...prev.profesores_ids, id],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const containerClasses = isInline
    ? 'bg-white rounded-xl shadow-sm border border-[#8BD9CA] p-4 flex flex-col gap-3 h-full'
    : 'bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6';

  return (
    <form onSubmit={handleSubmit} className={containerClasses}>
      {!isInline && (
        <h3 className="font-display text-xl text-[#143340] mb-4">
          Nueva mesa de examen
        </h3>
      )}

      <div
        className={
          isInline
            ? 'flex flex-col gap-3'
            : 'grid grid-cols-1 md:grid-cols-5 gap-4'
        }
      >
        {/* PERÍODO */}
        <div>
          {!isInline && (
            <label className="block text-[0.7rem] font-bold text-[#143340] uppercase tracking-widest mb-1.5">
              Período *
            </label>
          )}
          <input
            name="periodo"
            value={formData.periodo}
            onChange={handleChange}
            placeholder="Ej: Marzo 2027"
            required
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#8BD9CA]"
          />
        </div>

        {/* MATERIA */}
        <div className="md:col-span-2">
          {!isInline && (
            <label className="block text-[0.7rem] font-bold text-[#143340] uppercase tracking-widest mb-1.5">
              Materia *
            </label>
          )}
          <select
            name="materia_id"
            value={formData.materia_id}
            onChange={handleChange}
            required
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#8BD9CA] bg-white"
          >
            <option value="" disabled>
              Seleccionar materia...
            </option>
            {materias.map((mat) => (
              <option key={mat.id} value={mat.id}>
                {mat.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* FECHA EXACTA */}
        <div>
          {!isInline && (
            <label className="block text-[0.7rem] font-bold text-[#143340] uppercase tracking-widest mb-1.5">
              Fecha *
            </label>
          )}
          <input
            type="date"
            name="fecha"
            value={formData.fecha}
            onChange={handleChange}
            required
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#8BD9CA]"
          />
        </div>

        {/* HORA */}
        <div>
          {!isInline && (
            <label className="block text-[0.7rem] font-bold text-[#143340] uppercase tracking-widest mb-1.5">
              Hora *
            </label>
          )}
          <input
            type="time"
            name="hora"
            value={formData.hora}
            onChange={handleChange}
            required
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#8BD9CA]"
          />
        </div>
      </div>

      {/* SELECTOR DE PROFESORES */}
      <div className="mt-3">
        <label className="block text-[0.7rem] font-bold text-[#143340] uppercase tracking-widest mb-1.5">
          Profesores del tribunal
        </label>
        <div className="border border-gray-200 rounded-lg max-h-32 overflow-y-auto p-2 bg-gray-50/50 space-y-1">
          {profesores.map((prof) => (
            <label
              key={prof.id}
              className="flex items-center gap-2 p-1.5 hover:bg-white rounded cursor-pointer text-sm text-[#143340]"
            >
              <input
                type="checkbox"
                checked={formData.profesores_ids.includes(prof.id)}
                onChange={() => toggleProfesor(prof.id)}
                className="accent-[#143340] rounded-sm"
              />
             {prof.nombre_completo}
            </label>
          ))}
        </div>
      </div>

      <div
        className={`flex gap-3 pt-4 mt-auto ${isInline ? '' : 'justify-end'}`}
      >
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 md:flex-none px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm font-bold hover:bg-gray-50 transition-colors cursor-pointer"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="flex-1 md:flex-none px-4 py-2 bg-[#143340] text-white rounded-lg text-sm font-bold hover:bg-[#0d2229] transition-colors cursor-pointer"
        >
          {initialData ? 'Guardar' : 'Agregar'}
        </button>
      </div>
    </form>
  );
}
