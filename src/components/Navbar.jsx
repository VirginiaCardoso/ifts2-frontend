import React, { useState, useRef } from 'react';
import LogoIFTS2 from './LogoIFTS2';

// Constante con todos los enlaces 
const NAV_LINKS = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Novedades', href: '#novedades' },
  {
    label: 'Institucional',
    href: '#institucional',
    children: [
      { label: 'Acerca del IFTS N°2', href: '#institucional' },
      { label: 'Plantel docente', href: '#plantel-docente' },
      { label: 'Ministerio de Educación GCBA', href: 'https://www.buenosaires.gob.ar/educacion', external: true },
      { label: 'Agencia de Habilidades para el Futuro', href: 'https://aulasvirtuales.bue.edu.ar/', external: true },
    ],
  },
  {
    label: 'Carrera',
    href: '#carrera',
    children: [
      { label: 'Plan de estudios', href: '#carrera-plan' },
      { label: 'Materias promocionables', href: '#carrera-promocionables' },
      { label: 'Correlatividades', href: '#carrera-correlativas' },
      { label: 'Mesas de exámenes finales', href: '#carrera-mesas' },
      { label: 'Fechas importantes para ingresantes', href: '#carrera-requisitos' },
      { label: 'Horarios de materias', href: '#carrera-horarios' },
    ],
  },
  {
    label: 'Trámites',
    href: '#tramites',
    children: [
      { label: 'Certificado de alumno regular', href: '#tramites' },
      { label: 'Analítico parcial', href: '#tramites' },
      { label: 'Inscripción a materias (SIU)', href: 'https://guarani-gestionagencia.bue.edu.ar/', external: true },
      { label: 'Becas PROGRESAR', href: 'https://www.anses.gob.ar/educacion/progresar', external: true },
    ],
  },
  { label: 'Contacto', href: '#contacto' },
];

export default function Navbar({ onLoginClick }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const closeTimer = useRef(null);
  const [mobileExpanded, setMobileExpanded] = useState(null);

  return (
    <>
      {/* ── TOPBAR  ── */}
      <div className="hidden md:flex items-center justify-between gap-4 px-8 py-1.5 text-xs bg-petrol-950">
        <span style={{ color: 'rgba(255,255,255,0.45)', letterSpacing: '0.06em' }}>
          IFTS N° 2 · Instituto de Formación Técnica Superior · Ministerio de Educación · GCBA
        </span>
        <div className="flex items-center gap-4">
          <a href="https://www.instagram.com/ifts_2_ok/" target="_blank" rel="noreferrer" style={{ color: 'rgba(255,255,255,0.55)' }} className="flex items-center gap-1 hover:text-[#8BD9CA] transition-colors">
            @ifts_2_ok
          </a>
        </div>
      </div>

      {/* ── HEADER PRINCIPAL ── */}
      <header className="bg-petrol-900 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 md:h-20">

          {/* Logo y Nombre */}
          <a href="#inicio" className="flex items-center gap-3 group flex-shrink-0">
            {/* LogoIFTS2 */}
            <LogoIFTS2 size={42} className="transition-transform group-hover:scale-105" />
            <div className="hidden sm:block leading-tight">
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: '#ffffff', lineHeight: 1.1 }}>
                IFTS N° 2
              </p>
              <p style={{ fontSize: '0.65rem', color: '#8BD9CA', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600 }}>
                Emprendimientos Gastronómicos
              </p>
            </div>
          </a>

          {/* Menú Desktop */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map(link => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => {
                  if (closeTimer.current) clearTimeout(closeTimer.current);
                  if (link.children) setOpenDropdown(link.label);
                }}
                onMouseLeave={() => {
                  closeTimer.current = setTimeout(() => setOpenDropdown(null), 120);
                }}
              >
                {link.children ? (
                  <>
                    <button
                      onClick={() => setOpenDropdown(openDropdown === link.label ? null : link.label)}
                      className="flex items-center gap-1 text-[#C2F2E9] text-sm font-medium px-3 py-2 rounded-md hover:bg-white/10 hover:text-white transition-colors"
                    >
                      {link.label}
                      <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className={`w-2.5 h-2.5 opacity-70 transition-transform ${openDropdown === link.label ? 'rotate-180' : ''}`}>
                        <path d="M2 4l4 4 4-4"/>
                      </svg>
                    </button>
                    {openDropdown === link.label && (
                      <div className="absolute top-full left-0 pt-2 z-50">
                        <div className="bg-[#0d2229] border border-[#235459] rounded-lg p-2 min-w-[240px] shadow-2xl">
                          {link.children.map(child => (
                            <a
                              key={child.label}
                              href={child.href}
                              target={child.external ? '_blank' : undefined}
                              rel={child.external ? 'noreferrer' : undefined}
                              onClick={() => setOpenDropdown(null)}
                              className="flex items-center justify-between px-3 py-2 rounded-md text-[#C2F2E9] text-sm hover:bg-white/10 hover:text-white transition-colors"
                            >
                              {child.label}
                              {child.external && <span className="text-[10px] opacity-50">↗</span>}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <a
                    href={link.href}
                    className="block text-[#C2F2E9] text-sm font-medium px-3 py-2 rounded-md hover:bg-white/10 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                )}
              </div>
            ))}
            
          </nav>

          {/* Menú Hamburguesa (Mobile) */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden flex flex-col gap-1.5 p-2">
            <span className={`block w-6 h-0.5 bg-[#8BD9CA] rounded-full transition-transform ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-[#8BD9CA] rounded-full transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-[#8BD9CA] rounded-full transition-transform ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>

        {/* Menú Desplegable Mobile */}
        {menuOpen && (
          <div className="lg:hidden bg-[#1a3f4e] border-t border-[#235459] px-4 py-3 flex flex-col gap-1">
            {NAV_LINKS.map(link => (
              <div key={link.label}>
                {link.children ? (
                  <>
                    <button
                      onClick={() => setMobileExpanded(mobileExpanded === link.label ? null : link.label)}
                      className="w-full flex items-center justify-between text-[#C2F2E9] p-2 rounded-md font-medium text-base hover:bg-white/10 text-left"
                    >
                      {link.label}
                      <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" className={`w-3 h-3 opacity-60 transition-transform ${mobileExpanded === link.label ? 'rotate-180' : ''}`}>
                        <path d="M2 4l4 4 4-4"/>
                      </svg>
                    </button>
                    {mobileExpanded === link.label && (
                      <div className="border-l-2 border-[#518C8C] ml-3 pl-3 mb-1">
                        {link.children.map(child => (
                          <a
                            key={child.label}
                            href={child.href}
                            onClick={() => setMenuOpen(false)}
                            className="block text-[#C2F2E9]/80 py-2 text-sm hover:text-white"
                          >
                            {child.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block text-[#C2F2E9] p-2 rounded-md font-medium text-base hover:bg-white/10"
                  >
                    {link.label}
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </header>
    </>
  );
}