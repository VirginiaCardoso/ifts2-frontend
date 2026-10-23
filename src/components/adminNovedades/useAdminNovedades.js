import { useEffect, useMemo, useState } from 'react';
import {
  createNovedad,
  deleteNovedad,
  getNovedades,
  updateNovedad,
} from '../../services/novedadesService';
import { createInitialForm, mapFormToNews, mapNewsToForm } from './utils';

export default function useAdminNovedades() {
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState(createInitialForm);

  useEffect(() => {
    let isMounted = true;

    async function loadNoticias() {
      try {
        const data = await getNovedades(true);
        if (isMounted) setNoticias(Array.isArray(data) ? data : []);
      } catch (loadError) {
        if (isMounted) {
          setError(loadError.message || 'No se pudo conectar con el servidor');
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    void loadNoticias();
    return () => {
      isMounted = false;
    };
  }, []);

  const metrics = useMemo(() => ({
    total: noticias.length,
    publicadas: noticias.filter((item) => (item.estado || 'Publicado') === 'Publicado').length,
    borradores: noticias.filter((item) => item.estado === 'Borrador').length,
  }), [noticias]);

  const filteredNoticias = useMemo(() => {
    const query = searchTerm.toLowerCase();
    return noticias.filter((news) =>
      (news.titulo || '').toLowerCase().includes(query) ||
      (news.etiqueta || news.categoria || '').toLowerCase().includes(query)
    );
  }, [noticias, searchTerm]);

  async function reloadNoticias() {
    try {
      setLoading(true);
      setError('');
      const data = await getNovedades(true);
      setNoticias(Array.isArray(data) ? data : []);
    } catch (loadError) {
      setError(loadError.message || 'No se pudo conectar con el servidor');
    } finally {
      setLoading(false);
    }
  }

  function openCreateForm() {
    setEditingId(null);
    setFormData(createInitialForm());
    setIsFormOpen(true);
  }

  function openEditForm(news) {
    setEditingId(news.id);
    setFormData(mapNewsToForm(news));
    setIsFormOpen(true);
  }

  async function saveNews(event) {
    event.preventDefault();
    try {
      setSubmitting(true);
      const payload = mapFormToNews(formData);
      if (editingId) {
        await updateNovedad(editingId, payload);
      } else {
        await createNovedad(payload);
      }
      setIsFormOpen(false);
      setEditingId(null);
      setFormData(createInitialForm());
      await reloadNoticias();
    } catch (saveError) {
      window.alert(saveError.message || 'Error al guardar la novedad');
    } finally {
      setSubmitting(false);
    }
  }

  async function confirmDelete() {
    if (!deletingId) return;
    try {
      setSubmitting(true);
      await deleteNovedad(deletingId);
      setDeletingId(null);
      await reloadNoticias();
    } catch (deleteError) {
      window.alert(deleteError.message || 'Error al eliminar la novedad');
    } finally {
      setSubmitting(false);
    }
  }

  return {
    error,
    filteredNoticias,
    formData,
    isFormOpen,
    loading,
    metrics,
    searchTerm,
    submitting,
    deletingId,
    editingId,
    setDeletingId,
    setFormData,
    setIsFormOpen,
    setSearchTerm,
    openCreateForm,
    openEditForm,
    saveNews,
    confirmDelete,
  };
}
