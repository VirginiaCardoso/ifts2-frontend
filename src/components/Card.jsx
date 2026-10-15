import React from 'react';
import BaseCard from './BaseCard';
import Badge from './Badge';

export default function Card({ tag, date, title, excerpt, img }) {
  const getBadgeVariant = (tagName) => {
    const lowerTag = tagName.toLowerCase();
    if (lowerTag === 'evento') return 'evento';
    if (lowerTag === 'académico') return 'academico';
    return 'novedades';
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
          src={img} 
          alt={title} 
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