import React from 'react';

// El componente Card acepta las siguientes props para llenarse de información dinámica:
// - tag: La categoría de la noticia (ej: "Novedades", "Evento", "Académico").
// - date: La fecha de publicación.
// - title: El título principal de la tarjeta.
// - excerpt: Un breve resumen o texto descriptivo.
// - img: La URL de la imagen de portada.

export default function Card({ tag, date, title, excerpt, img }) {
  return (
    <article 
      style={{ 
        backgroundColor: '#ffffff', 
        border: '1.5px solid #e6f2ee', 
        borderRadius: '14px', 
        overflow: 'hidden', 
        transition: 'transform 0.22s, box-shadow 0.22s' 
      }} 
      // Clases de Tailwind para el efecto "hover" (levantarse sutilmente)
      className="hover:-translate-y-1.5 hover:shadow-xl"
    >
      {/* Contenedor de la Imagen */}
      <div style={{ height: 196, overflow: 'hidden', backgroundColor: '#c2f2e9' }}>
        <img 
          src={img} 
          alt={title} 
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
        />
      </div>
      
      {/* Contenedor de la Información (Textos) */}
      <div style={{ padding: '1.25rem 1.5rem 1.5rem' }}>
        
        {/* Fila superior: Etiqueta y Fecha */}
        <div className="flex items-center gap-2 mb-3">
          <span 
            style={{ 
              backgroundColor: '#C2F2E9', 
              color: '#235459', 
              fontSize: '0.62rem', 
              fontWeight: 700, 
              letterSpacing: '0.1em', 
              textTransform: 'uppercase', 
              padding: '0.2rem 0.6rem', 
              borderRadius: '4px' 
            }}
          >
            {tag}
          </span>
          <span style={{ color: '#9db8b3', fontSize: '0.72rem' }}>
            {date}
          </span>
        </div>
        
        {/* Título de la noticia */}
        <h3 
          style={{ 
            fontFamily: 'var(--font-display)', 
            color: '#143340', 
            fontSize: '1.15rem', 
            lineHeight: 1.3, 
            marginBottom: '0.6rem' 
          }}
        >
          {title}
        </h3>
        
        {/* Resumen / Bajada */}
        <p style={{ color: '#4a6e6a', fontSize: '0.84rem', lineHeight: 1.65 }}>
          {excerpt}
        </p>
        
      </div>
    </article>
  );
}