import CarreraProvider from '../components/CarreraProvider';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import AccesosRapidos from '../components/AccesosRapidos';
import Novedades from '../components/Novedades';
import CarreraSection from '../components/CarreraSection';
import PlantelDocente from '../components/PlantelDocente';
import Tramites from '../components/Tramites';
import Contacto from '../components/Contacto';
import Footer from '../components/Footer';
import PlanEstudiosSection from '../components/PlanEstudiosSection';
import PromocionablesSection from '../components/PromocionablesSection';
import CorrelatividadesSection from '../components/Correlatividades';
import MesaExamenSection from '../components/MesaExamenSection';
import IngresantesSection from '../components/IngresantesSection';
import HorariosMateriasSection from '../components/HorariosMateriasSection';
import LoginModal from '../components/LoginModal';

export default function Home() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    // Tras autenticar con éxito en el backend, navegamos al panel
    navigate('/admin');
  };
  return (
    <CarreraProvider><div className="min-h-screen flex flex-col">
      {/* Barra */}
      <Navbar />
      <main>
        {/* Portada ppal */}
        <HeroSection />
        {/* Accesos Rapdidos */}
        <AccesosRapidos />
        {/* Novedades */}
        <Novedades />
        {/* Info Carrera */}
        <CarreraSection />
        {/* Plantel docente */}
        <PlantelDocente />
        {/* Plan */}
        <PlanEstudiosSection />
        {/* Materias promocionables */}
        <PromocionablesSection />
        {/* Correlatividades */}
        <CorrelatividadesSection />
        {/* Mesas finales */}
        <MesaExamenSection />
        {/* Fechas importantes ingresantes */}
        <IngresantesSection />
        {/* Horarios */}
        <HorariosMateriasSection/>
        {/* Tramites */}
        <Tramites />
        {/* Contacto bedelia */}
        <Contacto />
      </main>
      <Footer onLoginClick={() => setIsLoginOpen(true)} />
            {/* Modal de Login flotante */}
            <LoginModal
              isOpen={isLoginOpen}
              onClose={() => setIsLoginOpen(false)}
              onLoginSuccess={handleLoginSuccess}
            />
    </div></CarreraProvider>
  );
}