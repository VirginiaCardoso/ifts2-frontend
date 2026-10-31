export default function ActionErrorModal({ message, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#051218]/80 backdrop-blur-xs"
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="action-error-title"
        className="bg-white border border-petrol-100 rounded-2xl p-6 max-w-sm w-full text-center space-y-4 shadow-xl"
      >
        <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 mx-auto flex items-center justify-center text-xl font-bold">
          !
        </div>
        <div>
          <h3 id="action-error-title" className="font-bold text-base text-petrol-900">
            No se pudo completar la acción
          </h3>
          <p className="text-xs text-petrol-600 mt-1">{message}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="w-full rounded-lg border border-petrol-100 px-4 py-2 text-sm font-bold text-petrol-600 hover:bg-gray-50"
        >
          Entendido
        </button>
      </div>
    </div>
  );
}
