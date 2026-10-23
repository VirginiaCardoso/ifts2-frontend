import Card from './Card';
import usePublicNovedades from '../hooks/usePublicNovedades';


export default function Novedades() {
  const { newsList, error } = usePublicNovedades();

  // Función para formatear fechas de MySQL (YYYY-MM-DD) a "10 sep 2026"
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toLocaleDateString('es-AR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <section id="novedades" className="py-16 md:py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        
        {/* Cabecera de la sección */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <p className="text-petrol-600 text-[0.7rem] font-bold tracking-[0.14em] uppercase mb-2">
              Instituto al día
            </p>
            <h2 className="font-display text-petrol-900 text-[clamp(1.8rem,4vw,2.8rem)] leading-[1.1]">
              Novedades institucionales
            </h2>
          </div>
          
          {/* Vínculo a Instagram */}
          <a 
            href="https://www.instagram.com/ifts_2_ok/" 
            target="_blank" 
            rel="noreferrer" 
            className="text-petrol-700 font-semibold text-sm border-b-2 border-mint-400 pb-0.5 whitespace-nowrap transition-colors hover:text-petrol-900"
          >
            Ver más en Novedades →
          </a>
        </div>

        {error && (
          <p role="alert" className="mb-6 text-sm text-red-600">
            {error}
          </p>
        )}

        {/* Grilla de Tarjetas Dinámica y Centrada con Flex */}
        <div className="flex flex-wrap justify-center gap-6">
  {newsList.map((item) => (
    <div 
      key={item.id} 
      className="w-full sm:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-1.5rem)] max-w-[420px]"
    >
      <Card 
        tag={item.etiqueta || item.categoria || 'Novedades'}
        date={formatDate(item.fecha_publicacion || item.fecha)}
        title={item.titulo}
        excerpt={item.descripcion_breve || item.descripcion || item.contenido || ''}
        img={item.imagen_portada_url || item.imagen_url}
      />
    </div>
  ))}
</div>

      </div>
    </section>
  );
}