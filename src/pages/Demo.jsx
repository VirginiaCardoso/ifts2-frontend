import React, { useState } from 'react';
import LogoIFTS2 from '../components/LogoIFTS2';
import Button from '../components/Button';
import Input from '../components/Input';
import Card from '../components/Card';
import ProfileCard from '../components/ProfileCard';
import Alert from '../components/Alert';
import Badge from '../components/Badge';
import BaseCard from '../components/BaseCard';
import { Table, Thead, Tbody, Tr, Th, Td } from '../components/Table';
import Tabs from '../components/Tabs';
import Toggle from '../components/Toggle';

export default function Demo() {
  const [email, setEmail] = useState('');
  const [activeTab, setActiveTab] = useState('materias');
  const [isPromo, setIsPromo] = useState(true);

  return (
    <div className="min-h-screen bg-white p-8 md:p-12 font-sans flex flex-col items-center text-center">
      
      <h1 className="text-3xl font-bold text-[#143340] mb-2">Ejemplos componentes</h1>
      
      {/* Logo */}
      <section className="mb-14 flex flex-col items-center">
        <h2 className="text-lg font-bold text-[#518C8C] mb-6">LogoIFTS2.jsx</h2>
        <div className="bg-[#143340] p-6 rounded-xl inline-block">
          <LogoIFTS2 size={48} />
        </div>
      </section>

      {/* Botones */}
      <section className="mb-14 flex flex-col items-center">
        <h2 className="text-lg font-bold text-[#518C8C] mb-6">Button.jsx</h2>
        
        <div className="flex flex-col gap-6">
          {/* Botones Principales */}
          <div className="flex flex-wrap gap-4 justify-center">
            <Button variant="primary">Botón Primario</Button>
            <Button variant="secondary">Botón Secundario</Button>
          </div>

          {/* Botones de Acción para Tablas  */}
          <div className="flex flex-wrap gap-4 justify-center bg-gray-50 p-4 rounded-xl border border-gray-100">
            
            {/* Botón Editar (Outline) con ícono SVG */}
            <Button variant="outline">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
              Editar
            </Button>

            {/* Botón Eliminar (Danger) con ícono SVG */}
            <Button variant="danger">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                <line x1="10" y1="11" x2="10" y2="17" />
                <line x1="14" y1="11" x2="14" y2="17" />
              </svg>
              Eliminar
            </Button>
            
          </div>
        </div>
      </section>

      {/* Inputs */}
      <section className="mb-14 flex flex-col items-center w-full max-w-xs">
        <h2 className="text-lg font-bold text-[#518C8C] mb-6">Input.jsx</h2>
        <div className="w-full text-left flex flex-col gap-2">
          
          <Input 
            label="Correo" 
            placeholder="ejemplo@correo.com" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
          
          {/* Password */}
          <Input 
            label="Contraseña" 
            type="password"
            placeholder="Ingresá tu contraseña" 
            required={true}
          />

          {/* Con Error */}
          <Input 
            label="Confirmar contraseña" 
            type="password"
            placeholder="Repetí la contraseña" 
            required={true}
            error="Las contraseñas no coinciden."
          />
          
        </div>
      </section>

      {/* BaseCard */}
      <section className="mb-14 flex flex-col items-center w-full max-w-4xl">
        <h2 className="text-lg font-bold text-[#518C8C] mb-6">BaseCard.jsx</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full text-left">
          
          {/* Default */}
          <BaseCard variant="default">
            <h3 className="text-[#143340] font-bold text-sm uppercase tracking-wide mb-2">Variante Default</h3>
            <p className="text-gray-500 text-sm">Fondo blanco, borde sutil y sombra suave. Ideal para organizar métricas o listas.</p>
          </BaseCard>

          {/* Outlined */}
          <BaseCard variant="outlined">
            <h3 className="text-[#143340] font-bold text-sm uppercase tracking-wide mb-2">Variante Outlined</h3>
            <p className="text-gray-500 text-sm">Fondo transparente, solo borde. Útil para anidar información dentro de otro bloque.</p>
          </BaseCard>

          {/* Elevated */}
          <BaseCard variant="elevated">
            <h3 className="text-[#143340] font-bold text-sm uppercase tracking-wide mb-2">Variante Elevated</h3>
            <p className="text-gray-500 text-sm">Sin borde, con sombra más fuerte y efecto hover. Perfecta para destacar llamadas a la acción.</p>
          </BaseCard>

          <BaseCard variant="dark">
            <h3 className="text-white  text-sm uppercase tracking-wide mb-2">Variante Dark</h3>
            <p className="text-gray-500 text-sm">Sin borde, con sombra más fuerte y efecto hover. Fondo oscuro</p>
          </BaseCard>

        </div>
      </section>

      {/* Tarjetas de Perfil */}
      <section className="mb-14 flex flex-col items-center w-full max-w-sm">
        <h2 className="text-lg font-bold text-[#518C8C] mb-6">ProfileCard.jsx</h2>
        <div className="w-full flex flex-col gap-4 text-left">
          <ProfileCard variant="dark" title="Prof. Alicia Ruidiaz" subtitle="CARGO ADM" />
          <ProfileCard variant="light" title="Prof. Miguel Colloca" subtitle="Nombre materia" />
        </div>
      </section>

      {/* Tarjetas de Noticias */}
      <section className="mb-14 flex flex-col items-center w-full max-w-sm">
        <h2 className="text-lg font-bold text-[#518C8C] mb-6">Card.jsx</h2>
        <div className="w-full text-left">
          <Card 
            tag="Aviso"
            date="14 octubre 2026"
            title="Ejemplo de noticia"
            excerpt="Texto de prueba para ver cómo se acomoda la tarjeta en el diseño."
            img="....."
          />
        </div>
      </section>

      {/* Alertas */}
      <section className="mb-14 flex flex-col items-center w-full max-w-3xl">
        <h2 className="text-lg font-bold text-[#518C8C] mb-6">Alert.jsx</h2>
        <div className="w-full text-left flex flex-col gap-4">
          
          <Alert variant="info">
            Una materia es <strong>promocional</strong> cuando se estipula que si se cumplen determinados requisitos no se deberá rendir examen final; una vez concluida la cursada se dará por aprobada la materia en su totalidad.
          </Alert>
          
          <Alert variant="warning">
            Las inscripciones para el próximo cuatrimestre cierran el viernes.
          </Alert>

          <Alert variant="error">
            Hubo un problema al cargar los datos. Por favor, intentá nuevamente.
          </Alert>

        </div>
      </section>

      {/* Etiquetas / Badges */}
      <section className="mb-14 flex flex-col items-center w-full max-w-md">
        <h2 className="text-lg font-bold text-[#518C8C] mb-6">Badge.jsx</h2>
        
        <div className="w-full text-left flex flex-col gap-6">
          
          {/* Categorías */}
          <div>
            <p className="text-xs text-gray-400 mb-2 uppercase tracking-wide">Categorías y Estados</p>
            <div className="flex flex-wrap gap-3">
              <Badge variant="novedades">Novedades</Badge>
              <Badge variant="evento">Evento</Badge>
              <Badge variant="academico">Académico</Badge>
              <Badge variant="success" dot={true}>Publicado</Badge>
              <Badge variant="neutral">Seguridad e Higiene</Badge>
            </div>
          </div>

          {/* Días */}
          <div>
            <p className="text-xs text-gray-400 mb-2 uppercase tracking-wide">Días de Cursada (propiedad pill=true)</p>
            <div className="flex flex-wrap gap-3">
              <Badge variant="dark" pill={true}>Lunes</Badge>
              <Badge variant="dark" pill={true}>Martes</Badge>
              {/* Le podemos poner la variante neutral a algún día para imitar ese "Miércoles" más clarito que se ve en la imagen si querés */}
              <Badge variant="neutral" pill={true}>Miércoles</Badge>
              <Badge variant="dark" pill={true}>Jueves</Badge>
              <Badge variant="dark" pill={true}>Viernes</Badge>
            </div>
          </div>

        </div>
      </section>

      
      {/* Tablas */}
      <section className="mb-14 flex flex-col items-center w-full max-w-4xl">
        <h2 className="text-lg font-bold text-[#518C8C] mb-6">Table.jsx</h2>
        
        <div className="w-full">
          <Table>
            
            <Thead>
              <Tr>
                <Th>Para cursar</Th>
                <Th>Requiere tener</Th>
                <Th align="center">Acciones</Th>
              </Tr>
            </Thead>
            
            <Tbody>
              <Tr>
                <Td className="font-bold">Elaboraciones a base de vegetales, cereales y huevos</Td>
                <Td>Introducción a la Gastronomía, Seguridad e higiene en la Gastronomía y Taller de primeros auxilios en curso.</Td>
                <Td align="center">
                  <div className="flex gap-2 justify-center">
                    <Button variant="outline">Editar</Button>
                  </div>
                </Td>
              </Tr>
              
              <Tr>
                <Td className="font-bold">Elaboraciones a base de carnes</Td>
                <Td>Elaboraciones a base de vegetales, cereales y huevos (aprobada).</Td>
                <Td align="center">
                  <div className="flex gap-2 justify-center">
                    <Button variant="outline">Editar</Button>
                  </div>
                </Td>
              </Tr>

              {/* Ejemplo de una fila especial que ocupa varias columnas (como los recreos) */}
              <Tr isSpecial={true}>
                <Td colSpan={3} align="center" className="text-[#b37636] font-bold tracking-widest text-[0.75rem]">
                  MANTENIMIENTO
                </Td>
              </Tr>
            </Tbody>
            
          </Table>
        </div>

        {/* Filas de colores */}
          <div className="mt-10">
            <h3 className="text-[#143340] font-bold text-sm uppercase tracking-wide mb-3">
              Filas intercaladas
            </h3>
            
            <Table variant="zebra">
              <Thead>
                <Tr>
                  <Th>Nombre del Docente</Th>
                  <Th>Cargo / Rol</Th>
                  <Th align="right">Último Acceso</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td className="font-bold">Prof. Alicia E. Ruidiaz</Td>
                  <Td>Rectora</Td>
                  <Td align="right" className="text-gray-500">Hoy, 09:15 hs</Td>
                </Tr>
                <Tr>
                  <Td className="font-bold">Lic. Leonardo Bermudez</Td>
                  <Td>Secretario Académico</Td>
                  <Td align="right" className="text-gray-500">Ayer, 14:20 hs</Td>
                </Tr>
                <Tr>
                  <Td className="font-bold">Prof. Pedro Perez</Td>
                  <Td>Jefatura T.P.</Td>
                  <Td align="right" className="text-gray-500">Ayer, 11:05 hs</Td>
                </Tr>
                <Tr>
                  <Td className="font-bold">Prof. Axel Trebino</Td>
                  <Td>Tutor</Td>
                  <Td align="right" className="text-gray-500">Hace 3 días</Td>
                </Tr>
              </Tbody>
            </Table>
          </div>
      </section>

      <section className="mb-14 flex flex-col items-center w-full max-w-4xl">
        <h2 className="text-lg font-bold text-[#518C8C] mb-6">Tabs.jsx y Toggle.jsx</h2>
        
        <div className="w-full text-left bg-gray-50 p-6 rounded-xl border border-gray-100 flex flex-col gap-8">
          
            {/* Pestañas */}
            <div>
              <p className="text-xs text-gray-400 mb-2 uppercase tracking-wide">Pestañas de Navegación</p>
              <Tabs 
                activeTab={activeTab} 
                onChange={setActiveTab}
                tabs={[
                  { id: 'materias', label: 'Listado de Materias' },
                  { id: 'correlativas', label: 'Correlatividades' }
                ]} 
              />
              {/* Contenido*/}
              <div className="bg-white border border-t-0 border-[#dceee9] p-4 rounded-b-xl text-sm text-gray-500">
                {activeTab === 'materias' ? 'Estás viendo el listado de materias por año.' : 'Estás gestionando las reglas de correlatividad.'}
              </div>
            </div>
          </div>

          {/* Switch*/}
          <div>
            <div className="flex gap-6 items-center bg-white p-4 border border-[#dceee9] rounded-xl">
              <Toggle 
                checked={isPromo} 
                onChange={setIsPromo} 
                label="= Promocional" 
              />
              
              {/* Otro ejemplo apagado */}
              <Toggle 
                checked={false} 
                onChange={() => {}} 
                label="Materia regular" 
              />
            </div>
          </div>

        
      </section>

      {/* Paleta de Colores */}
     <section className="mb-14 flex flex-col items-center w-full max-w-4xl">
        <h2 className="text-lg font-bold text-[#518C8C] mb-2">Paleta colores: index.css</h2>
                
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full text-left">
          
          {/* Petrol 950 */}
          <div className="p-4 rounded-xl bg-petrol-950 text-white text-xs flex flex-col justify-between h-24 shadow-sm">
            <span className="font-bold">Petrol 950</span>
            <code className="text-[10px] opacity-80 bg-black/20 p-1 rounded">bg-petrol-950</code>
          </div>
          
          {/* Petrol 900 */}
          <div className="p-4 rounded-xl bg-petrol-900 text-white text-xs flex flex-col justify-between h-24 shadow-sm">
            <span className="font-bold">Petrol 900</span>
            <code className="text-[10px] opacity-80 bg-black/20 p-1 rounded">bg-petrol-900</code>
          </div>
          
          {/* Petrol 800 */}
          <div className="p-4 rounded-xl bg-petrol-800 text-white text-xs flex flex-col justify-between h-24 shadow-sm">
            <span className="font-bold">Petrol 800</span>
            <code className="text-[10px] opacity-80 bg-black/20 p-1 rounded">bg-petrol-800</code>
          </div>
          
          {/* Petrol 700 */}
          <div className="p-4 rounded-xl bg-petrol-700 text-white text-xs flex flex-col justify-between h-24 shadow-sm">
            <span className="font-bold">Petrol 700</span>
            <code className="text-[10px] opacity-80 bg-black/20 p-1 rounded">bg-petrol-700</code>
          </div>
          
          {/* Petrol 600 */}
          <div className="p-4 rounded-xl bg-petrol-600 text-white text-xs flex flex-col justify-between h-24 shadow-sm">
            <span className="font-bold">Petrol 600</span>
            <code className="text-[10px] opacity-80 bg-black/20 p-1 rounded">bg-petrol-600</code>
          </div>

          {/* Petrol 100 */}
          <div className="p-4 rounded-xl bg-petrol-50 text-petrol-900 text-xs flex flex-col justify-between h-24 border border-petrol-100 shadow-sm">
            <span className="font-bold">Petrol 50 / 100</span>
            <code className="text-[10px] opacity-80 bg-petrol-100/60 p-1 rounded text-petrol-900">bg-petrol-50 / border-petrol-100</code>
          </div>

          {/* Mint 300 */}
          <div className="p-4 rounded-xl bg-mint-300 text-petrol-900 text-xs flex flex-col justify-between h-24 shadow-sm">
            <span className="font-bold">Mint 300</span>
            <code className="text-[10px] opacity-80 bg-black/10 p-1 rounded">bg-mint-300</code>
          </div>
          
          {/* Mint 400 */}
          <div className="p-4 rounded-xl bg-mint-400 text-petrol-900 text-xs flex flex-col justify-between h-24 shadow-sm">
            <span className="font-bold">Mint 400</span>
            <code className="text-[10px] opacity-80 bg-black/10 p-1 rounded">bg-mint-400</code>
          </div>
          
        </div>
      </section>


    </div>
  );
}