import { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import AdminTopbar from './AdminTopbar';
import ChangePasswordModal from './ChangePasswordModal';
import SuccessModal from './SuccessModal';
import ActionErrorModal from './ActionErrorModal';

const TAB_METADATA = {
  novedades: {
    title: 'Novedades',
    subtitle: 'Gestión de noticias y comunicados institucionales',
  },
  plantel: {
    title: 'Plantel Docente',
    subtitle: 'Autoridades y cuerpo docente del instituto',
  },
  academica: {
    title: 'Gestión Académica',
    subtitle: 'Horarios de materias y llamados a mesas de exámenes finales',
  },
  carrera: {
    title: 'Carrera',
    subtitle: 'Plan de estudios y materias promocionables',
  },
  ingresantes: {
    title: 'Ingresantes',
    subtitle: 'Fechas clave, requisitos y proceso de admisión',
  },
  tramites: {
    title: 'Trámites',
    subtitle:
      'Gestión de requisitos de Bedelía y enlaces a plataformas externas',
  },
  config: {
    title: 'Configuración',
    subtitle: 'Gestión de usuarios y accesos al sistema',
  },
};

export default function AdminLayout({
  onLogout,
  children,
  activeTab,
  onSelectTab,
  user,
}) {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const [showPasswordSuccess, setShowPasswordSuccess] = useState(false);
  const [actionErrorMessage, setActionErrorMessage] = useState('');

  useEffect(() => {
    const handleUnauthorizedAction = (event) => {
      setActionErrorMessage(event.detail.message);
    };
    const handleActionError = (event) => {
      setActionErrorMessage(event.detail.message);
    };

    window.addEventListener(
      'ifts2:unauthorized-action',
      handleUnauthorizedAction
    );
    window.addEventListener('ifts2:action-error', handleActionError);
    return () => {
      window.removeEventListener(
        'ifts2:unauthorized-action',
        handleUnauthorizedAction
      );
      window.removeEventListener('ifts2:action-error', handleActionError);
    };
  }, []);

  const currentMeta = TAB_METADATA[activeTab] || {
    title: 'Panel de administración',
    subtitle: 'IFTS N° 2',
  };
  
  const handlePasswordSuccess = () => {
    setShowPasswordSuccess(true);
  };

  return (
    <div
      className="min-h-screen bg-petrol-50 flex"
      onInputCapture={(event) => event.target.setCustomValidity?.('')}
      onSubmitCapture={(event) => {
        const vacio = [...event.target.querySelectorAll('input[required], textarea[required], select[required]')]
          .find((campo) => !campo.matches(':disabled') && !['checkbox', 'radio', 'file'].includes(campo.type) && !campo.value.trim());
        if (vacio) {
          event.preventDefault();
          event.stopPropagation();
          vacio.setCustomValidity('Completá este campo. No puede contener solo espacios.');
          vacio.reportValidity();
        }
      }}
    >
      {showPasswordSuccess && (
        <SuccessModal
          title="Contraseña actualizada"
          message="Tu contraseña se cambió correctamente."
          onClose={() => setShowPasswordSuccess(false)}
        />
      )}
      {actionErrorMessage && (
        <ActionErrorModal
          message={actionErrorMessage}
          onClose={() => setActionErrorMessage('')}
        />
      )}

      <Sidebar
        activeTab={activeTab}
        onSelectTab={onSelectTab}
        onLogout={onLogout}
        user={user}
        onChangePassword={() => setIsPasswordModalOpen(true)}
      />

      <div className="ml-[280px] flex-1 flex flex-col min-h-screen">
        <AdminTopbar
          title={currentMeta.title}
          subtitle={currentMeta.subtitle}
        />

        <main className="flex-1 px-8 pt-7 pb-12 w-full">{children}</main>
      </div>

      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        onSuccess={handlePasswordSuccess}
      />
    </div>
  );
}