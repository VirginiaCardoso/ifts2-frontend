import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../components/AdminLayout';
import AdminNovedades from '../components/AdminNovedades';


export default function AdminPanel({ onLogout }) {
  const [activeTab, setActiveTab] = useState('novedades');
  const navigate = useNavigate();

  // Datos del usuario logueado en la sesión
  const currentUser = JSON.parse(localStorage.getItem('ifts2_user') || '{}');

  // Cierre de sesión
  const handleLogout = () => {
    localStorage.removeItem('ifts2_token');
    localStorage.removeItem('ifts2_user');
    navigate('/');
  };

  return (
    <AdminLayout activeTab={activeTab} onSelectTab={setActiveTab} onLogout={handleLogout} user={currentUser}>
      {activeTab === 'novedades' && (
        <AdminNovedades 
          totalNews={3} 
          onOpenForm={() => console.log('Abrir formulario')} 
        />
      )}
      {activeTab === 'plantel' && <div>Componente Plantel Docente</div>}
      {/* Resto de módulos */}
    </AdminLayout>
  );
}