import React from 'react';
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
import CorrelatividadesSection from '../components/Correlatividaes';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
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

        <PlanEstudiosSection />
        <PromocionablesSection />
        <CorrelatividadesSection />

        <Tramites />
        <Contacto />
      </main>
      <Footer/>
    </div>
  );
}