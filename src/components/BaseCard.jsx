// - children: El contenido que va dentro de la tarjeta (texto, otras tarjetas, íconos, etc.).
// - className: Clases de Tailwind adicionales para personalizar el estilo.
// - variant: 'default' (fondo blanco), 'outlined' (solo borde sutil), o 'elevated' (con sombra).
// - padding: Nivel de padding ('sm', 'md', 'lg').

export default function BaseCard({ 
  children, 
  className = '', 
  variant = 'default',
  padding = 'md' 
}) {

  // Estilos base de la tarjeta
  const baseStyles = "rounded-xl overflow-hidden transition-all duration-200";

  // Variantes de estilo usando las variables de Tailwind (petrol-100 en lugar de #dceee9)
  const variants = {
    default: "bg-white border border-petrol-100 shadow-sm",
    outlined: "bg-transparent border border-petrol-100",
    elevated: "bg-white border border-transparent shadow-md hover:shadow-lg hover:-translate-y-0.5",
    dark: "bg-petrol-900 border-none text-white",
  };

  // Niveles de padding
  const paddings = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  const selectedVariant = variants[variant] || variants.default;
  const selectedPadding = paddings[padding] || paddings.md;

  return (
    <div className={`${baseStyles} ${selectedVariant} ${selectedPadding} ${className}`}>
      {children}
    </div>
  );
}