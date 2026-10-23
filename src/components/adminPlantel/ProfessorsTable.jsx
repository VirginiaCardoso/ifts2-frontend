import Button from '../Button';
import { AdminPlantelIcon2 } from '../../assets/icons';

export default function ProfessorsTable({
  error,
  loading,
  professors,
  searchTerm,
  onSearchChange,
  onEdit,
  onDelete,
}) {
  return (
    <div className="bg-white border border-petrol-100 rounded-2xl p-5 shadow-2xs space-y-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs font-bold text-petrol-900 uppercase tracking-wider">
          Nómina Docente · {professors.length} miembros
        </p>
        <div className="relative w-full sm:w-60">
          <input
            type="search"
            placeholder="Buscar docente o materia…"
            value={searchTerm}
            onChange={(event) => onSearchChange(event.target.value)}
            aria-label="Buscar docente o materia"
            className="w-full bg-petrol-50 border border-petrol-100 rounded-lg pl-8 pr-3 py-1 text-xs text-petrol-900 focus:outline-none focus:border-mint-400"
          />
          <AdminPlantelIcon2 />
        </div>
      </div>

      {loading ? (
        <p className="text-center py-6 text-xs text-petrol-600">Cargando datos del plantel...</p>
      ) : error ? (
        <p role="alert" className="text-center py-6 text-xs text-red-600">{error}</p>
      ) : professors.length === 0 ? (
        <p className="text-center py-6 text-xs text-petrol-600">No se encontraron profesores.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-petrol-100 text-[0.68rem] uppercase tracking-wider text-petrol-600 font-bold">
                <th className="pb-2.5 px-3">Profesor</th>
                <th className="pb-2.5 px-3">Materias asignadas</th>
                <th className="pb-2.5 px-3">Rol</th>
                <th className="pb-2.5 px-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-petrol-50 text-xs">
              {professors.map((professor) => {
                const isAssistant = professor.materias_detalle?.some((subject) => subject.rol === 'ayudante');
                return (
                  <tr key={professor.id} className="hover:bg-petrol-50/50 transition-colors">
                    <td className="py-2.5 px-3 font-semibold text-petrol-900">
                      {professor.nombre_completo}
                    </td>
                    <td className="py-2.5 px-3 text-petrol-600">
                      {professor.materias_texto || <span className="italic text-gray-400">Sin materias</span>}
                    </td>
                    <td className="py-2.5 px-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[0.65rem] font-bold uppercase tracking-wider ${
                        isAssistant ? 'bg-amber-100 text-amber-800' : 'bg-mint-100 text-petrol-900'
                      }`}>
                        {isAssistant ? 'Ayudante' : 'Titular'}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-right space-x-1.5 whitespace-nowrap">
                      <Button
                        variant="outline"
                        onClick={() => onEdit(professor)}
                        className="!py-1 !px-2 !text-[0.7rem] !border-petrol-100"
                      >
                        Editar
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => onDelete(professor.id)}
                        className="!py-1 !px-2 !text-[0.7rem]"
                      >
                        Eliminar
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
