import React, { useState } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import Card from '../components/Card';
import LogoIFTS2 from '../components/LogoIFTS2';

export default function Demo() {
  const [email, setEmail] = useState('');
  
  return (
    <div className="min-h-screen bg-[#f0f4f3] p-8 flex flex-col items-center">
      <h1 className="text-4xl text-[#143340] mb-8 font-bold" style={{ fontFamily: 'var(--font-display)' }}>
        Demo UI - Query Squad
      </h1>
      
      <div className="bg-white p-8 rounded-2xl shadow border-2 border-[#C2F2E9] w-full max-w-xl">
        <p className="text-[#518C8C] text-xs font-bold uppercase mb-4 tracking-widest">
          Probando Componentes
        </p>
        
        {/* Prueba de Botones */}
        <div className="mb-6 flex gap-4">
          <Button variant="primary">Botón Primario</Button>
          <Button variant="secondary">Botón Secundario</Button>
        </div>

        {/* Prueba de Input */}
        <div className="mb-6">
          <Input 
            label="Email de prueba" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            placeholder="ejemplo@ifts2.edu.ar"
          />
        </div>

        {/* Prueba de Card */}
        <div>
          <Card 
            tag="Novedades"
            date="10 sep 2026"
            title="Inscripciones abiertas para el ciclo lectivo 2027"
            excerpt="El período de preinscripción para la Tecnicatura Superior en Emprendimientos Gastronómicos ya está disponible."
            img="https://images.unsplash.com/photo-1577219492769-b63a779fac28?w=600&h=400&fit=crop&auto=format"
          />
        </div>

        {/* Logo*/}
        <div>
          <LogoIFTS2 size={42} className="transition-transform group-hover:scale-105" />
          
        </div>


      </div>
    </div>
  );
}