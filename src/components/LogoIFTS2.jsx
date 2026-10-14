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
      // En React los estilos en línea van como objetos
      style={{ filter: 'drop-shadow(rgba(0, 0, 0, 0.45) 0px 2px 8px)' }}
      className={className}
    >
      {/* Cuadrados de fondo */}
      <rect x="2" y="2" width="44" height="44" rx="5" fill="#143340" />
      <rect x="2" y="2" width="44" height="44" rx="5" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" />
      <rect x="54" y="2" width="44" height="44" rx="5" fill="#1e5e3e" />
      <rect x="2" y="54" width="44" height="44" rx="5" fill="#1e5e3e" />
      <rect x="54" y="54" width="44" height="44" rx="5" fill="#2d8055" />
      
      {/* Letras I F T S */}
      <text x="24" y="36" textAnchor="middle" fontSize="30" fontWeight="700" fontFamily="Arial,sans-serif" fill="white">I</text>
      <text x="76" y="36" textAnchor="middle" fontSize="30" fontWeight="700" fontFamily="Arial,sans-serif" fill="white">F</text>
      <text x="24" y="88" textAnchor="middle" fontSize="30" fontWeight="700" fontFamily="Arial,sans-serif" fill="white">T</text>
      <text x="76" y="88" textAnchor="middle" fontSize="30" fontWeight="700" fontFamily="Arial,sans-serif" fill="white">S</text>
      
      {/* El número 2 dorado superpuesto en el centro */}
      <text x="50" y="62" textAnchor="middle" fontSize="42" fontWeight="900" fontFamily="Arial,sans-serif" fill="#c8a85a" opacity="0.95">2</text>
    </svg>
  );
}