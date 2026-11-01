import { useEffect, useRef, useId } from 'react';
import Button from './Button';
import { AdminNovedadesIcon3 } from '../assets/icons';

export default function DeleteConfirmationModal({
  submitting = false,
  onCancel,
  onConfirm,
  title = '¿Estás seguro?',
  message = 'Esta acción no se puede deshacer.',
}) {
  const panel = useRef(null);
  const tituloId = useId();
  useEffect(() => {
    const anterior = document.activeElement;
    panel.current?.querySelector('button')?.focus();
    return () => { if (anterior?.isConnected) anterior.focus(); };
  }, []);
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#051218]/80 backdrop-blur-xs"
      role="presentation"
    >
      <div
        ref={panel}
        onKeyDown={(event) => {
          if (event.key === 'Escape' && !submitting) onCancel();
          if (event.key === 'Tab') {
            const botones = [...event.currentTarget.querySelectorAll('button:not(:disabled)')];
            const primero = botones[0], ultimo = botones.at(-1);
            if (!primero) { event.preventDefault(); return; }
            if (event.shiftKey && document.activeElement === primero) { event.preventDefault(); ultimo.focus(); }
            if (!event.shiftKey && document.activeElement === ultimo) { event.preventDefault(); primero.focus(); }
          }
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby={tituloId}
        className="bg-white border border-petrol-100 rounded-2xl p-6 max-w-sm w-full text-center space-y-4 shadow-xl"
      >
        <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 mx-auto flex items-center justify-center">
          <AdminNovedadesIcon3 />
        </div>
        <div>
          <h3 id={tituloId} className="font-bold text-base text-petrol-900">
            {title}
          </h3>
          <p className="text-xs text-petrol-600 mt-1">{message}</p>
        </div>
        <div className="flex gap-2 justify-center pt-2">
          <Button
            type="button"
            variant="outline"
            disabled={submitting}
            onClick={onCancel}
            className="!border-petrol-100 !text-petrol-600 flex-1"
          >
            Cancelar
          </Button>
          <Button
            type="button"
            variant="danger"
            disabled={submitting}
            onClick={onConfirm}
            className="flex-1"
          >
            {submitting ? 'Eliminando...' : 'Eliminar'}
          </Button>
        </div>
      </div>
    </div>
  );
}
