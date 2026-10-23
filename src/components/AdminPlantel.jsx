import AuthoritiesSection from './adminPlantel/AuthoritiesSection';
import PlantelManagement from './adminPlantel/PlantelManagement';
import useAdminPlantel from './adminPlantel/useAdminPlantel';

export default function AdminPlantel() {
  const plantel = useAdminPlantel();

  return (
    <div className="w-full space-y-8">
      <AuthoritiesSection
        authorities={plantel.autoridades}
        editingId={plantel.editingAuthorityId}
        name={plantel.authorityName}
        submitting={plantel.submitting}
        onBeginEdit={(authority) => {
          plantel.setEditingAuthorityId(authority.id);
          plantel.setAuthorityName(authority.nombre_responsable);
        }}
        onCancelEdit={() => plantel.setEditingAuthorityId(null)}
        onNameChange={plantel.setAuthorityName}
        onSave={plantel.saveAuthority}
      />

      <PlantelManagement {...plantel} />
    </div>
  );
}
