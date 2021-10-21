# Documentacion API GUB 🧑🏻‍💻
## Descripcion 📃:
_API REST que proporciona diferentes servicios a partir de nesecidades propuestas en el reto de senasoft_

## Inicializar API 🤯:
Esta API REST esta basada en TypeScript para el tipado estricto y paquetes npm para el proyecto node.

 * Paquetes NPM:
    * express
    * jsonwebtoken
    * express-validators
    * cors
    * dotenv
    * mongoose

 * Implementaciones externas:
    * CLI Apolo-13 -> Nos sirvio para la creacion de proyecto (express), y creacion de archivos para el control del framework de express:
    _Instalacion npm: ```https://www.npmjs.com/package/apolo-13```_

 * Al clonar o descargar el proyecto:
    * npm install || npm i

 * Para iniciar la carpeta de distribucion o despliegue del proyecto a javascript:
    * tsc -w

 * Para iniciar el servidor de express:
    * modo de desarrollo: npm run dev
    * modo de produccion: npm start (Extraer los archivos de la carpeta dist y iniciar el proyecto como servidor compilado en JS)

## Estructura de carpetas 📂:
_Una estructura de carpetas simple y entendible para un entorno backend en una API REST_
```
    |_package.json
    |_tsconfig.json
    |_.gitignore
    |_.env
    |_src
        |__controller
            |__Archivos de controladores
        |__database
            |__Archivo de configuracion DB
        |__environment
            |__Archivo para el control de las variables de entorno
        |__helpers
            |__Archivos para ayudas (helper)
        |__interfaces
            |__Archivos de posibles interfaces de carga o posteo
        |__middlewares
            |__Archivos para diferrentes validadores (middleware)
        |__models
            |__Archivos para Schemas de mongoDb
        |__router
            |__Archivos de las diferentes rutas para el control de los endpoints
        |__service
            |__Archivos para los servicios reutilizables
        |__environment
            |__Archivo que almacenara las variables de entorno .env en variables estaticas dentro de JS
```
## Configuracion de rutas 📡:
Todas las rutas estan definidas segun el schema a utilizar despues del |/api|.

* URL desarrollo: 
   ```http://localhost:{{port}}/soft/v1/api```

* URL producccion:
   ```https://sena-nexus-back.herokuapp.com/soft/v1/api```

* Rutas actuales:
    * Salas: ```URL /sala```
    * Files: ```URL /files```
    * Cards: ```URL /cards```
## Documentacion de la API (Postman):
* https://documenter.getpostman.com/view/17943232/UV5ZDHAD
## Recomendaciones 👀:
* Leer la documentacion interna de cada archivo para entender el proceso de la API
* Revisar siempre las respuestas del servidor
* Revisar las dependencias del package.json
* Revisar las configuraciones del tsconfig.json
---
Nicolas Duarte 🎉
```
 ▐ ▄ ▄ •▄     
•█▌▐██▌▄▌▪    
▐█▐▐▌▐▀▀▄·    
██▐█▌▐█.█▌    
▀▀ █▪·▀  ▀
```
