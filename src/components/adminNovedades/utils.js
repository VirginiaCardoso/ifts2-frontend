export function createInitialForm() {
  return {
    titulo: '',
    etiqueta: 'Novedades',
    fecha_publicacion: new Date().toISOString().split('T')[0],
    imagen_portada_url: '',
    descripcion_breve: '',
    estado: 'Publicado',
  };
}

export function mapNewsToForm(news) {
  const rawDate = news.fecha_publicacion || news.fecha || news.created_at || '';

  return {
    titulo: news.titulo || '',
    etiqueta: news.etiqueta || news.categoria || 'Novedades',
    fecha_publicacion: rawDate
      ? String(rawDate).split('T')[0]
      : new Date().toISOString().split('T')[0],
    imagen_portada_url: news.imagen_portada_url || news.imagen_url || '',
    descripcion_breve: news.descripcion_breve || news.descripcion || news.contenido || '',
    estado: news.estado || 'Publicado',
  };
}

export function mapFormToNews(formData) {
  return {
    titulo: formData.titulo,
    etiqueta: formData.etiqueta,
    categoria: formData.etiqueta,
    fecha_publicacion: formData.fecha_publicacion,
    fecha: formData.fecha_publicacion,
    imagen_portada_url: formData.imagen_portada_url,
    imagen_url: formData.imagen_portada_url,
    descripcion_breve: formData.descripcion_breve,
    descripcion: formData.descripcion_breve,
    estado: formData.estado,
  };
}

export function formatNewsDate(news) {
  const rawDate = news.fecha_publicacion || news.fecha || news.created_at;
  if (!rawDate) return '—';

  const cleanDate = String(rawDate).split('T')[0];
  const [year, month, day] = cleanDate.split('-');
  return year && month && day ? `${day}-${month}-${year}` : cleanDate;
}