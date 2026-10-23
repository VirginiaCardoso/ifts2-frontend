import { AlertIcon1 } from '../assets/icons';

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
          <AlertIcon1 />
        </div>
      )}
      
      <div>
        {children}
      </div>
    </div>
  );
}