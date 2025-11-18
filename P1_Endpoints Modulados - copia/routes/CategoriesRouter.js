const express = require('express');
const categoriesService = require('../services/categoriesServices');
const productsService = require('../services/productsService');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Manejo de categorías
 */

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Obtener todas las categorías
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Una lista de categorías.
 */
router.get('/', (req, res) => {
  const categories = categoriesService.getAll();
  res.json({ categories });
});

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Obtener una categoría por su ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: El ID de la categoría.
 *     responses:
 *       200:
 *         description: Detalles de la categoría.
 */
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const category = categoriesService.getById(id);
  res.json({ category });
});

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Crear una nueva categoría
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categoryName:
 *                 type: string
 *               description:
 *                 type: string
 *               active:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Categoría creada.
 */
router.post('/', (req, res) => {
  const body = req.body;
  const newCategory = categoriesService.create(body);
  res.status(201).json(newCategory);
});

/**
 * @swagger
 * /categories/{id}:
 *   patch:
 *     summary: Actualizar una categoría parcialmente
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: El ID de la categoría.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categoryName:
 *                 type: string
 *     responses:
 *       200:
 *         description: Categoría actualizada.
 */
router.patch('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const category = categoriesService.update(id, body);
    res.json(category);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Eliminar una categoría
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: El ID de la categoría.
 *     responses:
 *       200:
 *         description: Categoría eliminada.
 *       409:
 *         description: Conflicto - La categoría está en uso.
 */
router.delete('/:id', (req, res) => {
  try {
    const { id } = req.params;

    if (productsService.categoryEnUso(id)) {
      return res.status(409).json({
        message: 'La categoría está en uso por uno o más productos.'
      });
    }

    const respuesta = categoriesService.delete(id);
    res.json(respuesta);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;
