// Importación de dependencias necesarias
const faker = require('faker');
const express = require('express');
const router = express.Router();
const productsService = require('../services/productsService');
const services = new productsService();

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Obtener todos los productos
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Una lista de productos.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     format: uuid
 *                   productName:
 *                     type: string
 *                   description:
 *                     type: string
 *                   price:
 *                     type: number
 *                   image:
 *                     type: string
 *                     format: uri
 *                   stock:
 *                     type: number
 */
router.get("/", (req, res) => {
  const products = services.getAll();
  res.json({ products });
});

router.get('/filter', (req, res) => {
  res.send('Soy una ruta de filtro')
});

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Obtener un producto por su ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: El ID (UUID) del producto.
 *     responses:
 *       200:
 *         description: Detalles del producto.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   format: uuid
 *                 productName:
 *                   type: string
 *                 description:
 *                   type: string
 *                 price:
 *                   type: number
 *                 image:
 *                   type: string
 *                   format: uri
 *                 stock:
 *                   type: number
 *       404:
 *         description: Producto no encontrado.
 */
router.get("/:id", (req, res) => {
  const { id } = req.params; // Extraemos el parametro id de los parametros ruta
  const product = services.getById(id);
  res.json({ product });
});

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Crear un nuevo producto
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productName:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               image:
 *                 type: string
 *                 format: uri
 *               stock:
 *                 type: number
 *             example:
 *               productName: "New Product"
 *               description: "A great new product"
 *               price: 199.99
 *               image: "http://placeimg.com/640/480/tech"
 *               stock: 50
 *     responses:
 *       201:
 *         description: Producto creado exitosamente.
 */
router.post('/', (req, res) => {
  const body = req.body;
  const newProduct = services.create(body);
  res.status(201).json(
    newProduct
  )
});

/**
 * @swagger
 * /products/{id}:
 *   patch:
 *     summary: Actualizar un producto parcialmente
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: El ID (UUID) del producto a actualizar.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productName:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               image:
 *                 type: string
 *                 format: uri
 *               stock:
 *                 type: number
 *             example:
 *               productName: "Updated Product Name"
 *               price: 249.99
 *     responses:
 *       200:
 *         description: Producto actualizado.
 *       404:
 *         description: Producto no encontrado.
 */
router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const product = services.update(id, body);
  res.json(product)
});

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Eliminar un producto
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: El ID (UUID) del producto a eliminar.
 *     responses:
 *       200:
 *         description: Producto eliminado.
 *       404:
 *         description: Producto no encontrado.
 */
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const respuesta = services.delete(id);
  res.json(respuesta)
});

// Exportar el router
module.exports = router;
