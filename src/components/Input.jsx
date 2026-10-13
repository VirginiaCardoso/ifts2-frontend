import React from 'react';

// El componente Input acepta props clave para formularios:
// - label: El texto descriptivo arriba del input.
// - type: 'text', 'email', 'password', etc.
// - value y onChange: Para controlar el valor desde el formulario.
// - error: Un texto de error que, si existe, pone el borde rojo y muestra el mensaje.
// - required: Muestra el asterisco (*) si es obligatorio.

export default function Input({
  label,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  required = false,
  error = '',
  className = ''
}) {
  return (
    <div className={`flex flex-col mb-4 ${className}`}>
      {/* Etiqueta (Label) */}
      {label && (
        <label 
          style={{ 
            color: '#235459', 
            fontSize: '0.72rem', 
            fontWeight: 700, 
            letterSpacing: '0.08em', 
            textTransform: 'uppercase', 
            marginBottom: '0.4rem' 
          }}
        >
          {label} {required && <span className="text-[#8BD9CA]">*</span>}
        </label>
      )}

      {/* Campo de texto */}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        style={{ 
          width: '100%', 
          // Si hay error, el borde se pone rojo, si no, usa el color base
          border: `1.5px solid ${error ? '#e05c5c' : '#dceee9'}`, 
          borderRadius: '8px', 
          padding: '0.6rem 0.85rem', 
          fontSize: '0.875rem', 
          color: '#143340', 
          outline: 'none', 
          backgroundColor: '#f8fcfb', 
          transition: 'border-color 0.2s' 
        }}
        // Pseudo-clase de Tailwind para el efecto "focus" (cuando haces clic adentro)
        className="focus:border-[#8BD9CA]"
      />

      {/* Mensaje de Error (Validación QA) */}
      {error && (
        <span style={{ color: '#e05c5c', fontSize: '0.75rem', marginTop: '0.4rem', fontWeight: 500 }}>
          {error}
        </span>
      )}
    </div>
  );
}