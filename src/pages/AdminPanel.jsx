import React, { useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import AdminNovedades from '../components/AdminNovedades';


export default function AdminPanel({ onLogout }) {
  const [activeTab, setActiveTab] = useState('novedades');

  return (
    <AdminLayout activeTab={activeTab} onSelectTab={setActiveTab} onLogout={onLogout}>
      {activeTab === 'novedades' && (
        <AdminNovedades 
          totalNews={3} 
         // onOpenForm={() => console.log('Abrir formulario de carga')} 
        />
      )}
      {activeTab === 'plantel' && <div>Componente Plantel Docente</div>}
      {/* Resto de los módulos */}
    </AdminLayout>
  );
}