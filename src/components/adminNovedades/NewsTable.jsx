import Badge from '../Badge';
import Button from '../Button';
import { AdminNovedadesIcon2 } from '../../assets/icons';
import { formatNewsDate } from './utils';

export default function NewsTable({
  error,
  filteredNoticias,
  loading,
  searchTerm,
  onSearchChange,
  onEdit,
  onDelete,
}) {
  return (
    <div className="bg-white border border-petrol-100 rounded-2xl p-6 shadow-xs space-y-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h2 className="text-sm font-bold text-petrol-900">Lista de noticias</h2>
        <div className="relative w-full sm:w-64">
          <input
            type="search"
            placeholder="Buscar…"
            value={searchTerm}
            onChange={(event) => onSearchChange(event.target.value)}
            aria-label="Buscar noticias"
            className="w-full bg-petrol-50 border border-petrol-100 rounded-lg pl-9 pr-3 py-1.5 text-xs text-petrol-900 focus:outline-none focus:border-mint-400"
          />
          <AdminNovedadesIcon2 />
        </div>
      </div>

      {loading ? (
        <p className="text-center py-8 text-sm text-petrol-600">Cargando noticias desde el servidor...</p>
      ) : error ? (
        <p role="alert" className="text-center py-8 text-sm text-red-500">{error}</p>
      ) : filteredNoticias.length === 0 ? (
        <p className="text-center py-8 text-sm text-petrol-600">No se encontraron noticias publicadas.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-petrol-100 text-[0.7rem] uppercase tracking-wider text-petrol-600 font-bold">
                <th className="pb-3 px-3">Imagen</th>
                <th className="pb-3 px-3">Etiqueta</th>
                <th className="pb-3 px-3">Título</th>
                <th className="pb-3 px-3">Fecha Publicación</th>
                <th className="pb-3 px-3">Estado</th>
                <th className="pb-3 px-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-petrol-50 text-xs">
              {filteredNoticias.map((item) => (
                <tr key={item.id} className="hover:bg-petrol-50/50 transition-colors">
                  <td className="py-3 px-3">
                    <img
                      src={item.imagen_portada_url || 'https://images.unsplash.com/photo-1577219492769-b63a779fac28?w=80&h=60&fit=crop&auto=format'}
                      alt=""
                      onError={(event) => {
                        event.currentTarget.onerror = null;
                        event.currentTarget.src = 'https://images.unsplash.com/photo-1577219492769-b63a779fac28?w=80&h=60&fit=crop&auto=format';
                      }}
                      className="w-10 h-10 rounded-lg object-cover bg-petrol-100"
                    />
                  </td>
                  <td className="py-3 px-3">
                    <Badge variant="mint">{item.etiqueta || item.categoria || 'Novedades'}</Badge>
                  </td>
                  <td className="py-3 px-3 font-medium text-petrol-900 max-w-xs truncate" title={item.titulo}>
                    {item.titulo}
                  </td>
                  <td className="py-3 px-3 text-petrol-600">{formatNewsDate(item)}</td>
                  <td className="py-3 px-3">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${
                      item.estado === 'Borrador' ? 'text-amber-600' : 'text-mint-500'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        item.estado === 'Borrador' ? 'bg-amber-500' : 'bg-mint-500'
                      }`} />
                      {item.estado === 'Borrador' ? 'Borrador' : 'Publicado'}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => onEdit(item)}
                      className="!py-1 !px-2.5 !text-xs !border-petrol-100"
                    >
                      Editar
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => onDelete(item.id)}
                      className="!py-1 !px-2.5 !text-xs"
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}