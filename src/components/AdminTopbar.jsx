import React from 'react';
import Button from './Button';

export default function AdminTopbar({ title, subtitle }) {
  return (
    <header className="sticky top-0 z-10 h-16 bg-white border-b border-petrol-100 px-8 flex items-center justify-between">
      <div>
        <p className="text-sm font-bold text-petrol-900 leading-none tracking-tight">
          {title}
        </p>
        {subtitle && (
          <p className="text-xs text-petrol-600 font-normal mt-1">
            {subtitle}
          </p>
        )}
      </div>

      <Button
        variant="outline"
        onClick={() => window.open('/', '_blank')}
        className="!border-petrol-100 !text-petrol-600 hover:!text-petrol-900 hover:!border-mint-400 hover:!bg-petrol-50 !py-1.5 !px-3 !text-xs !rounded-lg"
      >
        <svg 
          className="w-3.5 h-3.5" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
        Ver sitio
      </Button>
    </header>
  );
}