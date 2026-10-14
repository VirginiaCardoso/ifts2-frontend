import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Ensamblamos la barra superior y la portada */}
      <Navbar onLoginClick={() => alert('Próximamente: Login del CMS')} />
      <main>
        <HeroSection />
        {/* Aquí luego agregaremos las Cards de Novedades, Trámites, etc. */}
      </main>
    </div>
  );
}