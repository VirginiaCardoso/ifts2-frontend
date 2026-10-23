import { AccesosRapidosIcon1, AccesosRapidosIcon2, AccesosRapidosIcon3, AccesosRapidosIcon4 } from '../assets/icons';

// Iconos SVG
const IconGraduation = (props) => <AccesosRapidosIcon1 {...props} />;
const IconScreen = (props) => <AccesosRapidosIcon2 {...props} />;
const IconScholarship = (props) => <AccesosRapidosIcon3 {...props} />;
const IconClipboard = (props) => <AccesosRapidosIcon4 {...props} />;

// Info accesos rapidos
const ACCESOS_RAP = [
  {
    Icon: IconGraduation,
    title: 'SIU Guaraní · Alumnos',
    desc: 'Gestión académica y reinscripción',
    href: 'https://guarani-gestionagencia.bue.edu.ar/',
    external: true,
  },
  {
    Icon: IconScreen,
    title: 'Aulas Virtuales / Moodle',
    desc: 'Agencia de Habilidades para el Futuro',
    href: 'https://aulasvirtuales.bue.edu.ar/',
    external: true,
  },
  {
    Icon: IconScholarship,
    title: 'Becas PROGRESAR',
    desc: 'Becas educativas del Gobierno Nacional',
    href: 'https://www.anses.gob.ar/educacion/progresar',
    external: true,
  },
  {
    Icon: IconClipboard,
    title: 'Bedelía',
    desc: 'Certificados y trámites académicos',
    href: '#contacto',
    external: false,
  },
];

export default function AccesosRapidos() {
  return (
    <section style={{ backgroundColor: '#f4faf8', borderBottom: '1px solid #dceee9' }} className="py-10 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Título de la sección */}
        <p style={{ textAlign: 'center', color: '#518C8C', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
          Accesos rápidos
        </p>
        
        {/* Grilla de tarjetas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {ACCESOS_RAP.map(item => (
            <a
              key={item.title}
              href={item.href}
              target={item.external ? '_blank' : undefined}
              rel={item.external ? 'noreferrer' : undefined}
              style={{ 
                backgroundColor: '#ffffff', 
                border: '1.5px solid #dceee9', 
                borderRadius: '12px', 
                padding: '1.1rem 1rem', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.85rem', 
                transition: 'all 0.2s', 
                textDecoration: 'none' 
              }}
              // Efectos hover
              className="hover:border-[#8BD9CA] hover:shadow-md hover:-translate-y-0.5 group"
            >
              {/* Contenedor del Ícono */}
              <span style={{ flexShrink: 0, width: 36, height: 36, backgroundColor: '#C2F2E9', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <item.Icon style={{ width: 20, height: 20, color: '#143340' }} />
              </span>
              
              {/* Textos */}
              <div>
                <p style={{ color: '#143340', fontWeight: 700, fontSize: '0.83rem', lineHeight: 1.25 }}>
                  {item.title} 
                  {/* flecha si es enlace externo */}
                  {item.external && <span className="inline-block ml-1 opacity-50 group-hover:text-[#518C8C] transition-colors" style={{ fontSize: '0.65rem' }}>↗</span>}
                </p>
                <p style={{ color: '#518C8C', fontSize: '0.68rem', marginTop: '0.2rem', lineHeight: 1.3 }}>
                  {item.desc}
                </p>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}