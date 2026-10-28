import { useState, useEffect } from 'react';
import BaseCard from './BaseCard';
import { getTramites } from '../services/tramitesService';
import { getEnlaces } from '../services/enlacesServices';
import {
  TramitesIcon1,
  TramitesIcon2,
  TramitesIcon3,
  TramitesIcon4,
  TramitesIcon5,
  TramitesIcon6,
  TramitesIcon7,
  TramitesIcon8,
  TramitesIcon9,
  TramitesIconModdle,
} from '../assets/icons';

// Íconos SVG
const IconFile = (props) => <TramitesIcon1 {...props} />;
const IconArrow = () => <TramitesIcon2 />;
const IconStar = () => <TramitesIcon3 />;
const IconArrows = () => <TramitesIcon4 />;
const IconCallendar = () => <TramitesIcon5 />;
const IconTickets = () => <TramitesIcon6 />;
const IconHome = (props) => <TramitesIcon7 {...props} />;
const IconScholarship = (props) => <TramitesIcon8 {...props} />;
const IconClipboard = () => <TramitesIcon9 />;


export default function Tramites() {
  const [tramites, setTramites] = useState([]);
  const [enlaces, setEnlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        setLoading(true);
        const [tramitesData, enlacesData] = await Promise.all([
          getTramites(),
          getEnlaces(),
        ]);
        setTramites(tramitesData);
        setEnlaces(enlacesData);
      } catch (error) {
        console.error('Error al cargar los datos:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDatos();
  }, []);

  const getTramiteIcon = (nombre) => {
    const n = nombre.toLowerCase();
    if (n.includes('alumno regular')) return IconFile;
    if (n.includes('analítico')) return IconArrow;
    if (n.includes('asistencia')) return IconStar;
    if (n.includes('equivalencia')) return IconArrows;
    if (n.includes('boleto') || n.includes('sube')) return IconTickets;
    return IconCallendar; // Ícono por defecto
  };

  const getEnlaceMetadata = (nombre) => {
    const n = nombre.toLowerCase();
    if (n.includes('mi argentina'))
      return {
        desc: 'Verificá tu título emitido por GCBA en sistema SITED',
        icon: IconScholarship,
      };
    if (n.includes('progresar'))
      return { desc: 'Becas educativas - ANSES', icon: IconClipboard };
    if (n.includes('guaraní'))
      return {
        desc: 'Sistema académico de gestión universitaria',
        icon: IconHome,
      };
    if (n.includes('moodle') || n.includes('aulas'))
      return {
        desc: 'Plataforma de educación a distancia',
        icon: TramitesIconModdle,
      };
    return { desc: 'Enlace institucional externo', icon: IconHome }; // Por defecto
  };

  return (
    <section
      id="tramites"
      className="bg-petrol-50 py-5 px-6 md:px-12 font-sans w-full min-h-[400px]"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center">
          {/* Cabecera de la sección */}
          <p className="text-petrol-600 text-[0.7rem] font-bold tracking-[0.14em] uppercase mb-2">
            Bedelía • Secretaría Académica
          </p>
          <h2 className="font-display text-petrol-900 text-[clamp(1.8rem,4vw,2.8rem)] leading-[1.1]">
            Trámites y gestiones
          </h2>
          <p className="flex items-center gap-2 mt-2 text-sm text-gray-400 font-small">
            Contacto Bedelía:
            <a
              href="mailto:bedelia.ifts2@gmail.com"
              className="text-petrol-900"
            >
              bedelia.ifts2@gmail.com
            </a>
          </p>
        </div>

        {loading ? (
          <div className="text-center text-petrol-600 py-12">
            Cargando trámites...
          </div>
        ) : (
          <>
            {/* GRILLA DE TRÁMITES CLAROS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 w-full">
              {tramites.map((item) => {
                const Icono = getTramiteIcon(item.nombre_tramite);
                return (
                  <BaseCard
                    variant="default"
                    key={item.id}
                    padding="md"
                    className="h-full flex flex-col items-start gap-3 hover:shadow-lg transition-all duration-200"
                  >
                    <div className="bg-petrol-50 text-petrol-700 rounded-lg w-9 h-9 flex items-center justify-center shrink-0">
                      <Icono className="w-5 h-5" />
                    </div>
                    <p className="text-petrol-700 font-bold text-sm leading-snug">
                      <span>{item.nombre_tramite}</span>
                    </p>
                    {item.descripcion_requisitos && (
                      <p className="text-gray-500 text-[0.8rem] leading-relaxed">
                        {item.descripcion_requisitos}
                      </p>
                    )}
                  </BaseCard>
                );
              })}
            </div>

            {/* GRILLA DE ENLACES OSCUROS */}
            <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-8 w-full">
              {enlaces.map((item) => {
                const { desc, icon: Icono } = getEnlaceMetadata(
                  item.nombre_sistema
                );
                return (
                  <a
                    key={item.id}
                    href={item.url_destino}
                    target="_blank"
                    rel="noreferrer"
                    className="block group no-underline"
                  >
                    <BaseCard
                      variant="dark"
                      padding="sm"
                      className="h-full flex items-center gap-3.5 hover:bg-petrol-800 transition-colors"
                    >
                      <div className="bg-petrol-700 text-[#8BD9CA] rounded-lg w-9 h-9 flex border border-[#8BD9CA] items-center justify-center shrink-0">
                        <Icono className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-mint-300 font-bold text-sm leading-snug flex items-center justify-between gap-1">
                          <span className="truncate">
                            {item.nombre_sistema}
                          </span>
                          <span className="text-mint-400 text-xs font-normal shrink-0">
                            ↗
                          </span>
                        </p>
                        <p className="text-gray-500 text-[0.8rem] mt-0.5 truncate">
                          {desc}
                        </p>
                      </div>
                    </BaseCard>
                  </a>
                );
              })}
            </div>
          </>
        )}

        <div className="mt-9 pt-6 border-t border-mint-400"></div>
      </div>
    </section>
  );
}
