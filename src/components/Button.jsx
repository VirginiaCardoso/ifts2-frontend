import React from 'react';

// El componente Button acepta las siguientes propiedades (props):
// - children: El texto o contenido que va adentro del botón.
// - variant: Determina el estilo ('primary' o 'secondary'). Por defecto es 'primary'.
// - onClick: La función que se ejecuta al hacer clic.
// - className: Clases extra de Tailwind que quieras sumarle.
// - icon: Un componente SVG opcional para acompañar el texto.

export default function Button({ 
  children, 
  variant = 'primary', 
  onClick, 
  className = '', 
  icon 
}) {
  
  // Estilos base compartidos por todos los botones
  const baseStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    borderRadius: '8px',
    fontWeight: 700,
    fontSize: '0.9rem',
    padding: '0.75rem 1.75rem',
    cursor: 'pointer',
    transition: 'all 0.2s',
    border: 'none',
    fontFamily: 'var(--font-body)', // Definido en index.css
  };

  // Estilos específicos para la variante primaria (Color Menta / Acento)
  const primaryStyles = {
    backgroundColor: 'var(--color-mint-400)', // #8BD9CA
    color: 'var(--color-petrol-900)', // #143340
    opacity: 1,
  };

  // Estilos específicos para la variante secundaria (Transparente con borde celeste suave)
  const secondaryStyles = {
    backgroundColor: 'transparent',
    color: 'var(--color-mint-300)', // #C2F2E9
    border: '1.5px solid rgba(139,217,202,0.6)',
  };

  // Elegimos qué estilo aplicar según la prop 'variant'
  const appliedStyles = variant === 'secondary' 
    ? { ...baseStyles, ...secondaryStyles } 
    : { ...baseStyles, ...primaryStyles };

  return (
    <button 
      onClick={onClick} 
      style={appliedStyles}
      // Sumamos la clase hover para el efecto al pasar el mouse
      className={`hover:opacity-90 ${variant === 'secondary' ? 'hover:bg-white/10' : ''} ${className}`}
    >
      {icon && <span style={{ flexShrink: 0, marginTop: '2px' }}>{icon}</span>}
      {children}
    </button>
  );
}