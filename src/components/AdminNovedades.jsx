import Button from './Button';
import {
  AdminNovedadesIcon1,
} from '../assets/icons';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import NewsFormModal from './adminNovedades/NewsFormModal';
import NewsMetrics from './adminNovedades/NewsMetrics';
import NewsTable from './adminNovedades/NewsTable';
import useAdminNovedades from './adminNovedades/useAdminNovedades';

export default function AdminNovedades() {
  const {
    deletingId,
    editingId,
    error,
    filteredNoticias,
    formData,
    isFormOpen,
    loading,
    metrics,
    searchTerm,
    submitting,
    setDeletingId,
    setFormData,
    setIsFormOpen,
    setSearchTerm,
    openCreateForm,
    openEditForm,
    saveNews,
    confirmDelete,
  } = useAdminNovedades();

  return (
    <div className="w-full space-y-6">
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
          onClick={openCreateForm}
          className="!rounded-lg shrink-0"
        >
          <AdminNovedadesIcon1 />
          Cargar nueva noticia
        </Button>
      </div>

      {isFormOpen && (
        <NewsFormModal
          formData={formData}
          editingId={editingId}
          submitting={submitting}
          onChange={setFormData}
          onClose={() => setIsFormOpen(false)}
          onSubmit={saveNews}
        />
      )}

      <NewsMetrics metrics={metrics} />

      <NewsTable
        error={error}
        filteredNoticias={filteredNoticias}
        loading={loading}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onEdit={openEditForm}
        onDelete={setDeletingId}
      />

      {deletingId && (
        <DeleteConfirmationModal
          submitting={submitting}
          onCancel={() => setDeletingId(null)}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
}
