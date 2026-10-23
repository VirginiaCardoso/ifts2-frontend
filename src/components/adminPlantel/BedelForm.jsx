import Button from '../Button';

export default function BedelForm({ form, editing, submitting, onChange, onClose, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="bg-white border border-petrol-100 rounded-2xl p-5 shadow-sm space-y-4">
      <h3 className="text-sm font-bold text-petrol-900">
        {editing ? 'Editar Bedel' : 'Nuevo Bedel'}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label htmlFor="bedel-name" className="block text-[0.7rem] font-bold text-petrol-900 uppercase tracking-wider mb-1">
            Nombre Completo *
          </label>
          <input
            id="bedel-name"
            type="text"
            required
            placeholder="Ej: Sra. Andrea Barrios"
            value={form.nombre}
            onChange={(event) => onChange((current) => ({ ...current, nombre: event.target.value }))}
            className="w-full bg-petrol-50 border border-petrol-100 rounded-lg px-3 py-1.5 text-xs text-petrol-900 focus:outline-none focus:border-mint-400"
          />
        </div>

        <div>
          <label htmlFor="bedel-year" className="block text-[0.7rem] font-bold text-petrol-900 uppercase tracking-wider mb-1">
            Año a Cargo *
          </label>
          <select
            id="bedel-year"
            value={form.anio_asignado}
            onChange={(event) => onChange((current) => ({ ...current, anio_asignado: event.target.value }))}
            className="w-full bg-petrol-50 border border-petrol-100 rounded-lg px-3 py-1.5 text-xs text-petrol-900 focus:outline-none focus:border-mint-400"
          >
            <option value="Primer Año">Primer Año</option>
            <option value="Segundo Año">Segundo Año</option>
            <option value="Tercer Año">Tercer Año</option>
          </select>
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
