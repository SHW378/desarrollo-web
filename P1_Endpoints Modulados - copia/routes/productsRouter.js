const express = require('express');
const productsService = require('../services/productsService');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Manejo de productos
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Obtener todos los productos
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Una lista de productos.
 */
router.get("/", (req, res) => {
  const products = productsService.getAll();
  res.json({ products });
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
 *         description: El ID del producto.
 *     responses:
 *       200:
 *         description: Detalles del producto.
 */
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const product = productsService.getById(id);
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
 *               price:
 *                 type: number
 *               brandId:
 *                 type: string
 *               categoryId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Producto creado.
 *       400:
 *         description: Error de validación (ej. Brand not found).
 */
router.post('/', (req, res) => {
  try {
    const body = req.body;
    const newProduct = productsService.create(body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
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
 *         description: El ID del producto.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productName:
 *                 type: string
 *               price:
 *                 type: number
 *               brandId:
 *                 type: string
 *               categoryId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Producto actualizado.
 *       400:
 *         description: Error de validación (ej. Brand not found).
 *       404:
 *         description: Producto no encontrado.
 */
router.patch('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const product = productsService.update(id, body);
    res.json(product);
  } catch (error) {
    if (error.message.includes('Not Found')) {
      res.status(404).json({ message: error.message });
    } else {
      res.status(400).json({ message: error.message });
    }
  }
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
 *         description: El ID del producto.
 *     responses:
 *       200:
 *         description: Producto eliminado.
 *       404:
 *         description: Producto no encontrado.
 */
router.delete('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const respuesta = productsService.delete(id);
    res.json(respuesta);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;
