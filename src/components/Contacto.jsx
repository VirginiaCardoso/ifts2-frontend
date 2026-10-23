import React, { useState } from 'react';
import Input from './Input';
import { contactoService } from '../services/contactoService';

export default function Contacto() {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    asunto: '',
    mensaje: '',
  });

  const [status, setStatus] = useState({
    loading: false,
    error: '',
    success: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setStatus({ loading: true, error: '', success: false });

    try {
      await contactoService.enviarConsulta(formData);

      setStatus({ loading: false, error: '', success: true });
      setFormData({ nombre: '', correo: '', asunto: '', mensaje: '' });

      setTimeout(
        () => setStatus((prev) => ({ ...prev, success: false })),
        5000
      );
    } catch (error) {
      setStatus({ loading: false, error: error.message, success: false });
    }
  };

  return (
    <section
      id="contacto"
      className="bg-petrol-50 pt-3 pb-14 px-6 md:px-12 font-sans"
    >
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
            Envía tu consulta directamente al equipo de Bedelía. Te
            responderemos a la brevedad.
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
            <a
              href="mailto:bedelia.ifts2@gmail.com"
              className="text-petrol-900"
            >
              bedelia.ifts2@gmail.com
            </a>
          </div>
        </div>

        {/* Columna Derecha: Tarjeta del Formulario */}
        <div className="lg:col-span-7 w-full max-w-xl mx-auto">
          <form
            onSubmit={handleSubmit}
            className="w-full bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-petrol-100/60 flex flex-col gap-4 text-left relative"
          >
            {/* Mensajes de feedback (Error y Éxito) */}
            {status.error && (
              <div className="p-3 bg-red-50 text-red-600 border border-red-200 rounded-lg text-sm">
                {status.error}
              </div>
            )}
            {status.success && (
              <div className="p-3 bg-green-50 text-green-700 border border-green-200 rounded-lg text-sm">
                Consulta enviada exitosamente. Nos pondremos en contacto pronto.
              </div>
            )}

            {/* Input Nombre */}
            <Input
              name="nombre"
              placeholder="Nombre y apellido"
              value={formData.nombre}
              onChange={handleChange}
              required
            />

            {/* Input Correo */}
            <Input
              name="correo"
              type="email"
              placeholder="Correo electrónico"
              value={formData.correo}
              onChange={handleChange}
              required
            />

            <div className="relative">
              <select
                name="asunto"
                value={formData.asunto}
                onChange={handleChange}
                required
                className="w-full rounded-lg border-[1.5px] border-petrol-100 bg-petrol-50 px-3.5 py-2.5 text-sm text-petrol-900/70 outline-none transition-colors duration-200 focus:border-mint-400 appearance-none"
              >
                <option value="" disabled>
                  Asunto
                </option>
                <option value="Certificado de alumno regular">
                  Certificado de alumno regular
                </option>
                <option value="Analítico parcial">Analítico parcial</option>
                <option value="Rendición en carácter Libre">
                  Rendición en carácter Libre
                </option>
                <option value="Equivalencias">Equivalencias</option>
                <option value="Consulta sobre inscripción 2027">
                  Consulta sobre inscripción 2027
                </option>
                <option value="Becas PROGRESAR">Becas PROGRESAR</option>
                <option value="Otro">Otro</option>
              </select>
              {/* Flechita del select */}
              <div className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-petrol-900/60">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m6 9 6 6 6-6" />
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
              required
              className="w-full rounded-lg border-[1.5px] border-petrol-100 bg-petrol-50 px-3.5 py-2.5 text-sm text-petrol-900 outline-none transition-colors duration-200 focus:border-mint-400 resize-none"
            />

            {/* Botón de envío */}
            <button
              type="submit"
              disabled={status.loading}
              className="w-full bg-[#173844] text-[#a4ebd8] font-bold py-3.5 px-4 rounded-lg hover:bg-[#112a33] transition-colors flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {status.loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-5 w-5 text-[#a4ebd8]"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Enviando...
                </>
              ) : (
                'Enviar a Bedelía'
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
