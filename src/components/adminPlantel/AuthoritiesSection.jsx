import { AdminPlantelIcon1 } from '../../assets/icons';

export default function AuthoritiesSection({
  authorities,
  editingId,
  name,
  submitting,
  onBeginEdit,
  onCancelEdit,
  onNameChange,
  onSave,
}) {
  return (
    <section>
      <div className="mb-3">
        <p className="text-petrol-600 text-xs font-bold tracking-widest uppercase">
          Autoridades Institucionales
        </p>
        <h2 className="text-xl font-display font-bold text-petrol-900">
          Cargos Directivos y Gestión
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {authorities.map((authority) => {
          const isEditing = editingId === authority.id;
          return (
            <div
              key={authority.id}
              className="bg-white border border-petrol-100 rounded-xl p-4 shadow-2xs relative flex flex-col justify-between min-h-[90px]"
            >
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-[0.68rem] font-bold tracking-wider uppercase text-petrol-600">
                  {authority.cargo}
                </span>
                {!isEditing && (
                  <button
                    type="button"
                    onClick={() => onBeginEdit(authority)}
                    className="text-petrol-400 hover:text-petrol-800 transition-colors"
                    title="Editar nombre"
                    aria-label={`Editar ${authority.cargo}`}
                  >
                    <AdminPlantelIcon1 />
                  </button>
                )}
              </div>

              {isEditing ? (
                <div className="flex items-center gap-1.5 mt-1">
                  <input
                    type="text"
                    value={name}
                    onChange={(event) => onNameChange(event.target.value)}
                    className="w-full bg-petrol-50 border border-mint-400 rounded px-2 py-1 text-xs font-semibold text-petrol-900 focus:outline-none"
                    autoFocus
                    aria-label={`Nombre de ${authority.cargo}`}
                  />
                  <button
                    type="button"
                    disabled={submitting}
                    onClick={() => onSave(authority)}
                    className="bg-mint-400 hover:bg-mint-500 text-petrol-900 text-[0.7rem] font-bold px-2 py-1 rounded"
                    aria-label="Guardar autoridad"
                  >
                    ✓
                  </button>
                  <button
                    type="button"
                    onClick={onCancelEdit}
                    className="bg-gray-200 text-petrol-700 text-[0.7rem] font-bold px-2 py-1 rounded"
                    aria-label="Cancelar edición"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <p className="text-sm font-bold text-petrol-900 truncate">
                  {authority.nombre_responsable}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
