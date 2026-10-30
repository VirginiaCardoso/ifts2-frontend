import React, { useState } from 'react';
import { useIngresantes } from './adminIngresantes/useAdminIngresantes';
import BaseCard from './BaseCard';
import Button from './Button';
import { AdminNovedadesIcon3 } from '../assets/icons';

import { EditIcon, FooterIcon2, IngresantesIcon1, UploadIcon } from '../assets/icons';

export default function Ingresantes() {
    
    const {
        etapas,
        documentoActual,
        loading,
        archivoSeleccionado,
        handleFileChange,
        handleSubirPdf,
        handleEditarEtapa,
        formatearFecha,
        editandoId,
        setEditandoId,
        formEditado,
        setFormEditado,
        handleGuardarEdicion,
        handleEliminarEtapa,
    } = useIngresantes();

    return (
        <div className="w-full space-y-8 pb-10">
            {/* Cabecera */}
            <div>
                <h1 className="font-display text-petrol-900 text-3xl md:text-4xl leading-tight">
                    Ingresantes y Fechas Importantes
                </h1>
                <p className="text-petrol-600 text-sm font-medium mt-1">
                    Gestioná las etapas del proceso de admisión y el documento de descarga para aspirantes.
                </p>
            </div>

            {/* SECCIÓN 1: Tarjetas de Etapas */}
            <div>
                <p className="text-[0.68rem] font-bold text-petrol-600 uppercase tracking-wider mb-3">
                    Etapas del Proceso de Admisión
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {etapas.map((etapa, index) => (
                        <BaseCard key={etapa.id_etapa} padding="sm" className="border-petrol-100 shadow-2xs">
                            {editandoId === etapa.id_etapa ? (
                                /* MODO EDICIÓN */
                                <div>
                                    <div className="-mx-4 -mt-4 p-3.5 px-4 bg-petrol-900 text-white flex items-center justify-between">
                                        <div className="flex items-center gap-3 w-full">
                                            <span className="w-5 h-5 rounded-lg bg-petrol-800 text-mint-800 flex items-center justify-center text-[0.7rem] font-bold">
                                                {index + 1}
                                            </span>
                                            {/* Input para editar el nombre */}
                                            <input 
                                                type="text"
                                                value={formEditado.nombre}
                                                onChange={(e) => setFormEditado({...formEditado, nombre: e.target.value})}
                                                className="bg-petrol-800 text-white text-xs px-2 py-1 rounded w-full border border-petrol-700 outline-none"
                                            />
                                        </div>
                                    </div>
                                    {/* Campos de texto / Inputs del cuerpo */}
                                    <div className="pt-3.5 space-y-3">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            <div>
                                                <label className="text-[0.65rem] font-bold text-petrol-600 uppercase tracking-wider block mb-1">
                                                    Fecha de inicio
                                                </label>
                                                <input 
                                                    type="date"
                                                    value={formEditado.fecha_inicio}
                                                    onChange={(e) => setFormEditado({...formEditado, fecha_inicio: e.target.value})}
                                                    className="w-full text-xs border border-petrol-200 rounded-lg p-2 outline-none"
                                                    placeholder="Ej: Noviembre 2026"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-[0.65rem] font-bold text-petrol-600 uppercase tracking-wider block mb-1">
                                                    Fecha de Fin
                                                </label>
                                                <input 
                                                    type="date"
                                                    value={formEditado.fecha_fin}
                                                    onChange={(e) => setFormEditado({...formEditado, fecha_fin: e.target.value})}
                                                    className="w-full text-xs border border-petrol-200 rounded-lg p-2 outline-none"
                                                    placeholder="Ej: Enero 2027"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-[0.65rem] font-bold text-petrol-600 uppercase tracking-wider block mb-1">
                                                Descripción / Requisitos
                                            </label>
                                            <textarea 
                                                value={formEditado.descripcion}
                                                onChange={(e) => setFormEditado({...formEditado, descripcion: e.target.value})}
                                                className="w-full text-xs border border-petrol-200 rounded-lg p-2 outline-none resize-none"
                                                rows="3"
                                            />
                                        </div>

                                        {/* Botones Cancelar y Guardar */}
                                        <div className="flex items-center justify-end gap-2 pt-2">
                                            <button 
                                                onClick={() => setEditandoId(null)} // Cancela y vuelve al modo normal
                                                className="px-4 py-1.5 text-xs font-semibold text-petrol-900 bg-white border border-petrol-200 rounded-xl hover:bg-gray-50 cursor-pointer"
                                            >
                                                Cancelar
                                            </button>
                                            <button 
                                                onClick={() => handleGuardarEdicion(etapa.id_etapa)} // Función para guardar en backend
                                                className="px-4 py-1.5 text-xs font-semibold text-white bg-petrol-900 rounded-xl hover:bg-petrol-800 cursor-pointer"
                                            >
                                                Guardar
                                            </button>
                                        </div>
                                    </div>
                                  
                                </div>

                            ) : (
                                <div>
                                    <div className="-mx-4 -mt-4 p-3.5 px-4 bg-petrol-900 text-white flex items-center justify-between">
                                        <div className="flex gap-3">
                                            <span className="w-5 h-5 rounded-lg bg-petrol-800 text-mint-800 flex items-center justify-center text-[0.7rem] font-bold">
                                                {index + 1}
                                            </span>
                                            <h3 className="font-bold text-xs tracking-wider">
                                                {etapa.nombre}
                                            </h3>
                                        </div>
                                        <div className='flex gap-2'>
                                            <Button 
                                                title='Editar etapa'
                                                variant='outline'
                                                onClick={() => handleEditarEtapa(etapa.id_etapa)}
                                                className="text-mint-600 bg-petrol-700 rounded-xl w-8 h-8 cursor-pointer p-1.5"
                                            >
                                                <span className="w-4 h-4 flex items-center justify-center">
                                                    <EditIcon />
                                                </span>
                                            </Button>
                                            <Button
                                                title='Eliminar etapa'
                                                variant='danger'
                                                onClick={() => handleEliminarEtapa(etapa.id_etapa)}
                                                className=" rounded-xl w-8 h-8 !py-0.5 !px-0.5 cursor-pointer"
                                            >
                                            
                                                <span className="w-3.5 h-3.5 [&>svg]:w-full [&>svg]:h-full">
                                                    <AdminNovedadesIcon3 />
                                                </span> 
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="pt-3.5 space-y-2">
                                        <div className="flex items-center gap-1.5 text-xs font-semibold text-petrol-900">
                                            <FooterIcon2 className="w-3.5 h-3.5" />
                                            <span>{formatearFecha(etapa.fecha_inicio)}</span>
                                            <span>- {formatearFecha(etapa.fecha_fin)}</span>
                                        </div>
                                        <p className="text-xs text-petrol-500 leading-relaxed">
                                            {etapa.descripcion}
                                        </p>
                                        <p className="text-xs text-petrol-500 leading-relaxed">
                                            {etapa.requisitos}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </BaseCard>
                    ))}
                </div>
            </div>

            {/* SECCIÓN 2: Información para Aspirantes (Gestión del PDF) */}
            <div className="space-y-4">
                <BaseCard padding="lg" className="border-petrol-100 shadow-2xs">
                    <h3 className="text-[0.68rem] text-petrol-600 font-bold bg-petrol-50/50 uppercase tracking-widest mb-3">
                        Información para aspirantes
                    </h3>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                        
                        {/* Zona de carga (Dropzone / Input file) */}
                        <label className="border-2 border-dashed border-gray-200 rounded-2xl p-8 flex flex-col items-center justify-center text-center bg-petrol-50/50 hover:bg-petrol-50/40 transition-colors cursor-pointer">
                            <input 
                                type="file" 
                                accept="application/pdf" 
                                className="hidden" 
                                onChange={handleFileChange} 
                            />
                            <div className="w-12 h-12 rounded-xl bg-petrol-50 border border-petrol-100 flex items-center justify-center text-petrol-700 mb-3 shadow-2xs">
                                <UploadIcon className="w-5 h-5" />
                            </div>
                            <p className="font-bold text-xs text-petrol-900">
                                {archivoSeleccionado ? archivoSeleccionado.name : "Arrastrá el PDF aquí"}
                            </p>
                            <p className="text-[0.7rem] text-gray-400 mt-1">
                                o hacé clic para seleccionar desde tu computadora
                            </p>
                            <span className="text-[0.65rem] text-gray-400 mt-3 font-medium">
                                Formato aceptado: PDF • Tamaño máximo: 10 MB
                            </span>
                        </label>

                        {/* Archivo actual y botón de actualización */}
                        <div className="space-y-4">
                            <div className="bg-white border border-petrol-100 rounded-xl p-4 shadow-2xs space-y-1">
                                <span className="text-[0.65rem] font-bold text-petrol-600 uppercase tracking-wider">
                                    Archivo actual
                                </span>
                                <div className="flex items-center gap-2 text-xs font-bold text-petrol-900 pt-1">
                                    <IngresantesIcon1 className="w-4 h-4 text-mint-400" />
                                    <span>
                                        {loading ? 'Cargando...' : (documentoActual?.nombre || 'ingresantes.pdf')}
                                    </span>
                                </div>
                                <p className="text-[0.7rem] text-gray-400">
                                    Visible públicamente como enlace de descarga en la sección Ingresantes del sitio.
                                </p>
                            </div>

                            <Button
                                variant="primary"
                                onClick={handleSubirPdf}
                                disabled={!archivoSeleccionado}
                                className="w-full bg-mint-400 text-petrol-900 disabled:opacity-50 disabled:cursor-not-allowed font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer "
                            >
                                <UploadIcon className="w-4 h-4 " />
                                Actualizar PDF de Ingresantes
                            </Button>
                        </div>

                    </div>
                </BaseCard>
            </div>
        </div>
    );
}
