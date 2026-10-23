import Button from '../Button';

export default function BedelesTable({ bedeles, loading, error, onEdit, onDelete }) {
  return (
    <div className="bg-white border border-petrol-100 rounded-2xl p-5 shadow-2xs space-y-4">
      <p className="text-xs font-bold text-petrol-900 uppercase tracking-wider">
        Personal de Bedelía
      </p>

      {loading ? (
        <p className="text-center py-6 text-xs text-petrol-600">Cargando datos del plantel...</p>
      ) : error ? (
        <p role="alert" className="text-center py-6 text-xs text-red-600">{error}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-petrol-100 text-[0.68rem] uppercase tracking-wider text-petrol-600 font-bold">
                <th className="pb-2.5 px-3">Año asignado</th>
                <th className="pb-2.5 px-3">Nombre</th>
                <th className="pb-2.5 px-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-petrol-50 text-xs">
              {bedeles.map((bedel) => (
                <tr key={bedel.id} className="hover:bg-petrol-50/50 transition-colors">
                  <td className="py-2.5 px-3 font-bold text-petrol-900">
                    <span className="bg-petrol-50 border border-petrol-100 px-2 py-0.5 rounded text-[0.68rem] tracking-wide uppercase">
                      {bedel.anio_asignado}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 font-medium text-petrol-900">{bedel.nombre}</td>
                  <td className="py-2.5 px-3 text-right space-x-1.5 whitespace-nowrap">
                    <Button
                      variant="outline"
                      onClick={() => onEdit(bedel)}
                      className="!py-1 !px-2 !text-[0.7rem] !border-petrol-100"
                    >
                      Editar
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => onDelete(bedel.id)}
                      className="!py-1 !px-2 !text-[0.7rem]"
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
              {bedeles.length === 0 && (
                <tr>
                  <td colSpan="3" className="py-6 text-center text-xs text-petrol-600">
                    No hay bedeles registrados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
