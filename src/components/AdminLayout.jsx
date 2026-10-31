import { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import AdminTopbar from './AdminTopbar';
import ChangePasswordModal from './ChangePasswordModal';
import Alert from '../components/Alert'
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

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [actionErrorMessage, setActionErrorMessage] = useState('');

  useEffect(() => {
    const handleUnauthorizedAction = (event) => {
      setActionErrorMessage(event.detail.message);
    };

    window.addEventListener(
      'ifts2:unauthorized-action',
      handleUnauthorizedAction
    );
    return () =>
      window.removeEventListener(
        'ifts2:unauthorized-action',
        handleUnauthorizedAction
      );
  }, []);

  const currentMeta = TAB_METADATA[activeTab] || {
    title: 'Panel de administración',
    subtitle: 'IFTS N° 2',
  };
  
  const handlePasswordSuccess = () => {
    setShowSuccessAlert(true);
    setTimeout(() => {
      setShowSuccessAlert(false);
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-petrol-50 flex">
      {showSuccessAlert && (
        <div className="fixed top-6 right-6 z-50 shadow-xl rounded-lg min-w-[300px] animate-fade-in-down">
          <Alert variant="info">¡Contraseña actualizada con éxito!</Alert>
        </div>
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