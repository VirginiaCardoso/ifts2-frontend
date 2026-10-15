import React from 'react';

export default function LogoIFTS2({ size = 52, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      aria-label="IFTS N°2 logo" 
      // Reemplazamos el style en línea por la sombra nativa de Tailwind
      className={`drop-shadow-md ${className}`}
    >
      {/* Cuadrados de fondo */}
      <rect x="2" y="2" width="44" height="44" rx="5" className="fill-petrol-900" />
      <rect x="2" y="2" width="44" height="44" rx="5" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" />
      <rect x="54" y="2" width="44" height="44" rx="5" fill="#1e5e3e" />
      <rect x="2" y="54" width="44" height="44" rx="5" fill="#1e5e3e" />
      <rect x="54" y="54" width="44" height="44" rx="5" fill="#2d8055" />
      
      {/* Letras I F T S agrupadas para no repetir propiedades */}
      <g className="fill-white font-sans text-[30px] font-bold" textAnchor="middle">
        <text x="24" y="36">I</text>
        <text x="76" y="36">F</text>
        <text x="24" y="88">T</text>
        <text x="76" y="88">S</text>
      </g>
      
      {/* Número 2 */}
      <text x="50" y="62" textAnchor="middle" className="fill-[#c8a85a]/95 font-sans text-[42px] font-black">
        2
      </text>
    </svg>
  );
}