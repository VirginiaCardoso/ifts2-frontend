import BaseCard from './BaseCard';
import Badge from './Badge';

// Imagen institucional de respaldo por defecto
const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1577219492769-b63a779fac28?w=600&h=400&fit=crop&auto=format';

export default function Card({ tag = 'Novedades', 
  date = '', 
  title = '', 
  excerpt = '', 
  img = ''}) {

  const getBadgeVariant = (tagName = '') => {

    const lowerTag = (tagName|| '').toLowerCase();
    if (lowerTag === 'evento') return 'primary';
    if (lowerTag === 'acad') return 'warning';
    return 'mint';
  };

  return (
    <BaseCard 
      variant="default" 
      // Forzamos 0 padding en el contenedor y aseguramos que la imagen no desborde las esquinas
      className="!p-0 overflow-hidden flex flex-col h-full hover:-translate-y-1.5 hover:shadow-xl group"
    >
      {/* Contenedor imagen */}
      <div className="h-48 w-full bg-petrol-200 shrink-0">
        <img 
          src={img || DEFAULT_IMAGE} 
          alt={title || 'Novedad IFTS N° 2'} 
          onError={(e) => {
            // Si la URL falla al cargar (error 404 o link caído), coloca la de respaldo
            e.currentTarget.onerror = null;
            e.currentTarget.src = DEFAULT_IMAGE;
          }}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
        />
      </div>
      
      {/* Contenedor de la info, dejamos padding del baseCArd */}
      <div className="p-5 pb-6 flex flex-col flex-grow">
        
        <div className="flex items-center gap-2 mb-3">
          <Badge variant={getBadgeVariant(tag)}>
            {tag}
          </Badge>
          <span className="text-petrol-600 text-xs">
            {date}
          </span>
        </div>
        
        <h3 className="font-display text-petrol-900 text-lg leading-tight mb-2">
          {title}
        </h3>
        
        <p className="text-petrol-700 text-sm leading-relaxed opacity-90">
          {excerpt}
        </p>
        
      </div>
    </BaseCard>
  );
}