import React from 'react';
import LogoIFTS2 from './LogoIFTS2';

const NAV_ITEMS = [
  {
    id: 'novedades',
    label: 'Novedades',
    icon: (
      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M19 20H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1m2 13a2 2 0 0 1-2-2V7m2 13a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
      </svg>
    ),
  },
  {
    id: 'plantel',
    label: 'Plantel Docente',
    icon: (
      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    id: 'academica',
    label: 'Gestión Académica',
    icon: (
      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
  },
  {
    id: 'carrera',
    label: 'Carrera',
    icon: (
      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
  {
    id: 'ingresantes',
    label: 'Ingresantes',
    icon: (
      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="8.5" cy="7" r="4" />
        <line x1="20" y1="8" x2="20" y2="14" />
        <line x1="23" y1="11" x2="17" y2="11" />
      </svg>
    ),
  },
  {
    id: 'tramites',
    label: 'Trámites',
    icon: (
      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="9 11 12 14 22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    ),
  },
];

export default function Sidebar({ activeTab, onSelectTab, onLogout, onChangePassword }) {
  return (
    <aside className="fixed top-0 left-0 bottom-0 w-[280px] bg-[#0d2229] flex flex-col z-20 border-r border-white/5 select-none">
      
      {/* ── HEADER CON LOGO OFICIAL ── */}
      <div className="p-6 border-b border-white/10 flex items-center gap-3.5">
        <LogoIFTS2 size={46} className="shrink-0" />
        <div>
          <span 
            className="text-white text-lg font-bold tracking-tight block leading-tight" 
            style={{ fontFamily: 'var(--font-display, serif)' }}
          >
            IFTS Nº 2
          </span>
          <span className="text-[0.65rem] text-[#8BD9CA]/75 uppercase tracking-widest font-semibold block mt-1">
            PANEL DE ADMINISTRACIÓN
          </span>
        </div>
      </div>

      {/* ── NAVEGACIÓN ── */}
      <nav className="flex-1 px-4 py-6 overflow-y-auto space-y-1.5">
        <p className="text-[0.68rem] font-bold text-white/35 uppercase tracking-wider px-3 mb-3">
          CONTENIDO DEL SITIO
        </p>

        {NAV_ITEMS.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-[0.85rem] transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#8BD9CA] text-[#143340] font-bold shadow-sm'
                  : 'text-[#C2F2E9]/75 font-medium hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <span className={isActive ? 'text-[#143340]' : 'text-[#8BD9CA]/80'}>
                  {item.icon}
                </span>
                <span className="truncate">{item.label}</span>
              </div>
              {isActive && (
                <span className="w-2 h-2 rounded-full bg-[#143340] shrink-0" />
              )}
            </button>
          );
        })}

        {/* ── LÍNEA DIVISORIA Y SECCIÓN SISTEMA ── */}
        <div className="pt-5 mt-5 border-t border-white/10">
          <p className="text-[0.68rem] font-bold text-white/35 uppercase tracking-wider px-3 mb-3">
            SISTEMA
          </p>

          <button
            onClick={() => onSelectTab('config')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-[0.85rem] transition-all cursor-pointer ${
              activeTab === 'config'
                ? 'bg-[#8BD9CA] text-[#143340] font-bold shadow-sm'
                : 'text-[#C2F2E9]/75 font-medium hover:bg-white/5 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <span className={activeTab === 'config' ? 'text-[#143340]' : 'text-[#8BD9CA]/80'}>
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
              </span>
              <span className="truncate">Configuración</span>
            </div>
            {activeTab === 'config' && (
              <span className="w-2 h-2 rounded-full bg-[#143340] shrink-0" />
            )}
          </button>
        </div>
      </nav>

      {/* ── FOOTER PERFIL ── */}
      <div className="p-5 border-t border-white/10 space-y-2.5">
        <div className="flex items-center gap-3 px-1 py-1 mb-1">
          <div className="w-9 h-9 rounded-full bg-[#235459] flex items-center justify-center shrink-0">
            <svg className="w-4 h-4 text-[#8BD9CA]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-white text-xs font-semibold leading-tight truncate">Administrador</p>
            <p className="text-[0.7rem] text-[#518C8C] truncate mt-0.5">IFTS Nº 2</p>
          </div>
        </div>

        <button
          type="button"
          onClick={onChangePassword}
          className="w-full flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-lg border border-[#235459] text-[#8BD9CA] text-[0.78rem] font-semibold hover:bg-white/5 transition-colors cursor-pointer"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          Cambiar mi contraseña
        </button>

        <button
          type="button"
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-[#C2F2E9]/75 text-[0.78rem] font-semibold hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Cerrar sesión
        </button>
      </div>

    </aside>
  );
}