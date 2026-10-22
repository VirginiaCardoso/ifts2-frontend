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

  // Estados del modal y formularios
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Estado inicial del formulario con descripcion_breve y estado
  const initialForm = {
    titulo: '',
    etiqueta: 'Novedades',
    fecha_publicacion: new Date().toISOString().split('T')[0],
    imagen_portada_url: '',
    descripcion_breve: '',
    estado: 'Publicado'
  };
  const [formData, setFormData] = useState(initialForm);

  // Carga de novedades desde la API
  const cargarNoticias = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getNovedades(true);//le paso true asi busca todas las novedades, no importa la fecha de publicación ni el estado
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

  // Métricas dinámicas superiores
  const metrics = useMemo(() => {
  const total = noticias.length;
  const publicadas = noticias.filter(
    (item) => (item.estado || 'Publicado') === 'Publicado'
  ).length;
  const borradores = noticias.filter(
    (item) => item.estado === 'Borrador'
  ).length;

  return { total, publicadas, borradores };
}, [noticias]);

  // Filtro de búsqueda
  const filteredNoticias = useMemo(() => {
    return noticias.filter((n) => {
      const q = searchTerm.toLowerCase();
      const tituloMatch = (n.titulo || '').toLowerCase().includes(q);
      const tagMatch = (n.etiqueta || n.categoria || '').toLowerCase().includes(q);
      return tituloMatch || tagMatch;
    });
  }, [noticias, searchTerm]);

  // Apertura de modal de creación
  const handleOpenCreate = () => {
    setEditingId(null);
    setFormData(initialForm);
    setIsFormOpen(true);
  };

  // Apertura de modal de edición con mapeo completo
  const handleOpenEdit = (noticia) => {
    setEditingId(noticia.id);

    const rawDate = noticia.fecha_publicacion || noticia.fecha || noticia.created_at || '';
    const cleanDate = rawDate ? String(rawDate).split('T')[0] : new Date().toISOString().split('T')[0];

    setFormData({
      titulo: noticia.titulo || '',
      etiqueta: noticia.etiqueta || noticia.categoria || 'Novedades',
      fecha_publicacion: cleanDate,
      imagen_portada_url: noticia.imagen_portada_url || noticia.imagen_url || '',
      descripcion_breve: noticia.descripcion_breve || noticia.descripcion || noticia.contenido || '',
      estado: noticia.estado || 'Publicado'
    });

    setIsFormOpen(true);
  };

  // Envío del formulario (Creación o Edición)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);

      const payload = {
        titulo: formData.titulo,
        etiqueta: formData.etiqueta,
        categoria: formData.etiqueta,
        fecha_publicacion: formData.fecha_publicacion,
        fecha: formData.fecha_publicacion,
        imagen_portada_url: formData.imagen_portada_url,
        imagen_url: formData.imagen_portada_url,
        descripcion_breve: formData.descripcion_breve,
        descripcion: formData.descripcion_breve,
        estado: formData.estado
      };

      if (editingId) {
        await updateNovedad(editingId, payload);
      } else {
        await createNovedad(payload);
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

  // Confirmar eliminación
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
            {metrics.publicadas} {metrics.publicadas === 1 ? 'noticia publicada' : 'noticias publicadas'}
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

      {/* Formulario de Carga y Edición */}
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
                <option value="Eventos">Eventos</option>
                <option value="Académico">Académico</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-petrol-900 uppercase tracking-wider mb-1">
                Fecha de publicación *
              </label>
              <input
                type="date"
                required
                value={formData.fecha_publicacion}
                onChange={(e) => setFormData({ ...formData, fecha_publicacion: e.target.value })}
                className="w-full bg-petrol-50 border border-petrol-100 rounded-lg px-3 py-2 text-sm text-petrol-900 focus:outline-none focus:border-mint-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-petrol-900 uppercase tracking-wider mb-1">
                Estado
              </label>
              <select
                value={formData.estado}
                onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
                className="w-full bg-petrol-50 border border-petrol-100 rounded-lg px-3 py-2 text-sm text-petrol-900 focus:outline-none focus:border-mint-400"
              >
                <option value="Publicado">Publicado</option>
                <option value="Borrador">Borrador</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-petrol-900 uppercase tracking-wider mb-1">
                URL de Imagen de Portada
              </label>
              <input
                type="url"
                placeholder="https://images.unsplash.com/..."
                value={formData.imagen_portada_url}
                onChange={(e) => setFormData({ ...formData, imagen_portada_url: e.target.value })}
                className="w-full bg-petrol-50 border border-petrol-100 rounded-lg px-3 py-2 text-sm text-petrol-900 focus:outline-none focus:border-mint-400"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-petrol-900 uppercase tracking-wider mb-1">
                Descripción Breve (Extracto) *
              </label>
              <textarea
                rows="3"
                required
                placeholder="Resumen o bajada institucional de la noticia..."
                value={formData.descripcion_breve}
                onChange={(e) => setFormData({ ...formData, descripcion_breve: e.target.value })}
                className="w-full bg-petrol-50 border border-petrol-100 rounded-lg px-3 py-2 text-sm text-petrol-900 focus:outline-none focus:border-mint-400 resize-none"
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
          <p className="text-xs text-petrol-600 mt-0.5">Total novedades</p>
        </div>
        <div className="bg-white border border-petrol-100 rounded-2xl p-5 shadow-xs">
          <p className="font-display text-2xl font-bold text-mint-500">{metrics.publicadas}</p>
          <p className="text-xs text-petrol-600 mt-0.5">Total publicadas</p>
        </div>
        <div className="bg-white border border-petrol-100 rounded-2xl p-5 shadow-xs">
          <p className="font-display text-2xl font-bold text-amber-500">{metrics.borradores}</p>
          <p className="text-xs text-petrol-600 mt-0.5">Borradores</p>
        </div>
      </div>

      {/* Buscador y Tabla */}
      <div className="bg-white border border-petrol-100 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <h2 className="text-sm font-bold text-petrol-900">Lista de noticias</h2>
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Buscar…"
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
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1577219492769-b63a779fac28?w=80&h=60&fit=crop&auto=format';
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
                    <td className="py-3 px-3 text-petrol-600">
                      {(() => {
                        const rawDate = item.fecha_publicacion || item.fecha || item.created_at;
                        if (!rawDate) return '—';
                        const clean = String(rawDate).split('T')[0];
                        const [year, month, day] = clean.split('-');
                        return year && month && day ? `${day}-${month}-${year}` : clean;
                      })()}
                    </td>
                    <td className="py-3 px-3">
                      {item.estado === 'Borrador' ? (
                        <span className="inline-flex items-center gap-1.5 text-xs text-amber-600 font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                          Borrador
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-xs text-mint-500 font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-mint-500"></span>
                          Publicado
                        </span>
                      )}
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