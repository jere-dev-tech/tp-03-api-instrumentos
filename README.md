# Trabajo práctico 03

## Descripción

API HTTP desarrollada con Node.js y Express para administrar temporalmente un catálogo de instrumentos musicales.

La aplicación carga los datos iniciales desde un archivo JSON antes de iniciar el servidor y permite:

- mostrar una bienvenida;
- listar todos los instrumentos;
- filtrar instrumentos por familia;
- consultar un instrumento por su identificador;
- crear nuevos instrumentos en memoria.

Los instrumentos creados mediante POST permanecen disponibles solamente mientras el servidor está encendido.

## Instalación

1. Abrir una terminal en la carpeta raíz del proyecto.
2. Instalar las dependencias con:

```bash
npm install
```

## Ejecución

Para iniciar el servidor:

```bash
npm start
```

El servidor se ejecuta en:

```text
http://localhost:3000
```

Para detener el servidor:

```text
Ctrl + C
```

Para comprobar la sintaxis de los archivos JavaScript:

```bash
npm run check
```

## Endpoints

### Bienvenida

**GET /**

Devuelve un mensaje indicando que la API está disponible.

Ejemplo de respuesta:

```json
{
  "mensaje": "Bienvenido. La API de instrumentos musicales está disponible"
}
```

### Listar instrumentos

**GET /api/instrumentos**

Devuelve todos los instrumentos del catálogo.

### Filtrar instrumentos por familia

**GET /api/instrumentos?familia=cuerda**

Permite filtrar instrumentos según su familia.

La comparación no distingue entre mayúsculas y minúsculas.

Si no existen coincidencias, devuelve un arreglo vacío:

```json
[]
```

### Obtener un instrumento por ID

**GET /api/instrumentos/:id**

Busca un instrumento mediante su identificador.

Ejemplo:

```text
GET /api/instrumentos/1
```

Si el instrumento existe, devuelve sus datos.

Si no existe, responde con un error:

```json
{
  "error": "Instrumento no encontrado"
}
```

### Crear un instrumento

**POST /api/instrumentos**

Permite crear temporalmente un nuevo instrumento.

El cuerpo de la solicitud debe enviarse en formato JSON e incluir:

```json
{
  "nombre": "Charango",
  "familia": "Cuerda",
  "origen": "Región andina",
  "descripcion": "Instrumento tradicional de cuerda utilizado en la música andina.",
  "disponible": false
}
```

El identificador es generado automáticamente por el servidor.

Si falta algún campo obligatorio, el instrumento no se agrega y la API devuelve un error.

## Ejemplos de solicitudes

### Obtener todos los instrumentos

```text
GET http://localhost:3000/api/instrumentos
```

### Filtrar por familia

```text
GET http://localhost:3000/api/instrumentos?familia=cuerda
```

### Buscar un instrumento por ID

```text
GET http://localhost:3000/api/instrumentos/1
```

### Buscar un instrumento inexistente

```text
GET http://localhost:3000/api/instrumentos/999
```

### Crear un instrumento

```text
POST http://localhost:3000/api/instrumentos
```

Cuerpo JSON:

```json
{
  "nombre": "Charango",
  "familia": "Cuerda",
  "origen": "Región andina",
  "descripcion": "Instrumento tradicional de cuerda utilizado en la música andina.",
  "disponible": false
}
```

## Códigos de estado

- **200 OK:** la solicitud GET se realizó correctamente.
- **201 Created:** el nuevo instrumento fue creado correctamente.
- **400 Bad Request:** faltan campos obligatorios en el cuerpo de la solicitud.
- **404 Not Found:** no existe un instrumento con el identificador solicitado.

## Parámetro de ruta y parámetro de consulta

Un parámetro de ruta forma parte de la dirección del endpoint y se utiliza para identificar un recurso específico.

Ejemplo:

```text
/api/instrumentos/1
```

En este caso, `1` es el identificador del instrumento y se obtiene mediante `req.params.id`.

Un parámetro de consulta se agrega al final de la URL y se utiliza para aplicar un filtro.

Ejemplo:

```text
/api/instrumentos?familia=cuerda
```

En este caso, `familia=cuerda` es una consulta y se obtiene mediante `req.query`.

## Función de express.json()

`express.json()` permite que Express interprete cuerpos de solicitudes enviados en formato JSON.

Gracias a esta función, los datos enviados mediante POST pueden utilizarse desde `req.body`.

## Persistencia de los datos

Los instrumentos iniciales se cargan desde el archivo:

```text
datos/instrumentos.json
```

Cuando se crea un instrumento mediante POST, se agrega al arreglo que se encuentra en memoria mientras el servidor continúa funcionando.

El nuevo instrumento no se escribe en `instrumentos.json`.

Por este motivo, al detener y volver a iniciar el servidor, la aplicación carga nuevamente los datos originales del archivo JSON y los instrumentos creados mediante POST desaparecen.