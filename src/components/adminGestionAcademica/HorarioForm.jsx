import { useState } from 'react';

export default function HorarioForm({
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
        dia_semana: initialData.dia_semana || 'Lunes',
        hora_inicio: initialData.hora_inicio?.slice(0, 5) || '',
        hora_fin: initialData.hora_fin?.slice(0, 5) || '',
        materia_id: initialData.materia_id || '',
        profesor_id: initialData.profesor_id || '',
        cuatrimestre: initialData.cuatrimestre || 1,
        anio: initialData.anio || new Date().getFullYear(),
      };
    }
    return {
      dia_semana: 'Lunes',
      hora_inicio: '',
      hora_fin: '',
      materia_id: '',
      profesor_id: '',
      cuatrimestre: 1,
      anio: new Date().getFullYear(),
    };
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      materia_id: Number(formData.materia_id),
      profesor_id: formData.profesor_id ? Number(formData.profesor_id) : null,
      cuatrimestre: Number(formData.cuatrimestre),
      anio: Number(formData.anio),
    });
  };

  const containerClasses = isInline
    ? 'grid grid-cols-12 gap-4 items-center p-3 bg-white border border-[#8BD9CA] rounded-xl shadow-sm mb-2'
    : 'bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6';

  return (
    <form onSubmit={handleSubmit} className={containerClasses}>
      {!isInline && (
        <h3 className="font-display text-xl text-[#143340] mb-4">
          Nuevo horario
        </h3>
      )}

      <div
        className={
          isInline
            ? 'col-span-12 grid grid-cols-12 gap-4 items-center'
            : 'grid grid-cols-1 md:grid-cols-4 gap-4 mb-4'
        }
      >
        {/* DÍA */}
        <div className={isInline ? 'col-span-2' : ''}>
          {!isInline && (
            <label className="block text-[0.7rem] font-bold text-[#143340] uppercase tracking-widest mb-1.5">
              Día
            </label>
          )}
          <select
            name="dia_semana"
            value={formData.dia_semana}
            onChange={handleChange}
            required
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#8BD9CA] bg-white"
          >
            {[
              'Lunes',
              'Martes',
              'Miércoles',
              'Jueves',
              'Viernes',
              'Sábado',
            ].map((dia) => (
              <option key={dia} value={dia}>
                {dia}
              </option>
            ))}
          </select>
        </div>

        {/* FRANJA HORARIA */}
        <div
          className={
            isInline
              ? 'col-span-3 flex items-center gap-2'
              : 'flex items-center gap-2'
          }
        >
          <div className="flex-1">
            {!isInline && (
              <label className="block text-[0.7rem] font-bold text-[#143340] uppercase tracking-widest mb-1.5">
                Inicio *
              </label>
            )}
            <input
              type="time"
              name="hora_inicio"
              value={formData.hora_inicio}
              onChange={handleChange}
              required
              className="w-full border border-gray-200 rounded-lg px-2 py-2 text-sm outline-none focus:border-[#8BD9CA]"
            />
          </div>
          <span className={isInline ? '' : 'mt-6'}>-</span>
          <div className="flex-1">
            {!isInline && (
              <label className="block text-[0.7rem] font-bold text-[#143340] uppercase tracking-widest mb-1.5">
                Fin *
              </label>
            )}
            <input
              type="time"
              name="hora_fin"
              value={formData.hora_fin}
              onChange={handleChange}
              required
              className="w-full border border-gray-200 rounded-lg px-2 py-2 text-sm outline-none focus:border-[#8BD9CA]"
            />
          </div>
        </div>

        {/* MATERIA */}
        <div className={isInline ? 'col-span-3' : ''}>
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
              Nombre de la materia
            </option>
            {materias.map((mat) => (
              <option key={mat.id} value={mat.id}>
                {mat.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* DOCENTE */}
        <div className={isInline ? 'col-span-3' : ''}>
          {!isInline && (
            <label className="block text-[0.7rem] font-bold text-[#143340] uppercase tracking-widest mb-1.5">
              Docente a cargo
            </label>
          )}
          <select
            name="profesor_id"
            value={formData.profesor_id}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#8BD9CA] bg-white"
          >
            <option value="">Sin asignar</option>
            {profesores.map((prof) => (
              <option key={prof.id} value={prof.id}>
                {prof.nombre_completo}
              </option>
            ))}
          </select>
        </div>

        {/* BOTONES INLINE */}
        {isInline && (
          <div className="col-span-1 flex items-center justify-end gap-2">
            <button
              type="submit"
              className="px-2 py-2 bg-[#143340] text-white rounded-lg text-xs font-bold hover:bg-[#0d2229]"
            >
              Guardar
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="px-2 py-2 border border-gray-200 text-gray-500 text-xs rounded-lg hover:bg-gray-50"
            >
              ×
            </button>
          </div>
        )}
      </div>

      {/* BOTONES*/}
      {!isInline && (
        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm font-bold hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-[#143340] text-white rounded-lg text-sm font-bold hover:bg-[#0d2229] transition-colors"
          >
            Agregar
          </button>
        </div>
      )}
    </form>
  );
}
