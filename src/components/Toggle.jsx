import React from 'react';

// Recibe:
// - checked: Booleano true/false.
// - onChange: Función para cambiar el estado.
// - label: Texto opcional que aparece al lado (ej: "= Promocional").

export default function Toggle({ checked, onChange, label }) {
  return (
    <label className="flex items-center cursor-pointer gap-2">
      <div className="relative">
        <input 
          type="checkbox" 
          className="sr-only" 
          checked={checked} 
          onChange={(e) => onChange(e.target.checked)} 
        />
        {/* Fondo del interruptor (Gris si está apagado, Menta institucional si está prendido) */}
        <div className={`block w-8 h-5 rounded-full transition-colors duration-200 ${checked ? 'bg-mint-400' : 'bg-gray-200'}`}></div>
        {/* Círculo blanco que se desliza */}
        <div className={`absolute left-0.5 top-0.5 bg-white w-4 h-4 rounded-full transition-transform duration-200 shadow-sm ${checked ? 'transform translate-x-3' : ''}`}></div>
      </div>
      
      {/* Etiqueta opcional */}
      {label && (
        <span className="text-[0.75rem] font-bold text-petrol-900">
          {label}
        </span>
      )}
    </label>
  );
}