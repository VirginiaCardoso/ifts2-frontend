import React from 'react';

// El componente Input acepta props clave para formularios:
// - label: El texto descriptivo arriba del input.
// - type: 'text', 'email', 'password', etc.
// - value y onChange: Para controlar el valor desde el formulario.
// - error: Un texto de error que, si existe, pone el borde rojo y muestra el mensaje.
// - required: Muestra el asterisco (*) si es obligatorio.
// - placeholder: Texto de ayuda dentro del campo.
// - className: Clases adicionales de Tailwind.

export default function Input({
  label,
  type = 'text',
  value,
  onChange,
  name,
  id,
  placeholder = '',
  required = false,
  error = '',
  className = '',
}) {
  return (
    <div className={`flex flex-col ${className}`}>
      {/* Etiqueta (Label) */}
      {label && (
        <label className="mb-1.5 text-[0.72rem] font-bold uppercase tracking-wide text-petrol-700">
          {label} {required && <span className="text-mint-400">*</span>}
        </label>
      )}

      {/* Contenedor del campo y el ícono de error (si lo hay) */}
      <div className="relative">
        <input
          type={type}
          value={value}
          id={id || name}
          name={name}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`w-full rounded-lg border-[1.5px] bg-petrol-50 px-3.5 py-2.5 text-sm text-petrol-900 outline-none transition-colors duration-200 focus:border-mint-400
            ${error ? 'border-red-500 pr-10' : 'border-petrol-100 pr-3.5'}
          `}
        />

        {/* Advertencia que aparece solo si hay error */}
        {error && (
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-red-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
          </div>
        )}
      </div>

      {/* Mensaje de Error */}
      {error && (
        <span className="mt-1.5 text-xs font-medium text-red-500">{error}</span>
      )}
    </div>
  );
}