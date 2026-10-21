import React from "react";
import MesaExamenCard from "./MesaExamenCard";

const MESAS_DATA = [
  { turno: 'Marzo', anio: '2027', fechas: '3 y 17 de marzo', horario: '18:30 hs', tribunal: ["Prof. Francisco Giménez", "Prof. Iris Leyte"] },
  { turno: 'Julio', anio: '2027', fechas: '7 de julio', horario: '18:30 hs', tribunal: ["Prof. Evangelina Aguilar Corcuera", "Prof. Miguel Colloca"]},
  { turno: 'Agosto', anio: '2027', fechas: '11 de agosto', horario: '18:30 hs', tribunal: ["Prof. Camila Sabalsagaray Montera", "Prof. Axel Trebino"]},
  { turno: 'Diciembre', anio: '2027', fechas: '1 y 15 de diciembre', horario: '18:30 hs', tribunal: ["Prof. Diego Pulitta", "Prof. Grisel de Landeta", "Prof. Walter Albarracin"] },
];

export default function MesaExamenSection(){
    return(
        <section id="mesa-examen" className="pt-3 pb-14 px-6 md:px-12 bg-petrol-50 text-petrol-900 font-sans w-full">
            <div className="max-w-7xl mx-auto"> 
                <div className="flex-col">
                    {/* Cabecera de la sección */} 
                    <h2 className="max-w-7xl mx-auto font-display text-petrol-900 text-[1.6rem] leading-[1.1]">
                                Mesas de exámenes finales
                    </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mt-8 w-full">
                        {MESAS_DATA.map((mesa, index) => (
                            <MesaExamenCard 
                                key={index}
                                turno={mesa.turno}
                                fechas={mesa.fechas}
                                anio={mesa.anio}
                                horario={mesa.horario}
                                tribunal={mesa.tribunal}
                            />
                        ))}
                </div>
                <p className="text-xs text-gray-500 mt-6">
                    * Para rendir exámenes finales debés inscribirte previamente en el sistema <a href="https://guarani-gestionagencia.bue.edu.ar/" target="_blank" rel="noreferrer" className="text-gray-500 font-bold ">SIU Guaraní</a>. Las fechas pueden estar sujetas a cambios — consultá Bedelía para confirmación.
                </p>
            </div>  
                
        </section>
    );
}