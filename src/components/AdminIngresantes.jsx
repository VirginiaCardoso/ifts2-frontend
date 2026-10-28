import React from 'react';
import { useIngresantes } from './adminIngresantes/useAdminIngresantes';
import BaseCard from './BaseCard';
import Button from './Button';

import { EditIcon, FooterIcon2, IngresantesIcon1, UploadIcon } from '../assets/icons';

export default function Ingresantes() {
    const {
        etapas,
        documentoActual,
        loading,
        archivoSeleccionado,
        handleFileChange,
        handleSubirPdf,
        handleEditarEtapa
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
                        <BaseCard key={etapa.id} padding="sm" className="border-petrol-100 shadow-2xs">
                            <div className="-mx-4 -mt-4 p-3.5 px-4 bg-petrol-900 text-white flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <span className="w-5 h-5 rounded-lg bg-petrol-800 text-mint-800 flex items-center justify-center text-[0.7rem] font-bold">
                                        {index + 1}
                                    </span>
                                    <h3 className="font-bold text-xs tracking-wider">
                                        {etapa.nombre}
                                    </h3>
                                </div>
                                <button 
                                    onClick={() => handleEditarEtapa(etapa.id)}
                                    className="text-mint-500 bg-petrol-800 rounded-xl cursor-pointer p-1.5"
                                >
                                    <EditIcon className="w-3.5 h-3.5 " />
                                </button>
                            </div>

                            <div className="pt-3.5 space-y-2">
                                <div className="flex items-center gap-1.5 text-xs font-semibold text-petrol-900">
                                    <FooterIcon2 className="w-3.5 h-3.5" />
                                    <span>{etapa.fecha_inicio}</span>
                                </div>
                                <p className="text-xs text-petrol-500 leading-relaxed">
                                    {etapa.descripcion}
                                </p>
                            </div>
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
