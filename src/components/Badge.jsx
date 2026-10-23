// Propiedades:
// - children: Texto (ej: "Lunes").
// - variant: 'novedades', 'evento', 'academico', 'success', 'neutral', o 'dark'.
// - dot: true/false para mostrar el circulito.
// - pill: true/false para bordes completamente redondeados (como los días de cursada).

export default function Badge({ children, variant = 'novedades', dot = false, pill = false }) {
  
  const variants = {
    // Usamos las variables del tema para las variantes institucionales
    novedades: { container: 'bg-petrol-50 text-petrol-700', dot: 'bg-petrol-600' },
    evento: { container: 'bg-indigo-50 text-indigo-900', dot: 'bg-indigo-500' },
    academico: { container: 'bg-orange-50 text-orange-800', dot: 'bg-orange-600' },
    success: { container: 'bg-petrol-50 text-emerald-800', dot: 'bg-emerald-600' },
    neutral: { container: 'bg-petrol-50 text-petrol-600', dot: 'bg-mint-400' },
    dark: { container: 'bg-petrol-900 text-mint-400', dot: 'bg-mint-300' }
  };

  const current = variants[variant] || variants.neutral;
  
  // Clases dinámicas de redondeo y padding según si es "pill"
  const shapeClasses = pill ? 'rounded-full px-3 py-1.5' : 'rounded-md px-2.5 py-1';

  return (
    <span className={`inline-flex items-center gap-1.5 whitespace-nowrap text-[0.65rem] font-bold uppercase tracking-wide ${shapeClasses} ${current.container}`}>
      {dot && (
        <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${current.dot}`} />
      )}
      {children}
    </span>
  );
}