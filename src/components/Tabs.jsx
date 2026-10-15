import React from 'react';

// El componente Tabs recibe:
// - tabs: Un arreglo de objetos con id y label. Ej: [{ id: 'materias', label: 'Listado de Materias' }, ...]
// - activeTab: El id de la pestaña que está seleccionada actualmente.
// - onChange: Función que se ejecuta al hacer clic en una pestaña, devolviendo su id.

export default function Tabs({ tabs, activeTab, onChange }) {
  return (
    <div className="flex border-b border-petrol-100 bg-white rounded-t-xl px-2">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`
              px-6 py-4 text-[0.85rem] font-bold transition-all duration-200 border-b-2 
              ${isActive 
                ? 'border-mint-400 text-petrol-900' 
                : 'border-transparent text-gray-400 hover:text-petrol-600 hover:bg-petrol-50'}
            `}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}