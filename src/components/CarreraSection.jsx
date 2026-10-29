import Button from './Button';
import { CarreraSectionIcon1, CarreraSectionIcon2, CarreraSectionIcon3 } from '../assets/icons';

export default function CarreraSection() {
  return (
    <section id="institucional" className="py-16 md:py-24 px-4 bg-petrol-900 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Columna Izquierda: Información de la carrera */}
        <div>
          <p className="text-mint-400 text-xs font-bold tracking-[0.14em] uppercase mb-3">
            IFTS N° 2 · Hotelería y Gastronomía
          </p>
          <h2 className="font-display text-[clamp(1.8rem,4vw,2.8rem)] leading-[1.15] mb-5">
  Tecnicatura Superior<br />
  en <span style={{ fontStyle: 'italic' }} className="text-mint-400">Emprendimientos<br />Gastronómicos</span>
</h2>
          <p className="text-white/72 leading-relaxed mb-7 text-sm md:text-base">
            Carrera presencial de 3 años, <strong className="text-mint-300 font-semibold">gratuita</strong>, con título oficial de alcance nacional. Formamos técnicos con capacidad para gestionar, crear y desarrollar proyectos gastronómicos propios y en relación de dependencia.
          </p>

          {/* Grid de Materias / Orientaciones */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8">
            {[
              'Cocina Nacional e Internacional',
              'Repostería y Panadería',
              'Servicios de Catering',
              'Organización de Eventos',
              'Protocolo y Etiqueta',
              'Gestión Contable',
              'Diseño de Emprendimientos',
              'Administración Gastronómica'
            ].map((materia, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-mint-400 flex-shrink-0" />
                <span className="text-white/75 text-xs md:text-sm">{materia}</span>
              </div>
            ))}
          </div>

          {/* Píldoras de Información (Ubicación, Horarios, Título) */}
          <div className="flex flex-wrap gap-2 mb-8">
            {[
              { 
                icon: (
                  <CarreraSectionIcon1 />
                ), 
                label: 'Cañada de Gómez 3850, Villa Lugano' 
              },
              { 
                icon: (
                  <CarreraSectionIcon2 />
                ), 
                label: 'Lun–Vie 18:00–22:00 hs' 
              },
              { 
                icon: (
                  <CarreraSectionIcon3 />
                ), 
                label: 'Título de validez nacional' 
              },
            ].map(({ icon, label }, i) => (
              <span key={i} className="bg-white/8 border border-mint-400/25 text-white/65 text-xs px-3 py-1.5 rounded-full inline-flex items-center gap-1.5">
                {icon}
                {label}
              </span>
            ))}
          </div>

          {/* Botones de acción reutilizando los componentes */}
          <div className="flex flex-wrap gap-3">
            <a 
              href="https://guarani-gestionagencia.bue.edu.ar/" 
              target="_blank" 
              rel="noreferrer"
            >
              <Button variant="primary">Preinscribirme 2027</Button>
            </a>
            <a href="#contacto">
              <Button variant="outline">
                Solicitar info
                </Button>
            </a>
          </div>
        </div>

        {/* Columna Derecha: Imagen Principal + Badge Flotante */}
        <div className="relative mt-8 md:mt-0">
          <div className="rounded-2xl overflow-hidden h-[420px] bg-petrol-700 shadow-xl">
            <img 
              src="https://images.unsplash.com/photo-1681270543584-8e541a1bb056?w=700&h=500&fit=crop&auto=format" 
              alt="Estudiante de gastronomía en práctica" 
              className="w-full h-full object-cover opacity-90"
            />
          </div>

          {/* Badge Flotante "Ciclo 2027" */}
          <div className="absolute bottom-6 left-[-1rem] md:left-[-1.5rem] bg-white rounded-xl p-4 shadow-2xl max-w-[210px] text-petrol-900 border border-black/5">
            <p className="font-display text-2xl leading-none">Ciclo 2027</p>
            <p className="text-petrol-600 text-xs font-bold mt-1">Inscripciones abiertas</p>
            <p className="text-petrol-900/80 text-[0.7rem] mt-1.5 leading-tight">
              Habilitación en Noviembre desde la página del GCBA
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}