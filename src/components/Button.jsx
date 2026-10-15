import React from 'react';

// El componente Button acepta las siguientes propiedades:
// - children: El texto del botón.
// - variant: 'primary' (Menta), 'secondary' (Petróleo claro), 'danger' (Rojo claro para eliminar), 'outline' (Borde menta para editar).
// - onClick: La función que se ejecuta al hacer clic.
// - className: Clases adicionales de Tailwind para márgenes o ajustes específicos.
// - type: Tipo de botón (submit, button).

export default function Button({ 
  children, 
  variant = 'primary', 
  onClick, 
  className = '',
  type = 'button'
}) {
  
  // Estilos base que comparten todos los botones
  const baseStyles = "inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200";

  // Estilos específicos para cada variante usando las variables de Tailwind (petrol y mint)
  const variants = {
    primary: "bg-mint-400 text-petrol-900 hover:bg-mint-500 shadow-sm",
    secondary: "bg-petrol-600 text-white hover:bg-petrol-700 shadow-sm",
    danger: "bg-red-50 text-red-700 hover:bg-red-100", // Mantenemos los colores estándar de Tailwind para advertencias
    outline: "bg-transparent border border-petrol-100 text-petrol-700 hover:bg-petrol-50 hover:border-mint-400"
  };

  const selectedVariant = variants[variant] || variants.primary;

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${selectedVariant} ${className}`}
    >
      {children}
    </button>
  );
}