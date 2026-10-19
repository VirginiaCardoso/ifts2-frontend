import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import AccesosRapidos from '../components/AccesosRapidos';
import Novedades from '../components/Novedades';
import PlantelDocente from '../components/PlantelDocente';
import Tramites from '../components/Tramites';
import Contacto from '../components/Contacto';
import Footer from '../components/Footer';

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
        

        {/* Plantel docente */}
        <PlantelDocente />
        <Tramites />
        <Contacto />
      </main>
      <Footer/>
    </div>
  );
}