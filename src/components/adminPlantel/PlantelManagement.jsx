import Button from '../Button';
import BedelForm from './BedelForm';
import BedelesTable from './BedelesTable';
import ProfessorForm from './ProfessorForm';
import ProfessorsTable from './ProfessorsTable';

export default function PlantelManagement({
  bedelForm,
  bedeles,
  editingBedelId,
  editingProfessorId,
  filteredProfesores,
  isBedelFormOpen,
  isProfessorFormOpen,
  loading,
  materias,
  professorForm,
  searchTerm,
  submitting,
  tabActiva,
  setBedelForm,
  setIsBedelFormOpen,
  setIsProfessorFormOpen,
  setProfessorForm,
  setSearchTerm,
  setTabActiva,
  openCreateBedel,
  openCreateProfessor,
  openEditBedel,
  openEditProfessor,
  removeBedel,
  removeProfessor,
  saveBedel,
  saveProfessor,
  error,
}) {
  const isProfessorTab = tabActiva === 'docentes';

  return (
    <section className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-petrol-100 pb-3">
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => setTabActiva('docentes')}
            className={`pb-2 text-sm font-bold transition-colors border-b-2 ${
              isProfessorTab
                ? 'border-[#143340] text-petrol-900'
                : 'border-transparent text-petrol-600 hover:text-petrol-900'
            }`}
            aria-pressed={isProfessorTab}
          >
            Cuerpo Docente y Ayudantes
          </button>
          <button
            type="button"
            onClick={() => setTabActiva('bedeles')}
            className={`pb-2 text-sm font-bold transition-colors border-b-2 ${
              !isProfessorTab
                ? 'border-[#143340] text-petrol-900'
                : 'border-transparent text-petrol-600 hover:text-petrol-900'
            }`}
            aria-pressed={!isProfessorTab}
          >
            Bedeles ({bedeles.length})
          </button>
        </div>

        <div>
          {isProfessorTab ? (
            <Button
              variant="primary"
              onClick={openCreateProfessor}
              className="!rounded-lg !py-1.5 !px-3.5 !text-xs"
            >
              + Agregar Docente
            </Button>
          ) : (
            <Button
              variant="primary"
              onClick={openCreateBedel}
              className="!rounded-lg !py-1.5 !px-3.5 !text-xs"
            >
              + Agregar Bedel
            </Button>
          )}
        </div>
      </div>

      {isProfessorFormOpen && (
        <ProfessorForm
          form={professorForm}
          editing={Boolean(editingProfessorId)}
          materias={materias}
          submitting={submitting}
          onChange={setProfessorForm}
          onClose={() => setIsProfessorFormOpen(false)}
          onSubmit={saveProfessor}
        />
      )}

      {isBedelFormOpen && (
        <BedelForm
          form={bedelForm}
          editing={Boolean(editingBedelId)}
          submitting={submitting}
          onChange={setBedelForm}
          onClose={() => setIsBedelFormOpen(false)}
          onSubmit={saveBedel}
        />
      )}

      {isProfessorTab ? (
        <ProfessorsTable
          error={error}
          loading={loading}
          professors={filteredProfesores}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onEdit={openEditProfessor}
          onDelete={removeProfessor}
        />
      ) : (
        <BedelesTable
          bedeles={bedeles}
          loading={loading}
          error={error}
          onEdit={openEditBedel}
          onDelete={removeBedel}
        />
      )}
    </section>
  );
}
