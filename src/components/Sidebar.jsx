import LogoIFTS2 from './LogoIFTS2';
import { SidebarIcon1, SidebarIcon2, SidebarIcon3, SidebarIcon4, SidebarIcon5, SidebarIcon6, SidebarIcon7, SidebarIcon9, SidebarIcon10 } from '../assets/icons';
import { isGestionAcademicaRole } from '../utils/userRoles';

const NAV_ITEMS = [
  {
    id: 'novedades',
    label: 'Novedades',
    icon: (
      <SidebarIcon1 />
    ),
  },
  {
    id: 'plantel',
    label: 'Plantel Docente',
    icon: (
      <SidebarIcon2 />
    ),
  },
  {
    id: 'academica',
    label: 'Gestión Académica',
    icon: (
      <SidebarIcon3 />
    ),
  },
  {
    id: 'carrera',
    label: 'Carrera',
    icon: (
      <SidebarIcon4 />
    ),
  },
  {
    id: 'ingresantes',
    label: 'Ingresantes',
    icon: (
      <SidebarIcon5 />
    ),
  },
  {
    id: 'tramites',
    label: 'Trámites',
    icon: (
      <SidebarIcon6 />
    ),
  },
];

export default function Sidebar({ activeTab, onSelectTab, onLogout, onChangePassword, user }) {
  const isGestionAcademica = isGestionAcademicaRole(user);

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
                <span
                  className={isActive ? 'text-[#143340]' : 'text-[#8BD9CA]/80'}
                >
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
            type="button"
            disabled={isGestionAcademica}
            onClick={() => onSelectTab('config')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-[0.85rem] transition-all ${
              isGestionAcademica
                ? 'text-white/30 cursor-not-allowed'
                : activeTab === 'config'
                ? 'bg-[#8BD9CA] text-[#143340] font-bold shadow-sm'
                : 'text-[#C2F2E9]/75 font-medium hover:bg-white/5 hover:text-white cursor-pointer'
            }`}
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <span
                className={
                  !isGestionAcademica && activeTab === 'config'
                    ? 'text-[#143340]'
                    : isGestionAcademica
                      ? 'text-white/30'
                      : 'text-[#8BD9CA]/80'
                }
              >
                <SidebarIcon7 />
              </span>
              <span
                className="truncate"
                title={isGestionAcademica ? 'No disponible para este rol' : undefined}
              >
                Configuración
              </span>
            </div>
            {!isGestionAcademica && activeTab === 'config' && (
              <span className="w-2 h-2 rounded-full bg-[#143340] shrink-0" />
            )}
          </button>
        </div>
      </nav>

      {/* ── FOOTER PERFIL ── */}
      <div className="p-5 border-t border-white/10 space-y-2.5">
        <div className="flex items-center gap-3 px-1 py-1 mb-1">
          <div className="w-9 h-9 rounded-full bg-[#235459] flex items-center justify-center shrink-0">
            <div className="w-8 h-8 rounded-full bg-petrol-900 text-mint-300 font-bold text-xs flex items-center justify-center">
              {user.iniciales ||
                (user.nombre_completo || user.nombre || 'US')
                  .substring(0, 2)
                  .toUpperCase()}
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-white text-xs font-semibold leading-tight truncate">
              {user?.nombre || 'Administrador'}
            </p>
            <p className="text-[0.7rem] text-[#518C8C] truncate mt-0.5">
              {user?.rol_institucional || 'IFTS Nº 2'}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onChangePassword}
          className="w-full flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-lg border border-[#235459] text-[#8BD9CA] text-[0.78rem] font-semibold hover:bg-white/5 transition-colors cursor-pointer"
        >
          <SidebarIcon9 />
          Cambiar mi contraseña
        </button>

        <button
          type="button"
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-[#C2F2E9]/75 text-[0.78rem] font-semibold hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
        >
          <SidebarIcon10 />
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}