import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from './Table';
import { CorrelatividaesIcon1 } from '../assets/icons';

export default function CorrelatividadesSection() {
  const correlativasData = [
    {
      cursar: 'Elaboraciones a base de vegetales, cereales y huevos',
      requiere: 'Introducción a la Gastronomía, Seguridad e higiene en la Gastronomía y Taller de primeros auxilios en curso.'
    },
    {
      cursar: 'Elaboraciones a base de carnes',
      requiere: 'Elaboraciones a base de vegetales, cereales y huevos (aprobada).'
    },
    {
      cursar: 'Elaboración de pizzas y pastas',
      requiere: 'Panadería (cursada o en curso).'
    },
    {
      cursar: 'Repostería',
      requiere: 'Pastelería básica (cursada aprobada).'
    },
    {
      cursar: 'Laboratorio de tecnología de los alimentos',
      requiere: 'Química (cursada aprobada).'
    },
    {
      cursar: 'Elaboraciones de buffet',
      requiere: 'Elaboraciones a base de vegetales, cereales y huevos y Elaboraciones a base de carnes (aprobada).'
    },
    {
      cursar: 'Comercialización',
      requiere: 'Principios de Economía (aprobada) e Introducción a la microempresa (cursada aprobada).'
    },
    {
      cursar: 'Cocina nacional e internacional',
      requiere: 'Elaboraciones a base de vegetales, cereales y huevos y Elaboraciones a base de carnes (cursadas aprobadas).'
    },
    {
      cursar: 'Compras y gestión de stock',
      requiere: 'Elementos de Administración y Contabilidad (cursada aprobada).'
    },
    {
      cursar: 'Organización de eventos gastronómicos',
      requiere: 'Compras y gestión de stock y Servicios de catering (cursada aprobada o en curso).'
    },
    {
      cursar: 'Práctica 1 – Observación organizacional',
      requiere: 'Taller de producción escrita e Introducción a la Gastronomía (cursada aprobada).'
    }
  ];

  return (
    <section id="carrera-correlatividades" className="py-12 md:py-16 px-4 bg-petrol-50 text-petrol-900 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        
        {/* Cabecera de la sección + Botón de Descarga PDF */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <h3 className="font-display text-petrol-900 text-2xl md:text-3xl">
            Correlatividades
          </h3>
          <a
            href="/docs/correlativas.pdf"
            download
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-petrol-900 text-mint-300 hover:bg-petrol-800 text-xs font-bold px-4 py-2.5 rounded-lg transition-colors w-fit"
          >
            <CorrelatividaesIcon1 />
            Descargar PDF
          </a>
        </div>

        {/* Subtítulo aclaratorio */}
        <p className="text-petrol-600 text-xs md:text-sm mb-8 leading-relaxed">
          Tecnicatura Superior en Emprendimientos Gastronómicos — requisitos de cursada previos para cada materia.
        </p>

        {/* Tabla reutilizando el componente Table.jsx */}
        <Table>
          <Thead>
            <Tr>
              <Th className="w-[45%]">Para cursar</Th>
              <Th>Requiere tener</Th>
            </Tr>
          </Thead>
          <Tbody>
            {correlativasData.map((item, index) => (
              <Tr key={index}>
                <Td className="font-bold text-petrol-900">
                  {item.cursar}
                </Td>
                <Td className="text-gray-600 text-xs md:text-sm">
                  {item.requiere}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

      </div>
    </section>
  );
}