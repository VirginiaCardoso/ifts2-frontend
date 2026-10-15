import React from 'react';

export default function Alert({ children, variant = 'info', icon = true }) {
  
  // Configuramos las clases de Tailwind según la variante
  const variants = {
    info: {
      container: 'bg-petrol-50 border-petrol-200 text-petrol-900',
      icon: 'text-petrol-700'
    },
    warning: {
      container: 'bg-amber-50 border-amber-300 text-amber-900',
      icon: 'text-amber-500'
    },
    error: {
      container: 'bg-red-50 border-red-200 text-red-700',
      icon: 'text-red-600'
    }
  };

  const current = variants[variant] || variants.info;

  return (
    <div className={`flex items-start gap-3 rounded-lg border p-4 text-[0.9rem] leading-relaxed ${current.container}`}>
      
      {icon && (
        <div className={`mt-0.5 shrink-0 ${current.icon}`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
        </div>
      )}
      
      <div>
        {children}
      </div>
    </div>
  );
}