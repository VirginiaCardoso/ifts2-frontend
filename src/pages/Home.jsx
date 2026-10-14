import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import AccesosRapidos from '../components/AccesosRapidos';

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
      </main>
    </div>
  );
}