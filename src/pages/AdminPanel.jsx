import AdminCarrera from '../components/adminCarrera/AdminCarrera';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../components/AdminLayout';
import AdminNovedades from '../components/AdminNovedades';
import AdminPlantel from '../components/AdminPlantel';
import GestionAcademica from '../components/adminGestionAcademica/GestionAcademica'
import AdminIngresantes from '../components/AdminIngresantes';
import AdminConfiguracion from '../components/AdminConfiguracion';
import AdminTramitesView from '../components/adminTramites/AdminTramitesView';
import { isGestionAcademicaRole } from '../utils/userRoles';


export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('novedades');
  const [currentUser, setCurrentUser] = useState(() =>
    JSON.parse(localStorage.getItem('ifts2_user') || '{}')
  );
  const navigate = useNavigate();

  const isGestionAcademica = isGestionAcademicaRole(currentUser);

  const handleCurrentUserUpdate = (updates) => {
    setCurrentUser((user) => {
      const updatedUser = {
        ...user,
        ...updates,
        nombre: updates.nombre_completo,
        iniciales:
          updates.nombre_completo?.substring(0, 2).toUpperCase() ??
          user.iniciales,
      };
      localStorage.setItem('ifts2_user', JSON.stringify(updatedUser));
      return updatedUser;
    });
  };

  const handleSelectTab = (tab) => {
    if (tab === 'config' && isGestionAcademica) return;
    setActiveTab(tab);
  };

  // Cierre de sesión
  const handleLogout = () => {
    localStorage.removeItem('ifts2_token');
    localStorage.removeItem('ifts2_user');
    navigate('/');
  };

  return (
    <AdminLayout
      activeTab={activeTab}
      onSelectTab={handleSelectTab}
      onLogout={handleLogout}
      user={currentUser}
    >
      {activeTab === 'novedades' && <AdminNovedades />}
      {activeTab === 'plantel' && <AdminPlantel />}
      {activeTab === 'academica' && <GestionAcademica user={currentUser} />}
      {activeTab === 'carrera' && <AdminCarrera user={currentUser} />}
      {activeTab === 'ingresantes' && <AdminIngresantes />}
      {activeTab === 'tramites' && <AdminTramitesView />}
      {/* Resto de módulos */}
      {activeTab === 'config' && !isGestionAcademica && (
        <AdminConfiguracion
          currentUser={currentUser}
          onCurrentUserUpdate={handleCurrentUserUpdate}
        />
      )}
    </AdminLayout>
  );
}