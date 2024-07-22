# Desafio de React-Next.js


## Descripción general:
El presente proyecto tiene la finalidad de demostrar los temas vistos durante el módulo de react y next.js.
La página pretende ser una reproducción (aunque no exacta) de la página original de DEV (https://dev.to/).
En las cuales se encuentran las páginas de registro de usuario, Log in de usuario, lista de Post, Detalle de Post y creación de Post.
Para la realización de este proyecto se integró la api del desafío anterior de backend: https://github.com/NSOrtiz/DesafioBK_g33.git, el cual almacena la información de los Posts y usuarios.


## Instalación:
Se usó framework de React Next.js para crear el proyecto:
-   **next**: npm create next-app@latest
y se instalaron las siguientes dependencias por default al seleccionar la configuración en la creación del proyecto:
-   **react**
-   **react-dom**
-   **postcss**
-   **tailwindcss**
-   **eslint**
aparte se instalaron las siguientes dependencias:
-   **react-hook-form**: npm install react-hook-form
-   **clsx**: npm install clsx
-   **sonner**: npm install sonner


Se uso tailwind para generar las clases de estilo para el maquetado del proyecto, junto con clsx para el uso de algunas excepciones en las clases de los elementos.


También se implementó react-hook-form para realizar los formularios de log in, creación de usuario y publicación de nuevo post.


Se utilizó sonner para mostrar notificaciones de error.


Para la ejecución local del proyecto se corre en terminal la línea
```
    npm run dev
```
## Descripción de contenido:


El repositorio cuenta con varias carpetas:


-   **Pages**:  contiene las páginas principales.
    * Index.js es la página principal al hacer uso de next.js se , también están login.js, create_post y create_account, las cuales son las páginas con los formularios para ingresar, crear cuenta o crear post.
    * api.js presenta la funciones con los métodos de GET y POST para realizar peticiones a la api: https://desafiobk-g33-2.onrender.com
-   **Post**:  Está dentro de la carpeta pages, contiene el código mostrar la información de la lista de post obtenida de la api.
    -   **[id]**: Se encuentra dentro de la carpeta post, su página de index presenta el código del detalle del post y usuario.
-   **hooks**:  Dentro de esta carpeta esta el codigo para la autentificación para el login
-   **components**Incluye varias secciones de código para desplegar, elementos de las páginas mencionadas anteriormente.


Desplegado de vercel:
https://devto-project-9clsf7rus-nsortizs-projects.vercel.app
