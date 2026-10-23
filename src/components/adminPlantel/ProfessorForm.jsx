import Button from '../Button';
import MultiSelectMaterias from '../MultiSelectMaterias';

export default function ProfessorForm({
  form,
  editing,
  materias,
  submitting,
  onChange,
  onClose,
  onSubmit,
}) {
  return (
    <form onSubmit={onSubmit} className="bg-white border border-petrol-100 rounded-2xl p-5 shadow-sm space-y-4">
      <h3 className="text-sm font-bold text-petrol-900">
        {editing ? 'Editar registro docente' : 'Nuevo registro de profesor'}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label htmlFor="professor-name" className="block text-[0.7rem] font-bold text-petrol-900 uppercase tracking-wider mb-1">
            Nombre Completo *
          </label>
          <input
            id="professor-name"
            type="text"
            required
            placeholder="Ej: Prof. Daniel Buczel"
            value={form.nombre_completo}
            onChange={(event) => onChange((current) => ({ ...current, nombre_completo: event.target.value }))}
            className="w-full bg-petrol-50 border border-petrol-100 rounded-lg px-3 py-1.5 text-xs text-petrol-900 focus:outline-none focus:border-mint-400"
          />
        </div>

        <div>
          <label htmlFor="professor-role" className="block text-[0.7rem] font-bold text-petrol-900 uppercase tracking-wider mb-1">
            Rol en la Asignación
          </label>
          <select
            id="professor-role"
            value={form.rol}
            onChange={(event) => onChange((current) => ({ ...current, rol: event.target.value }))}
            className="w-full bg-petrol-50 border border-petrol-100 rounded-lg px-3 py-1.5 text-xs text-petrol-900 focus:outline-none focus:border-mint-400"
          >
            <option value="titular">Docente Titular</option>
            <option value="ayudante">Profesor Ayudante de Trabajos (ATP)</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-[0.7rem] font-bold text-petrol-900 uppercase tracking-wider mb-1">
            Materias Asignadas (Catálogo)
          </label>
          <MultiSelectMaterias
            materiasDisponibles={materias}
            seleccionadas={form.materias}
            onChange={(selected) => onChange((current) => ({ ...current, materias: selected }))}
          />
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          className="!py-1.5 !px-3 !text-xs !border-petrol-100"
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          variant="primary"
          disabled={submitting}
          className="!py-1.5 !px-4 !text-xs"
        >
          {submitting ? 'Guardando...' : (editing ? 'Guardar Cambios' : 'Registrar')}
        </Button>
      </div>
    </form>
  );
}
