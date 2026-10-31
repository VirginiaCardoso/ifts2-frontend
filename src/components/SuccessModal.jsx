import Button from './Button';

export default function SuccessModal({ title, message, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#051218]/80 backdrop-blur-xs"
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="success-modal-title"
        className="bg-white border border-petrol-100 rounded-2xl p-6 max-w-sm w-full text-center space-y-4 shadow-xl"
      >
        <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
          <svg
            aria-hidden="true"
            className="w-6 h-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m5 12 4 4L19 6" />
          </svg>
        </div>
        <div>
          <h3 id="success-modal-title" className="font-bold text-base text-petrol-900">
            {title}
          </h3>
          <p className="text-xs text-petrol-600 mt-1">{message}</p>
        </div>
        <div className="pt-2">
          <Button
            type="button"
            variant="primary"
            onClick={onClose}
            className="w-full"
          >
            Aceptar
          </Button>
        </div>
      </div>
    </div>
  );
}
