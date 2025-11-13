const faker = require('faker');
const express = require('express');
const productsService = require('../services/productsService');
const router = express.Router();
const Services = new productsService();

/**
* @swagger
* /products:
*  get:
*      summary: Obtiene una lista de productos
*      responses:
*          200:
*           description: Una lista de productos
*           content:
*              application/json:
*                  schema:
*                  type: array
*                  items:
*                      type: object
*                      properties:
*                          name:
*                              type: string
*                          price:
*                              type: number
*                          image:
*                              type: string
*
*/

router.get("/", async (req, res) => {
  const products = await Services.getAll();
  res.json({ products })
});

router.get('/filter', (req, res) => {
  res.send('Soy una ruta de filtro')
})

/** @swagger
* /products/{id}:
*  get:
*   summary: Obtiene un producto por su ID
*   parameters:
*    - in: path
*      name: id
*      schema:
*       type: string
*      required: true
*      description: ID del producto
*   responses:
*    200:
*     description: Detalles del producto
*     content:
*      application/json:
*       schema:
*        type: object
*        properties:
*         id:
*          type: string
*         name:
*          type: string
*         price:
*          type: number
*         image:
*          type: string
*    404:
*     description: Producto no encontrado
*/


router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;// Extraemos el parametro id
    const product = await Services.getById(id);
    res.json({ product });
  } catch (error) {
    next(error); //si ocurre un error, pasa al middleware
  }
});

/**
* @swagger
* /products:
*  post:
*   summary: Crea un nuevo producto
*   requestBody:
*    required: true
*    content:
*     application/json:
*      schema:
*       type: object
*       properties:
*        name:
*         type: string
*        price:
*         type: number
*        image:
*         type: string
*   responses:
*    201:
*     description: Producto creado
*
*/

router.post("/", async (req, res) => {
  const body = req.body;
  const newProduct = await Services.create(body);
  res.status(201).json(
    newProduct
  );
});

/** @swagger
* /products/{id}:
*  patch:
*   summary: Actualiza un producto existente
*   parameters:
*    - in: path
*      name: id
*      schema:
*       type: string
*      required: true
*      description: ID del producto
*   requestBody:
*    required: true
*    content:
*     application/json:
*      schema:
*       type: object
*       properties:
*        name:
*         type: string
*        price:
*         type: number
*        image:
*         type: string
*   responses:
*    200:
*     description: Producto actualizado
*    404:
*     description: Producto no encontrado
*/

router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const product = await Services.update(id, body);
  res.json({
    product
  });
});

/** @swagger
* /products/{id}:
*  delete:
*   summary: Elimina un producto existente
*   parameters:
*    - in: path
*      name: id
*      schema:
*       type: string
*      required: true
*      description: ID del producto
*   responses:
*    200:
*     description: Producto eliminado
*    404:
*     description: Producto no encontrado
*/

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const respuesta = await Services.delete(id);
  res.json({ respuesta });
})

module.exports = router;

/* ejemplo de middleware
function (req,res, next) {
  if(something){
    res.send('stop!')
  }else {
    next();
  }
}
*/
