import React from 'react';
import Button from './Button';

export default function AdminNovedades({ totalNews = 3, onOpenForm }) {
  return (
    <div className="w-full">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display text-petrol-900 text-3xl md:text-4xl leading-tight">
            Novedades institucionales
          </h1>
          <p className="text-petrol-600 text-sm font-medium mt-1">
            {totalNews} {totalNews === 1 ? 'noticia publicada' : 'noticias publicadas'}
          </p>
        </div>

        <Button
          variant="primary"
          onClick={onOpenForm}
          className="!rounded-lg"
        >
          <svg 
            className="w-3.5 h-3.5 shrink-0" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Cargar nueva noticia
        </Button>
      </div>
    </div>
  );
}