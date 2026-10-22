import React, { useState, useEffect, useMemo } from 'react';
import Button from './Button';
import Badge from './Badge';
import { 
  getNovedades, 
  createNovedad, 
  updateNovedad, 
  deleteNovedad 
} from '../services/novedadesService';

export default function AdminNovedades() {
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Estados de interfaz y búsqueda
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Formulario
  const initialForm = {
    titulo: '',
    etiqueta: 'Novedades',
    fecha: new Date().toISOString().split('T')[0],
    imagen_url: ''
  };
  const [formData, setFormData] = useState(initialForm);

  // Carga inicial desde la API
  const cargarNoticias = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getNovedades();
      setNoticias(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || 'No se pudo conectar con el servidor');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarNoticias();
  }, []);

  // Métricas calculadas dinámicamente
  const metrics = useMemo(() => {
    const total = noticias.length;
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const esteMes = noticias.filter((item) => {
      const fecha = new Date(item.fecha);
      return fecha.getMonth() === currentMonth && fecha.getFullYear() === currentYear;
    }).length;

    const tags = new Set(noticias.map((item) => item.etiqueta || item.categoria));
    return { total, esteMes, etiquetas: tags.size };
  }, [noticias]);

  // Filtrado de búsqueda
  const filteredNoticias = useMemo(() => {
    return noticias.filter((n) => {
      const q = searchTerm.toLowerCase();
      const tituloMatch = (n.titulo || '').toLowerCase().includes(q);
      const tagMatch = (n.etiqueta || n.categoria || '').toLowerCase().includes(q);
      return tituloMatch || tagMatch;
    });
  }, [noticias, searchTerm]);

  // Manejadores de acciones
  const handleOpenCreate = () => {
    setEditingId(null);
    setFormData(initialForm);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (noticia) => {
    setEditingId(noticia.id);
    setFormData({
      titulo: noticia.titulo || '',
      etiqueta: noticia.etiqueta || noticia.categoria || 'Novedades',
      fecha: noticia.fecha ? noticia.fecha.split('T')[0] : '',
      imagen_url: noticia.imagen_url || ''
    });
    setIsFormOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      if (editingId) {
        await updateNovedad(editingId, formData);
      } else {
        await createNovedad(formData);
      }
      setIsFormOpen(false);
      setEditingId(null);
      setFormData(initialForm);
      await cargarNoticias();
    } catch (err) {
      alert(err.message || 'Error al guardar la novedad');
    } finally {
      setSubmitting(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deletingId) return;
    try {
      setSubmitting(true);
      await deleteNovedad(deletingId);
      setDeletingId(null);
      await cargarNoticias();
    } catch (err) {
      alert(err.message || 'Error al eliminar la novedad');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Cabecera Principal */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-petrol-900 text-3xl md:text-4xl leading-tight">
            Novedades institucionales
          </h1>
          <p className="text-petrol-600 text-sm font-medium mt-1">
            {metrics.total} {metrics.total === 1 ? 'noticia publicada' : 'noticias publicadas'}
          </p>
        </div>

        <Button
          variant="primary"
          onClick={handleOpenCreate}
          className="!rounded-lg shrink-0"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Cargar nueva noticia
        </Button>
      </div>

      {/* Formulario Desplegable (Crear / Editar) */}
      {isFormOpen && (
        <form onSubmit={handleSubmit} className="bg-white border border-petrol-100 rounded-2xl p-6 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-petrol-900">
            {editingId ? 'Editar noticia' : 'Nueva noticia'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-petrol-900 uppercase tracking-wider mb-1">
                Título *
              </label>
              <input
                type="text"
                required
                value={formData.titulo}
                onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                className="w-full bg-petrol-50 border border-petrol-100 rounded-lg px-3 py-2 text-sm text-petrol-900 focus:outline-none focus:border-mint-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-petrol-900 uppercase tracking-wider mb-1">
                Etiqueta
              </label>
              <select
                value={formData.etiqueta}
                onChange={(e) => setFormData({ ...formData, etiqueta: e.target.value })}
                className="w-full bg-petrol-50 border border-petrol-100 rounded-lg px-3 py-2 text-sm text-petrol-900 focus:outline-none focus:border-mint-400"
              >
                <option value="Novedades">Novedades</option>
                <option value="Evento">Evento</option>
                <option value="Académico">Académico</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-petrol-900 uppercase tracking-wider mb-1">
                Fecha *
              </label>
              <input
                type="date"
                required
                value={formData.fecha}
                onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
                className="w-full bg-petrol-50 border border-petrol-100 rounded-lg px-3 py-2 text-sm text-petrol-900 focus:outline-none focus:border-mint-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-petrol-900 uppercase tracking-wider mb-1">
                URL de Imagen
              </label>
              <input
                type="url"
                placeholder="https://..."
                value={formData.imagen_url}
                onChange={(e) => setFormData({ ...formData, imagen_url: e.target.value })}
                className="w-full bg-petrol-50 border border-petrol-100 rounded-lg px-3 py-2 text-sm text-petrol-900 focus:outline-none focus:border-mint-400"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsFormOpen(false)}
              className="!border-petrol-100 !text-petrol-600 !py-2 !px-4"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={submitting}
              className="!py-2 !px-5"
            >
              {submitting ? 'Guardando...' : (editingId ? 'Guardar cambios' : 'Publicar noticia')}
            </Button>
          </div>
        </form>
      )}

      {/* Tarjetas de Métricas */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-petrol-100 rounded-2xl p-5 shadow-xs">
          <p className="font-display text-2xl font-bold text-petrol-900">{metrics.total}</p>
          <p className="text-xs text-petrol-600 mt-0.5">Total publicadas</p>
        </div>
        <div className="bg-white border border-petrol-100 rounded-2xl p-5 shadow-xs">
          <p className="font-display text-2xl font-bold text-petrol-900">{metrics.esteMes}</p>
          <p className="text-xs text-petrol-600 mt-0.5">Este mes</p>
        </div>
        <div className="bg-white border border-petrol-100 rounded-2xl p-5 shadow-xs">
          <p className="font-display text-2xl font-bold text-petrol-900">{metrics.etiquetas}</p>
          <p className="text-xs text-petrol-600 mt-0.5">Etiquetas distintas</p>
        </div>
      </div>

      {/* Barra de Búsqueda y Tabla */}
      <div className="bg-white border border-petrol-100 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <h2 className="text-sm font-bold text-petrol-900">Lista de noticias</h2>
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-petrol-50 border border-petrol-100 rounded-lg pl-9 pr-3 py-1.5 text-xs text-petrol-900 focus:outline-none focus:border-mint-400"
            />
            <svg className="w-3.5 h-3.5 text-petrol-600 absolute left-3 top-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
        </div>

        {loading ? (
          <p className="text-center py-8 text-sm text-petrol-600">Cargando noticias desde el servidor...</p>
        ) : error ? (
          <p className="text-center py-8 text-sm text-red-500">{error}</p>
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
                  <th className="pb-3 px-3">Fecha</th>
                  <th className="pb-3 px-3">Estado</th>
                  <th className="pb-3 px-3 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-petrol-50 text-xs">
                {filteredNoticias.map((item) => (
                  <tr key={item.id} className="hover:bg-petrol-50/50 transition-colors">
                    <td className="py-3 px-3">
                      {item.imagen_portada_url || item.imagen_url ? (
                        <img 
                          src={item.imagen_portada_url || item.imagen_url} 
                          alt={item.titulo} 
                          className="w-10 h-10 rounded-lg object-cover" 
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-petrol-100 flex items-center justify-center text-petrol-600 font-bold">
                          —
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-3">
                      <Badge variant="mint">{item.etiqueta || item.categoria || 'Novedades'}</Badge>
                    </td>
                    <td className="py-3 px-3 font-medium text-petrol-900 max-w-xs truncate">
                      {item.titulo}
                    </td>
                    <td className="py-3 px-3 text-petrol-600">
                      {(item.fecha_publicacion || item.fecha) ? (item.fecha_publicacion || item.fecha).split('T')[0] : '—'}
                    </td>
                    <td className="py-3 px-3">
                      <span className="inline-flex items-center gap-1.5 text-xs text-mint-500 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-mint-500"></span>
                        Publicado
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right space-x-2">
                      <Button
                        variant="outline"
                        onClick={() => handleOpenEdit(item)}
                        className="!py-1 !px-2.5 !text-xs !border-petrol-100"
                      >
                        Editar
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => setDeletingId(item.id)}
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

      {/* Modal de Confirmación para Eliminar */}
      {deletingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#051218]/80 backdrop-blur-xs">
          <div className="bg-white border border-petrol-100 rounded-2xl p-6 max-w-sm w-full text-center space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 mx-auto flex items-center justify-center">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-base text-petrol-900">¿Eliminar esta noticia?</h3>
              <p className="text-xs text-petrol-600 mt-1">Esta acción no se puede deshacer.</p>
            </div>
            <div className="flex gap-2 justify-center pt-2">
              <Button
                variant="outline"
                disabled={submitting}
                onClick={() => setDeletingId(null)}
                className="!border-petrol-100 !text-petrol-600 flex-1"
              >
                Cancelar
              </Button>
              <Button
                variant="danger"
                disabled={submitting}
                onClick={handleConfirmDelete}
                className="flex-1"
              >
                {submitting ? 'Eliminando...' : 'Eliminar'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}