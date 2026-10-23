import Button from '../Button';

export default function NewsFormModal({
  formData,
  editingId,
  submitting,
  onChange,
  onClose,
  onSubmit,
}) {
  function updateField(event) {
    onChange((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  return (
    <form onSubmit={onSubmit} className="bg-white border border-petrol-100 rounded-2xl p-6 shadow-sm space-y-4">
      <h2 className="text-base font-bold text-petrol-900">
        {editingId ? 'Editar noticia' : 'Nueva noticia'}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="news-title" className="block text-xs font-bold text-petrol-900 uppercase tracking-wider mb-1">
            Título *
          </label>
          <input
            id="news-title"
            name="titulo"
            type="text"
            required
            value={formData.titulo}
            onChange={updateField}
            className="w-full bg-petrol-50 border border-petrol-100 rounded-lg px-3 py-2 text-sm text-petrol-900 focus:outline-none focus:border-mint-400"
          />
        </div>

        <div>
          <label htmlFor="news-category" className="block text-xs font-bold text-petrol-900 uppercase tracking-wider mb-1">
            Etiqueta
          </label>
          <select
            id="news-category"
            name="etiqueta"
            value={formData.etiqueta}
            onChange={updateField}
            className="w-full bg-petrol-50 border border-petrol-100 rounded-lg px-3 py-2 text-sm text-petrol-900 focus:outline-none focus:border-mint-400"
          >
            <option value="Novedades">Novedades</option>
            <option value="Eventos">Eventos</option>
            <option value="Académico">Académico</option>
          </select>
        </div>

        <div>
          <label htmlFor="news-date" className="block text-xs font-bold text-petrol-900 uppercase tracking-wider mb-1">
            Fecha de publicación *
          </label>
          <input
            id="news-date"
            name="fecha_publicacion"
            type="date"
            required
            value={formData.fecha_publicacion}
            onChange={updateField}
            className="w-full bg-petrol-50 border border-petrol-100 rounded-lg px-3 py-2 text-sm text-petrol-900 focus:outline-none focus:border-mint-400"
          />
        </div>

        <div>
          <label htmlFor="news-status" className="block text-xs font-bold text-petrol-900 uppercase tracking-wider mb-1">
            Estado
          </label>
          <select
            id="news-status"
            name="estado"
            value={formData.estado}
            onChange={updateField}
            className="w-full bg-petrol-50 border border-petrol-100 rounded-lg px-3 py-2 text-sm text-petrol-900 focus:outline-none focus:border-mint-400"
          >
            <option value="Publicado">Publicado</option>
            <option value="Borrador">Borrador</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label htmlFor="news-image" className="block text-xs font-bold text-petrol-900 uppercase tracking-wider mb-1">
            URL de Imagen de Portada
          </label>
          <input
            id="news-image"
            name="imagen_portada_url"
            type="url"
            placeholder="https://images.unsplash.com/..."
            value={formData.imagen_portada_url}
            onChange={updateField}
            className="w-full bg-petrol-50 border border-petrol-100 rounded-lg px-3 py-2 text-sm text-petrol-900 focus:outline-none focus:border-mint-400"
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="news-description" className="block text-xs font-bold text-petrol-900 uppercase tracking-wider mb-1">
            Descripción Breve (Extracto) *
          </label>
          <textarea
            id="news-description"
            name="descripcion_breve"
            rows="3"
            required
            placeholder="Resumen o bajada institucional de la noticia..."
            value={formData.descripcion_breve}
            onChange={updateField}
            className="w-full bg-petrol-50 border border-petrol-100 rounded-lg px-3 py-2 text-sm text-petrol-900 focus:outline-none focus:border-mint-400 resize-none"
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
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
  );
}