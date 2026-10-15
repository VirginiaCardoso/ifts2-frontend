import React from 'react';

// El componente Table se divide en sub-componentes para mayor flexibilidad.

export function Table({ children, className = '', variant = 'default' }) {
  return (
    <div className={`w-full overflow-x-auto rounded-xl border border-petrol-100 bg-white shadow-sm table-variant-${variant} ${className}`}>
      <table className="w-full text-left border-collapse">
        {children}
      </table>
    </div>
  );
}

export function Thead({ children }) {
  return (
    <thead className="bg-petrol-900 text-white">
      {children}
    </thead>
  );
}

export function Tbody({ children, className = '' }) {
  return (
    <tbody className={`text-petrol-900 ${className}`}>
      {children}
    </tbody>
  );
}

export function Tr({ children, className = '', isSpecial = false }) {
  const baseClasses = "transition-colors group/row";
  
  // Usamos amber-50 de Tailwind para los recreos y petrol-50 para el hover general
  const specialBg = isSpecial ? 'bg-amber-50' : '';
  const defaultHover = !isSpecial ? 'hover:bg-petrol-50' : '';
  
  // Usamos slate-50 para que el diseño zebra sea sutil
  const zebraClasses = !isSpecial ? '[.table-variant-zebra_&]:even:bg-slate-50' : '';

  return (
    <tr className={`border-b border-petrol-100 last:border-b-0 ${baseClasses} ${specialBg} ${defaultHover} ${zebraClasses} ${className}`}>
      {children}
    </tr>
  );
}

export function Th({ children, className = '', align = 'left' }) {
  const alignment = align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left';
  return (
    <th className={`px-5 py-4 text-[0.7rem] font-bold uppercase tracking-widest ${alignment} ${className}`}>
      {children}
    </th>
  );
}

export function Td({ children, className = '', align = 'left', colSpan = 1 }) {
  const alignment = align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left';
  return (
    <td colSpan={colSpan} className={`px-5 py-4 text-[0.85rem] leading-relaxed ${alignment} ${className}`}>
      {children}
    </td>
  );
}