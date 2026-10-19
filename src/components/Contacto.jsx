import React, { useState } from "react";
import Input from "./Input";
import Button from "./Button";


export default function Contacto(){
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        asunto: '',
        mensaje: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Datos enviados:', formData);
        //  luego integrar el envío al backend
    };
    
    return (
        <section id="contacto" className="bg-petrol-50 pt-3 pb-14 px-6 md:px-12 font-sans">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                {/* Columna Izquierda: Información */}
                <div className="lg:col-span-5 flex flex-col items-start text-left gap-4 pt-4">
                    <span className="text-petrol-600 font-bold text-xs uppercase tracking-widest">
                        Contacto directo
                    </span>
                    <h2 className="font-display text-petrol-900 text-[1.6rem] leading-[1.1]">
                        Escribir a Bedelía
                    </h2>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        Envía tu consulta directamente al equipo de Bedelía. Te responderemos a la brevedad.
                    </p>
                    <div className="flex items-center gap-2 mt-2 text-sm text-petrol-900 font-medium">
                        <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="currentColor" 
                                strokeWidth="2" 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                className="w-4 h-4 text-mint-400 shrink-0"
                                >
                                <rect width="21" height="16" x="2" y="4" rx="2" />
                                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                        </svg>
                        <a href="mailto:bedelia.ifts2@gmail.com" className="text-petrol-900 ">
                                bedelia.ifts2@gmail.com
                        </a>  
                    </div>
                </div>
                {/* Columna Derecha: Tarjeta del Formulario */}
                <div className="lg:col-span-7 w-full max-w-xl mx-auto">
                    <form 
                        onSubmit={handleSubmit} 
                        className="w-full bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-petrol-100/60 flex flex-col gap-4 text-left"
                    >
                        {/* Input Nombre */}
                        <Input 
                            placeholder="Nombre y apellido"
                            value={formData.nombre}
                            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                        />

                        {/* Input Correo */}
                        <Input 
                            type="email"
                            placeholder="Correo electrónico"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                        {/* Select Asunto */}
                        <div className="relative">
                            <select
                                name="asunto"
                                value={formData.asunto}
                                onChange={handleChange}
                                className="w-full rounded-lg border-[1.5px] border-petrol-100 bg-petrol-50 px-3.5 py-2.5 text-sm text-petrol-900/70 outline-none transition-colors duration-200 focus:border-mint-400 appearance-none"
                            >
                                <option value="" disabled selected>Asunto</option>
                                <option value="Inscripción">Certificado de Alumno Regular</option>
                                <option value="Equivalencias">Analítico Parcial</option>
                                <option value="Exámenes">Rendición en Caracter Libre</option>
                                <option value="Consulta General">Equivalencias</option>
                                <option value="Consulta General">Consulta sobre Inscripción</option>
                                <option value="Consulta General">Becas PROGRESAR</option>
                                <option value="Consulta General">Otra consulta</option>
                            </select>
                            {/* Flechita del select */}
                            <div className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-petrol-900/60">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="m6 9 6 6 6-6"/>
                                </svg>
                            </div>
                        </div>

                        {/* Textarea Mensaje */}
                        <textarea
                            name="mensaje"
                            rows={4}
                            placeholder="Tu mensaje"
                            value={formData.mensaje}
                            onChange={handleChange}
                            className="w-full rounded-lg border-[1.5px] border-petrol-100 bg-petrol-50 px-3.5 py-2.5 text-sm text-petrol-900 outline-none transition-colors duration-200 focus:border-mint-400 resize-none"
                        />

                        {/* Botón de envío */}
                        <button
                            type="submit"
                            className="w-full bg-petrol-950 hover:bg-petrol-900 text-mint-400 font-bold py-3 rounded-lg text-sm transition-colors mt-2 cursor-pointer"
                        >
                            Enviar a Bedelía
                        </button>
                    </form>

                </div>
                
            </div>
        </section>
    );
}