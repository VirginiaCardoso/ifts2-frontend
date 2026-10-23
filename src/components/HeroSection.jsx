import Button from './Button';

export default function HeroSection() {
  return (
    <section id="inicio" className="relative overflow-hidden min-h-[78vh] h-[clamp(500px,78vh,720px)] flex flex-col justify-center">
      {/* Imagen de fondo */}
      <img
        src="https://images.unsplash.com/photo-1663530761401-15eefb544889?w=1600&h=900&fit=crop&auto=format"
        alt="Plato de alta gastronomía"
        className="absolute inset-0 w-full h-full object-cover object-[center_40%]"
      />
      
      {/* Gradiente oscuro superpuesto */}
      <div className="absolute inset-0 bg-gradient-to-r from-[rgba(20,51,64,0.86)] via-[rgba(20,51,64,0.62)] to-[rgba(20,51,64,0.22)]" />

      {/* Contenido principal (centrado verticalmente) */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center py-20">
        <div className="max-w-2xl">
          <h1 className="font-display text-white text-[clamp(2rem,5.5vw,3.6rem)] leading-[1.12] mb-5">
            No formamos chefs,<br />
            <em className="text-mint-400 not-italic">formamos empresarios</em><br />
            gastronómicos.
          </h1>
          <p className="text-white/72 text-base leading-relaxed max-w-[480px] mb-9">
            Tecnicatura Superior en Emprendimientos Gastronómicos.
          </p>
          
          {/* Botones */}
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

      {/* Barra estadísticas */}
      <div className="absolute bottom-0 left-0 right-0 bg-petrol-950/88 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-3">
          {[
            { num: '+18', label: 'Años formando emprendedores' },
            { num: '3', label: 'Años de cursada presencial' },
            { num: '100%', label: 'Gratuita · Título Oficial' },
          ].map((stat, i) => (
            <div 
              key={i} 
              className={`text-center py-4 px-2 ${i < 2 ? 'border-r border-white/10' : ''}`}
            >
              <p className="font-display text-mint-400 text-[clamp(1.4rem,3vw,2rem)] leading-none">
                {stat.num}
              </p>
              <p className="text-white/48 text-[0.68rem] mt-1 uppercase tracking-[0.08em]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}