import React from 'react';
import Sidebar from './Sidebar';
import AdminTopbar from './AdminTopbar';

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
    subtitle: 'Gestión de requisitos de Bedelía y enlaces a plataformas externas',
  },
  config: {
    title: 'Configuración',
    subtitle: 'Gestión de usuarios y accesos al sistema',
  },
};

export default function AdminLayout({ onLogout, children, activeTab, onSelectTab }) {
  const currentMeta = TAB_METADATA[activeTab] || {
    title: 'Panel de administración',
    subtitle: 'IFTS N° 2',
  };

  return (
    <div className="min-h-screen bg-petrol-50 flex">
      {/* 1. Sidebar fijo a la izquierda */}
      <Sidebar
        activeTab={activeTab}
        onSelectTab={onSelectTab}
        onLogout={onLogout}
        onChangePassword={() => alert('Abrir modal de cambiar contraseña')}
      />

      {/* 2. Área principal de trabajo */}
      <div className="ml-[280px] flex-1 flex flex-col min-h-screen">
        <AdminTopbar
          title={currentMeta.title}
          subtitle={currentMeta.subtitle}
        />

        <main className="flex-1 px-8 pt-7 pb-12 w-full">
          {children}
        </main>
      </div>
    </div>
  );
}