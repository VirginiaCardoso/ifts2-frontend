import React, { useState } from 'react';
import Button from './components/Button';
import Input from './components/Input';
import Card from './components/Card';

function App() {
  // Estado temporal solo para ver cómo funciona el input
  const [email, setEmail] = useState('');

  return (
    <div className="min-h-screen bg-[#f0f4f3] flex flex-col items-center justify-center p-8">
      
      <h1 className="text-4xl text-[#143340] mb-8 font-bold text-center">
        Pruebas componentes
      </h1>

      <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-[#C2F2E9] flex flex-col gap-8 w-full max-w-md">
        
        {/* ZONA DE BOTONES */}
        <div>
          <p className="text-[#518C8C] text-xs font-bold tracking-widest uppercase mb-4">Botones Base</p>
          <div className="flex flex-col gap-4">
            <Button variant="primary">Conocé la carrera</Button>
            <Button variant="secondary">Preinscripción 2027 →</Button>
          </div>
        </div>

        <hr className="border-[#f0f4f3]" />

        {/* ZONA DE INPUTS */}
        <div>
          <p className="text-[#518C8C] text-xs font-bold tracking-widest uppercase mb-4">Inputs de Formulario</p>
          
          {/* Input normal */}
          <Input 
            label="Correo electrónico" 
            type="email"
            placeholder="Ej: alumno@ifts2.edu.ar"
            required={true}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Input con error simulado (Ideal para tus pruebas de QA) */}
          <Input 
            label="Contraseña" 
            type="password"
            placeholder="Mínimo 8 caracteres"
            required={true}
            error="La contraseña debe tener al menos 8 caracteres."
          />
        </div>

        {/* ZONA DE CARDS */}
        <div className="mt-8">
          <p className="text-[#518C8C] text-xs font-bold tracking-widest uppercase mb-4">Tarjetas de Novedades</p>
          
          <Card 
            tag="Novedades"
            date="10 sep 2026"
            title="Inscripciones abiertas para el ciclo lectivo 2027"
            excerpt="El período de preinscripción para la Tecnicatura Superior en Emprendimientos Gastronómicos ya está disponible. Completá el formulario en línea."
            img="https://images.unsplash.com/photo-1577219492769-b63a779fac28?w=600&h=400&fit=crop&auto=format"
          />
        </div>

      </div>
    </div>
  );
}

export default App;