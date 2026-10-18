import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import AccesosRapidos from '../components/AccesosRapidos';
import Novedades from '../components/Novedades';
import PlantelDocente from '../components/PlantelDocente';
import Contacto from '../components/Contacto';

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
        <Contacto />
      </main>
    </div>
  );
}