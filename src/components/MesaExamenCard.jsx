import React from 'react';
import Badge from './Badge';
import Button from './Button';
import BaseCard from './BaseCard'; // Importamos nuestro componente genérico

export default function MesaExamenCard({ turno, anio, fechas, horario, tribunal, showActions = false }) {
  return (
    // Reemplazamos el div principal por el BaseCard
    // Le pasamos variant="default" (o lo dejamos vacío si esa es tu opción por defecto) y anulamos el padding con p-0 para manejarlo internamente.
    <BaseCard variant="default" padding="sm" className="p-0 flex flex-col h-full">
      
      {/* --- ENCABEZADO OSCURO --- */}
      <div className="px-5 py-1 flex justify-between items-center text-petrol-900">
        <div className="flex items-center gap-2">
          {/* Ícono de Calendario */}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-[#8BD9CA]">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          <span className="font-bold text-lg">{turno} {anio}</span>
        </div>
        
        {/* Etiqueta / Badge */}
        <Badge variant="neutral" pill={true}>FINAL</Badge>
      </div>

      {/* --- CUERPO DE LA TARJETA --- */}
      <div className="p-2 flex flex-col gap-4 flex-grow">

        {/* Fechas Exactas */}
        <div className="text-gray-500 text-md">
          {fechas}
        </div>
        
        {/* Horario */}
        <div className="text-gray-500 text-sm font-bold flex items-center gap-2">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          {horario}
        </div>
        
        
        
        {/* Lista del Tribunal */}
        <div className="mt-1 pt-1 border-t border-gray-200"></div>
        <div className="flex-grow">
          <p className="text-[#518C8C] text-[0.65rem] font-bold uppercase tracking-widest mb-2">
            Tribunal
          </p>
          <ul className="flex flex-col gap-1.5">
            {tribunal.map((profesor, idx) => (
              <li key={idx} className="text-sm text-[#143340] flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8BD9CA] flex-shrink-0"></span> 
                {profesor}
              </li>
            ))}
          </ul>
        </div>
        
        {/* Botones de Acción */}
        {showActions && (
          <div className="flex gap-3 mt-2">
            <Button variant="outline" className="flex-1 text-xs py-2">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
              Editar
            </Button>
            <Button variant="danger" className="flex-1 text-xs py-2">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
              Eliminar
            </Button>
          </div>
        )}
      </div>
    </BaseCard>
  );
}