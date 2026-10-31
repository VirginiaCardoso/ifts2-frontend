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
  const navigate = useNavigate();

  // Datos del usuario logueado en la sesión
  const currentUser = JSON.parse(localStorage.getItem('ifts2_user') || '{}');
  const isGestionAcademica = isGestionAcademicaRole(currentUser);

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
      {activeTab === 'carrera' && <AdminCarrera />}
      {activeTab === 'ingresantes' && <AdminIngresantes />}
      {activeTab === 'tramites' && <AdminTramitesView />}
      {/* Resto de módulos */}
      {activeTab === 'config' && !isGestionAcademica && <AdminConfiguracion />}
    </AdminLayout>
  );
}