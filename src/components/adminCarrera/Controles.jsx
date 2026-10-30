import { useEffect, useRef } from 'react';
export const campo =
  'w-full rounded-lg border border-petrol-100 bg-white px-3 py-2.5 text-sm focus:outline-mint-500';
export const boton =
  'rounded-lg bg-petrol-900 text-white px-4 py-2.5 text-sm font-semibold disabled:opacity-50';
export default function SeleccionMultiple({
  label,
  opciones,
  seleccion,
  onChange,
  disabled = false,
}) {
  return (
    <details className="relative">
      <summary
        className={`${campo} cursor-pointer list-none flex justify-between gap-2`}
        aria-label={label}
      >
        {seleccion.length
          ? `${seleccion.length} seleccionado${seleccion.length === 1 ? '' : 's'}`
          : label}
        <span aria-hidden="true">⌄</span>
      </summary>
      <div className="absolute top-full left-0 right-0 z-10 max-h-56 overflow-auto p-2 mt-1 rounded-lg border border-petrol-100 bg-white shadow-xl">
        {opciones.map((o) => (
          <label
            key={o.id}
            className="flex gap-3 items-center px-2 py-2 text-sm"
          >
            <input
              type="checkbox"
              disabled={disabled}
              checked={seleccion.includes(o.id)}
              onChange={() =>
                onChange(
                  seleccion.includes(o.id)
                    ? seleccion.filter((id) => id !== o.id)
                    : [...seleccion, o.id]
                )
              }
            />
            {o.nombre || o.nombre_completo}
          </label>
        ))}
        {!opciones.length && (
          <p className="p-2 text-sm">No hay opciones disponibles.</p>
        )}
      </div>
    </details>
  );
}
export function Dialogo({ titulo, children, onClose, busy, error }) {
  // El foco se coloca en el diálogo y se mantiene dentro mientras está abierto.
  const panel = useRef(null);
  const previo = useRef(document.activeElement);
  useEffect(() => {
    const anterior = previo.current;
    panel.current?.focus();
    return () => {
      if (anterior?.isConnected) anterior.focus();
    };
  }, []);
  function teclado(e) {
    if (e.key === 'Escape' && !busy) onClose();
    if (e.key !== 'Tab') return;
    const controles = [
      ...e.currentTarget.querySelectorAll(
        'button:not(:disabled), input:not(:disabled), select:not(:disabled), summary, a[href], textarea:not(:disabled)'
      ),
    ];
    if (!controles.length) {
      e.preventDefault();
      return;
    }
    const primero = controles[0],
      ultimo = controles.at(-1);
    if (
      e.shiftKey &&
      (document.activeElement === primero ||
        document.activeElement === e.currentTarget)
    ) {
      e.preventDefault();
      ultimo.focus();
    } else if (
      !e.shiftKey &&
      (document.activeElement === ultimo ||
        document.activeElement === e.currentTarget)
    ) {
      e.preventDefault();
      primero.focus();
    }
  }
  return (
    <div className="fixed inset-0 bg-petrol-950/60 z-50 flex items-center justify-center p-4">
      <section
        ref={panel}
        tabIndex={-1}
        onKeyDown={teclado}
        role="dialog"
        aria-modal="true"
        aria-label={titulo}
        className="bg-white rounded-2xl p-6 md:p-9 w-full max-w-xl max-h-[90vh] overflow-auto shadow-xl outline-none"
      >
        <div className="flex justify-between gap-4 mb-5">
          <h3 className="text-2xl text-petrol-900">{titulo}</h3>
          <button
            type="button"
            disabled={busy}
            aria-label="Cerrar"
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        {error && (
          <p
            role="alert"
            className="p-3 mb-4 rounded bg-red-50 text-red-800 text-sm"
          >
            {error}
          </p>
        )}
        {children}
      </section>
    </div>
  );
}
