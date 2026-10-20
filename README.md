# IFTS N°2 Frontend

### ¿Cómo instalar el proyecto?

#### Desde la terminal:

- Clonar el proyecto:
````
git clone https://github.com/VirginiaCardoso/ifts2-frontend.git

````

- Ingresar al directorio del proyecto: 
````
cd ifts2-frontend
````

- Para instalar las dependencias correr: 
````
npm install
````

### Configurar las variables de entorno

Creá un archivo .env en la raíz del proyecto basándote en el archivo .env.example, configurando la URL de conexión a la API del backend:
````
VITE_API_URL=http://localhost:3000
````
Nota: Asegurate de que el puerto coincida con el puerto configurado en el servidor del backend (PORT=3000).

### Levantar el entorno de desarrollo:

Asegurate de tener el backend corriendo en otra terminal para que la API responda a las peticiones del sitio. Luego ejecutá:
````
npm run dev
````
La aplicación quedará disponible en el navegador (por defecto en http://localhost:5173).

### Compilar para producción (Build):
Para generar los archivos estáticos optimizados para despliegue:
````
npm run build
````

Para previsualizar localmente la versión de producción generada:
````
npm run preview
````

