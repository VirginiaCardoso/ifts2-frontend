import BaseCard from './BaseCard';
import { ProfileCardIcon1 } from '../assets/icons';

// Este componente recibe:
// - title: El nombre de la persona (Ej: "Prof. Miguel Colloca")
// - subtitle: El cargo o las materias (Ej: "Elementos de Química")
// - variant: 'dark' (fondo azul para Autoridades) o 'light' (fondo blanco para Docentes)

export default function ProfileCard({ title, subtitle, variant = 'light' }) {
  
  if (variant === 'dark') {
    return (
      // Usamos la nueva variante 'dark' que agregamos al BaseCard
      <BaseCard variant="dark" padding="sm" className="flex flex-col gap-1">
        <p className="text-mint-400 text-[0.65rem] font-bold tracking-[0.1em] uppercase">
          {subtitle}
        </p>
        <p className="text-white text-base font-semibold">
          {title}
        </p>
      </BaseCard>
    );
  }

  return (
    <BaseCard variant="default" padding="sm" className="flex items-start gap-4 hover:border-mint-400 hover:shadow-sm transition-all duration-200">
      
      {/* Ícono de Usuario (ahora con variables de Tailwind) */}
      <div className="bg-petrol-200 rounded-lg w-10 h-10 flex items-center justify-center shrink-0">
        <ProfileCardIcon1 />
      </div>

      {/* Textos */}
      <div>
        <p className="text-petrol-900 text-[0.95rem] font-bold mb-1">
          {title}
        </p>
        <p className="text-petrol-600 text-sm leading-relaxed">
          {subtitle}
        </p>
      </div>
      
    </BaseCard>
  );
}