# IFTS N.º 2 — Frontend

Aplicación web institucional del Instituto de Formación Técnica Superior N.º 2. Incluye el sitio público, formularios de contacto, acceso al panel administrativo y gestión de novedades y plantel.

Este repositorio contiene únicamente el frontend. Para que las funciones que consultan o modifican datos estén disponibles, también debe ejecutarse el backend compatible con la API que se describe más abajo.

## Requisitos

- Node.js 20.19 o superior, o 22.12 o superior.
- npm.
- Backend de IFTS2 ejecutándose y accesible desde el navegador.

## Instalación y configuración

Cloná el repositorio e instalá sus dependencias:

```bash
git clone https://github.com/VirginiaCardoso/ifts2-frontend.git
cd ifts2-frontend
npm install
```

Creá un archivo `.env.local` en la raíz del proyecto:

```dotenv
VITE_API_URL=http://localhost:3000
```

`VITE_API_URL` es el origen del backend, sin `/api` al final ni barra final. Si el backend utiliza otro host o puerto, actualizá el valor. El archivo `.env.local` está excluido de Git; no guardes credenciales ni secretos en variables `VITE_*`, ya que Vite las incorpora al código del navegador.

El backend debe permitir solicitudes desde el origen del frontend (CORS). En desarrollo, Vite suele iniciar en `http://localhost:5173`.

## Comandos

```bash
npm run dev      # Inicia el servidor de desarrollo de Vite
npm run lint     # Ejecuta ESLint en el proyecto
npm run build    # Genera la versión optimizada en dist/
npm run preview  # Previsualiza localmente el último build
```

Con el backend disponible, ejecutá `npm run dev` y abrí la URL que indique Vite (por defecto `http://localhost:5173`). Las variables de entorno se leen al iniciar Vite; reiniciá el servidor si modificás `.env.local`.

Para probar una versión de producción:

```bash
npm run build
npm run preview
```

El contenido de `dist/` es estático y puede publicarse en un hosting compatible. Configurá el hosting para servir `index.html` al solicitar rutas de la aplicación, como `/admin` o `/demo`, porque el enrutamiento se realiza en el cliente.

## Arquitectura

```text
src/
├── App.jsx                    # Router: rutas públicas, demo y administración protegida
├── main.jsx                   # Punto de entrada de React
├── index.css                  # Tailwind, tipografías y tema institucional
├── assets/
│   └── icons/                 # Componentes SVG reutilizables
├── components/
│   ├── adminGestionAcademica/ # Mesas de examen y horarios de cursada
│   ├── adminNovedades/        # Formularios, métricas, tabla y lógica de novedades
│   ├── adminPlantel/          # Autoridades, gestión, formularios y tablas de plantel
│   └── *.jsx                  # Componentes de página, secciones y UI compartida
├── hooks/                     # Estado y lógica reutilizable de formularios y datos
├── pages/                     # Composición de páginas (Home, AdminPanel y Demo)
├── services/                  # Comunicación HTTP con el backend
└── utils/                     # Funciones compartidas, incluido el reconocimiento de roles
```

### Responsabilidades

- **`pages/`** compone pantallas y conecta navegación o acciones de alto nivel.
- **`components/`** contiene la interfaz reutilizable. Las carpetas `adminGestionAcademica/`, `adminNovedades/` y `adminPlantel/` agrupan componentes y lógica propios de cada funcionalidad.
- **`hooks/`** encapsula estado, carga de datos y comportamiento de formularios para mantener la vista enfocada en la presentación.
- **`services/`** contiene las llamadas a la API, incluidos autenticación, contacto, novedades, docentes, mesas de examen y horarios.
- **`utils/`** reúne funciones compartidas como la normalización del rol y el manejo de errores de autorización.
- **`assets/icons/`** centraliza los íconos SVG y **`index.css`** configura Tailwind CSS v4, colores y tipografías del sitio.

## Rutas de la aplicación

| Ruta | Uso | Acceso |
| --- | --- | --- |
| `/` | Sitio institucional y formulario de contacto | Público |
| `/demo` | Página de muestra de componentes de interfaz | Público |
| `/admin` | Gestión de novedades y plantel, y opciones de administración | Requiere sesión |

La ruta `/admin` verifica que exista `ifts2_token` en el almacenamiento local del navegador. Al iniciar sesión, la aplicación guarda el token y los datos del usuario con las claves `ifts2_token` e `ifts2_user`. Esta comprobación del frontend mejora la navegación, pero no reemplaza la autenticación ni autorización que el backend debe aplicar en cada endpoint protegido.

### Roles y permisos del panel

El panel utiliza `nivel_de_acceso` (y los campos de rol disponibles en los datos de sesión) para identificar el rol **Gestión académica**, sin distinguir mayúsculas ni acentos. Para ese rol, la opción **Configuración** aparece deshabilitada y el acceso a esa sección también se bloquea desde la navegación del panel.

La autorización efectiva corresponde siempre al backend. Si una operación administrativa devuelve un error `401` o `403`, o un mensaje que indique falta de autorización o permisos, el frontend muestra un modal de acceso no autorizado con el estilo del modal de eliminación. Los errores que no sean de autorización conservan su tratamiento habitual.

## Integración con el backend

El frontend utiliza `VITE_API_URL` como origen y espera que el backend exponga, bajo `/api`, endpoints para:

- Autenticación: `POST /auth/login` y `PUT /auth/cambiar-password`.
- Contacto: `POST /contacto`.
- Novedades: `GET /novedades`, además de operaciones de creación, actualización y eliminación. La consulta administrativa envía `?admin=true`.
- Plantel: `GET /autoridades`, `GET /profesores`, `GET /materias` y `GET /bedeles`; también se utilizan operaciones de creación, actualización y eliminación para las entidades administrables.
- Gestión académica: `/mesas-examenes` y `/horarios-cursada`, con operaciones de consulta, creación, actualización y eliminación.

Las operaciones administrativas envían el token guardado en `ifts2_token` como `Authorization: Bearer <token>`. El backend debe validar ese token y aplicar la autorización correspondiente. Las respuestas de error de la API deberían incluir una propiedad `error` cuando sea posible para mostrar mensajes útiles en la interfaz.

## Tecnologías

- React 19 y React DOM.
- React Router para navegación del lado del cliente.
- Vite 8 para desarrollo y compilación.
- Tailwind CSS 4 para estilos.
- ESLint para análisis estático.

## Solución de problemas

- **No se cargan novedades, contacto o plantel:** confirmá que el backend esté activo, que `VITE_API_URL` apunte al origen correcto y que CORS permita el origen de Vite.
- **La administración redirige al inicio:** iniciá sesión nuevamente; la aplicación requiere el token guardado en el navegador.
- **Cambiaste la URL de API y no se refleja:** reiniciá `npm run dev` y comprobá que `.env.local` esté en la raíz del frontend.
- **Después de desplegar, `/admin` o `/demo` devuelve 404 al recargar:** configurá el servidor estático para redirigir las rutas desconocidas a `index.html`.
