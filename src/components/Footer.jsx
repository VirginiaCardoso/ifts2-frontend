import React from "react";
import LogoIFTS2 from './LogoIFTS2';

export default function Footer({ onLoginClick = () => {} }) {
    return(
        <footer className="bg-petrol-950 text-gray-300 pt-16 pb-8 px-6 md:px-12 font-sans border-t border-petrol-900">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 pb-12">
                {/* Columna 1: Logo, Datos de Contacto y Redes */}
                <div className="md:col-span-5 flex flex-col gap-4 text-sm">
                    {/* Logo y Nombre */}
                    <div className="flex items-center gap-3 mb-2">
                        <LogoIFTS2 size={40} />
                        <div>
                            <h3 className="text-white text-base leading-tight">IFTS N° 2</h3>
                            <p className="text-mint-400 text-xs font-semibold tracking-wider uppercase">
                                Emprendimientos Gastronómicos
                            </p>
                        </div>
                    </div>
                    <p className="text-xs text-gray-400">
                        Instituto de Formación Técnica Superior N° 2 · Ministerio de Educación · Gobierno de la Ciudad de Buenos Aires.
                    </p>

                    {/* Información de Contacto con íconos de Tailwind/SVG */}
                    <div className="flex flex-col gap-2 mt-2 text-xs">
                        <div className="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-mint-400 shrink-0">
                                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                                <circle cx="12" cy="10" r="3" />
                            </svg>
                            <span>Cañada de Gómez 3850, Villa Lugano, CABA</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="currentColor" 
                                strokeWidth="1" 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                className="w-4 h-4 text-mint-400 shrink-0"
                            >
                                <circle cx="12" cy="12" r="10" />
                                <polyline points="12 6 12 12 16 14" />
                            </svg>
                            <span>Lunes a Viernes, 18:00–22:00 hs</span>
                        </div>
                        <div className="flex items-start gap-2">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="currentColor" 
                                strokeWidth="1" 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                className="w-4 h-4 text-mint-400 shrink-0"
                            >
                                <rect width="20" height="16" x="2" y="4" rx="2" />
                                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                            </svg>
                            <div>
                                <span className="text-gray-400">Institucional: </span>
                                <a href="mailto:dfts_ifts2_de20@bue.edu.ar" className="text-mint-400">
                                    dfts_ifts2_de20@bue.edu.ar
                                </a>
                            </div>
                        </div>
                        <div className="flex items-start gap-2">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="currentColor" 
                                strokeWidth="1" 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                className="w-4 h-4 text-mint-400 shrink-0"
                            >
                                <rect width="20" height="16" x="2" y="4" rx="2" />
                                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                            </svg>
                            <div>
                                <span className="text-gray-400">Bedelía: </span>
                                <a href="mailto:bedelia.ifts2@gmail.com" className="text-mint-400">
                                    bedelia.ifts2@gmail.com
                                </a>
                            </div>
                        </div>
                        <div className="flex items-start gap-2">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="currentColor" 
                                strokeWidth="1" 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                className="w-4 h-4 text-mint-400 shrink-0"
                            >
                                <rect width="20" height="16" x="2" y="4" rx="2" />
                                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                            </svg>
                            <div>
                                <span className="text-gray-400">Trabajos Prácticos: </span>
                                <a href="mailto:ayudantiaiftsn2@gmail.com" className="text-mint-400">
                                    ayudantiaiftsn2@gmail.com
                                </a>
                            </div>
                        </div>
                    </div>
                    {/* Botones de Redes Sociales */}
                    <div className="flex gap-3 mt-4">
                        <a 
                            href="https://instagram.com" 
                            target="_blank" 
                            rel="noreferrer" 
                            className="bg-petrol-800 p-2 rounded-lg border-1 border-solid border-[var(--color-mint-500)] text-white inline-flex items-center justify-center"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                            </svg>
                        </a>
                        <a 
                            href="https://facebook.com" 
                            target="_blank" 
                            rel="noreferrer" 
                            className="bg-petrol-800 p-2 rounded-lg border-1 border-solid border-[var(--color-mint-500)] text-white "
                        >
                            <svg 
                                role="img" 
                                xmlns="http://www.w3.org/2000/svg" 
                                viewBox="0 0 24 24" 
                                fill="white" 
                                stroke="currentColor" 
                                strokeWidth="1" 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                className="w-5 h-5"
                            >
                                <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287
                                 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z"/>
                            </svg>
                        </a>
                    </div>
                </div> 
                {/* Columna 2: Navegación Interna */}
                <div className="md:col-span-3 flex flex-col gap-3">
                    <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-2">
                        Navegación
                    </h4>
                    <ul className="flex flex-col gap-2.5 text-sm text-gray-300">
                        <li><a href="#inicio" className="hover:text-mint-300 transition-colors">Inicio</a></li>
                        <li><a href="#novedades" className="hover:text-mint-300 transition-colors">Novedades</a></li>
                        <li><a href="#institucional" className="hover:text-mint-300 transition-colors">Institucional</a></li>
                        <li><a href="#carrera" className="hover:text-mint-300 transition-colors">Carrera</a></li>
                        <li><a href="#tramites" className="hover:text-mint-300 transition-colors">Trámites</a></li>
                        <li><a href="#contacto" className="hover:text-mint-300 transition-colors">Contacto</a></li>
                        <li>
                            <a
    href="#intranet"
    onClick={(e) => {
      e.preventDefault();
      onLoginClick();
    }}
    className="hover:text-mint-300 transition-colors cursor-pointer"
  >
    Intranet
  </a>
                        </li>
                    </ul>
                </div>
                {/* Columna 3: Plataformas Externas */}
                <div className="md:col-span-4 flex flex-col gap-3">  
                    <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-2">
                        Plataformas Externas
                    </h4>
                    <ul className="flex flex-col gap-2.5 text-sm">
                        <li>
                            <a href="https://aulasvirtuales.bue.edu.ar/" target="_blank" rel="noreferrer" className="text-mint-400 hover:text-gray-400 flex items-center gap-1">
                                Aulas Virtuales / Moodle ↗
                            </a>
                        </li>
                        <li>
                            <a href="https://guarani-gestionagencia.bue.edu.ar/" target="_blank" rel="noreferrer" className="text-mint-400 hover:text-gray-400 flex items-center gap-1">
                                SIU Guaraní · Alumnos ↗
                            </a>
                        </li>
                        <li>
                            <a href="#" target="_blank" rel="noreferrer" className="text-mint-400 hover:text-gray-400 flex items-center gap-1">
                                SIU Guaraní · Gestión Académica ↗
                            </a>
                        </li>
                        <li>
                            <a href="https://www.anses.gob.ar/educacion/progresar" target="_blank" rel="noreferrer" className="text-mint-400 hover:text-gray-400 flex items-center gap-1">
                                Becas PROGRESAR ↗
                            </a>
                        </li>
                        <li>
                            <a href="https://www.argentina.gob.ar/miargentina" target="_blank" rel="noreferrer" className="text-mint-400 hover:text-gray-400 flex items-center gap-1">
                                Mi Argentina · Título Digital ↗
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            {/* Línea Divisora y Créditos / Legales */}
            <div className="max-w-7xl mx-auto pt-6 border-t border-petrol-900/80 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-4">
                <p>© 2026 IFTS N° 2 · Instituto de Formación Técnica Superior N° 2 · Ministerio de Educación · GCBA</p>
                <p>Resolución de carrera — Tecnicatura Superior en Emprendimientos Gastronómicos</p>
            </div>
        </footer>
    );
}