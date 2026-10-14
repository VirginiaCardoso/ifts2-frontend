import React from 'react';
import Button from './Button';

export default function HeroSection() {
  return (
    <section id="inicio" className="relative overflow-hidden" style={{ minHeight: 'clamp(500px, 78vh, 720px)' }}>
      {/* Imagen de fondo con overlay oscuro */}
      <img
        src="https://images.unsplash.com/photo-1663530761401-15eefb544889?w=1600&h=900&fit=crop&auto=format"
        alt="Plato de alta gastronomía"
        className="absolute inset-0 w-full h-full object-cover object-center"
        style={{ objectPosition: 'center 40%' }}
      />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(110deg, rgba(20,51,64,0.86) 0%, rgba(20,51,64,0.62) 52%, rgba(20,51,64,0.22) 100%)' }} />

      {/* Contenido principal */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center" style={{ paddingTop: '5rem', paddingBottom: '6rem', minHeight: 'inherit' }}>
        <div className="max-w-2xl">
          <h1 style={{ fontFamily: 'var(--font-display)', color: '#ffffff', fontSize: 'clamp(2rem, 5.5vw, 3.6rem)', lineHeight: 1.12, marginBottom: '1.25rem' }}>
            No formamos chefs,<br />
            <em style={{ color: '#8BD9CA' }}>formamos empresarios</em><br />
            gastronómicos.
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: '1rem', lineHeight: 1.72, maxWidth: '480px', marginBottom: '2.25rem' }}>
            Tecnicatura Superior en Emprendimientos Gastronómicos.
          </p>
          
          {/* Aquí usamos nuestro componente Button reutilizable */}
          <div className="flex flex-wrap gap-3">
            <Button variant="primary" onClick={() => document.getElementById('carrera')?.scrollIntoView({ behavior: 'smooth' })}>
              Conocé la carrera
            </Button>
            <Button variant="secondary" onClick={() => window.open('https://guarani-gestionagencia.bue.edu.ar/')}>
              Preinscripción 2027 →
            </Button>
          </div>
        </div>
      </div>

      {/* Barra inferior de estadísticas */}
      <div className="absolute bottom-0 left-0 right-0" style={{ backgroundColor: 'rgba(13,34,41,0.88)', backdropFilter: 'blur(8px)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-3">
          {[
            { num: '+18', label: 'Años formando emprendedores' },
            { num: '3', label: 'Años de cursada presencial' },
            { num: '100%', label: 'Gratuita · Título Oficial' },
          ].map((stat, i) => (
            <div key={i} className="text-center py-4 px-2" style={{ borderRight: i < 2 ? '1px solid rgba(255,255,255,0.10)' : 'none' }}>
              <p style={{ fontFamily: 'var(--font-display)', color: '#8BD9CA', fontSize: 'clamp(1.4rem, 3vw, 2rem)', lineHeight: 1 }}>{stat.num}</p>
              <p style={{ color: 'rgba(255,255,255,0.48)', fontSize: '0.68rem', marginTop: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}