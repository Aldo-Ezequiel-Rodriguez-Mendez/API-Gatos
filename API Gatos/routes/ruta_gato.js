const express = require('express');
const router  = express.Router();

const controlVideojuego = require('../controllers/control_gato'); 

/**
 * @swagger
 * /gato:
 *  get:
 *   description: Información de los objetos en la tabla.
 *   responses:
 *    200:
 *     description: Devuelve todos los gatos en la tabla.
*/
router.get('/gato', controlVideojuego.obtenerTodosGatos);

/**
 * @swagger
 * /gato/{id}/{nombre}/{color}:
 *  post:
 *   parameters:
 *    - in: path
 *      name: id
 *      type: integer
 *      required: true
 *      description: ID del gato a crear.
 *    - in: path
 *      name: nombre
 *      type: string
 *      required: true
 *      description: Nombre del gato a crear.
 *    - in: path
 *      name: color
 *      type: string
 *      required: true
 *      description: Color del gato a crear.
 *   description: Inserción de un objeto en la tabla.
 *   responses:
 *    200:
 *     description: Inserta un gato.
*/
router.post('/gato', controlVideojuego.nuevoGato);

/**
 * @swagger
 * /gato/{id}:
 *  get:
 *   parameters:
 *    - in: path
 *      name: id
 *      type: integer
 *      required: true
 *      description: ID del gato a mostrar.
 *   description: Información de un objeto en la tabla.
 *   responses:
 *    200:
 *     description: Devuelve un gato en especifico de la tabla mediante su ID.
*/
router.get('/gato/:id', controlVideojuego.obtenerUnGato);

/**
 * @swagger
 * /gato/{id}:
 *  post:
 *   parameters:
 *    - in: path
 *      name: id
 *      type: integer
 *      required: true
 *      description: ID del gato a actualizar.
 *   description: Actualización de los objetos en la tabla.
 *   responses:
 *    200:
 *     description: Actualiza los comentarios de un gato.
*/
router.post('/gato/:id', controlVideojuego.nuevoComentario);

/**
 * @swagger
 * /gato/{id}:
 *  delete:
 *   parameters:
 *    - in: path
 *      name: id
 *      type: integer
 *      required: true
 *      description: ID del gato a eliminar.
 *   description: Eliminacion de un objeto en la tabla.
 *   responses:
 *    200:
 *     description: Elimina un gato en especifico mediante su ID.
*/
router.delete('/gato/:id', controlVideojuego.borrarUnGato);

module.exports = router;    // exportamos las rutas para usarlas en el servidor.js