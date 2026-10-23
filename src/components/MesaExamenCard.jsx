import React from 'react';
import Badge from './Badge';
import Button from './Button';
import BaseCard from './BaseCard';
import { MesaExamenCardIcon1, MesaExamenCardIcon2, MesaExamenCardIcon3, MesaExamenCardIcon4 } from '../assets/icons'; // Importamos nuestro componente genérico

export default function MesaExamenCard({ turno, anio, fechas, horario, tribunal, showActions = false }) {
  return (
    // Reemplazamos el div principal por el BaseCard
    // Le pasamos variant="default" (o lo dejamos vacío si esa es tu opción por defecto) y anulamos el padding con p-0 para manejarlo internamente.
    <BaseCard variant="default" padding="sm" className="p-0 flex flex-col h-full">
      
      {/* --- ENCABEZADO OSCURO --- */}
      <div className="px-5 py-1 flex justify-between items-center text-petrol-900">
        <div className="flex items-center gap-2">
          {/* Ícono de Calendario */}
          <MesaExamenCardIcon1 />
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
          <MesaExamenCardIcon2 />
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
              <MesaExamenCardIcon3 />
              Editar
            </Button>
            <Button variant="danger" className="flex-1 text-xs py-2">
              <MesaExamenCardIcon4 />
              Eliminar
            </Button>
          </div>
        )}
      </div>
    </BaseCard>
  );
}