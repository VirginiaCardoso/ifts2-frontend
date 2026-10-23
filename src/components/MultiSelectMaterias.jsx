import React, { useState, useRef, useEffect } from 'react';
import { MultiSelectMateriasIcon1 } from '../assets/icons';

export default function MultiSelectMaterias({ materiasDisponibles = [], seleccionadas = [], onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [filtro, setFiltro] = useState('');
  const dropRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropRef.current && !dropRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const materiasFiltradas = materiasDisponibles.filter((m) =>
    (m.nombre || '').toLowerCase().includes(filtro.toLowerCase())
  );

  const toggleMateria = (id) => {
    if (seleccionadas.includes(id)) {
      onChange(seleccionadas.filter((mId) => mId !== id));
    } else {
      onChange([...seleccionadas, id]);
    }
  };

  const removerMateria = (id, e) => {
    e.stopPropagation();
    onChange(seleccionadas.filter((mId) => mId !== id));
  };

  return (
    <div className="relative w-full" ref={dropRef}>
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className="min-h-[42px] w-full bg-petrol-50 border border-petrol-100 rounded-lg p-2 flex flex-wrap items-center gap-1.5 cursor-pointer focus-within:border-mint-400"
      >
        {seleccionadas.length === 0 ? (
          <span className="text-xs text-petrol-600/70 select-none px-1">
            Seleccionar una o más materias…
          </span>
        ) : (
          seleccionadas.map((id) => {
            const mat = materiasDisponibles.find((m) => m.id === id);
            return (
              <span
                key={id}
                className="inline-flex items-center gap-1.5 bg-mint-100/70 text-petrol-900 border border-mint-300 text-xs font-semibold px-2 py-0.5 rounded-md"
              >
                {mat ? mat.nombre : `Materia #${id}`}
                <button
                  type="button"
                  onClick={(e) => removerMateria(id, e)}
                  className="hover:text-red-600 text-petrol-700 transition-colors ml-0.5 text-xs font-bold"
                >
                  ✕
                </button>
              </span>
            );
          })
        )}

        <div className="ml-auto text-petrol-600 pr-1">
          <MultiSelectMateriasIcon1 className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </div>

      {isOpen && (
        <div className="absolute z-50 left-0 right-0 top-full mt-1.5 bg-white border border-petrol-100 rounded-xl shadow-xl max-h-56 overflow-hidden flex flex-col">
          <div className="p-2 border-b border-petrol-100 bg-[#f8fcfb]">
            <input
              type="text"
              autoFocus
              placeholder="Filtrar materia…"
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              className="w-full bg-white border border-petrol-100 rounded-md px-2.5 py-1 text-xs text-petrol-900 focus:outline-none focus:border-mint-400"
            />
          </div>

          <div className="overflow-y-auto p-1 divide-y divide-petrol-50">
            {materiasFiltradas.length === 0 ? (
              <div className="p-3 text-center text-xs text-petrol-600">
                No se encontraron coincidencias
              </div>
            ) : (
              materiasFiltradas.map((m) => {
                const isSelected = seleccionadas.includes(m.id);
                return (
                  <label
                    key={m.id}
                    onClick={() => toggleMateria(m.id)}
                    className={`flex items-center gap-2.5 px-3 py-2 text-xs cursor-pointer rounded-lg transition-colors ${
                      isSelected ? 'bg-petrol-50 font-bold text-petrol-900' : 'text-petrol-700 hover:bg-[#f8fcfb]'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      readOnly
                      className="accent-[#143340] rounded cursor-pointer"
                    />
                    <span>{m.nombre}</span>
                    {m.anio && (
                      <span className="ml-auto text-[0.65rem] text-petrol-600 bg-white border border-petrol-100 px-1.5 py-0.5 rounded">
                        {m.anio}
                      </span>
                    )}
                  </label>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}