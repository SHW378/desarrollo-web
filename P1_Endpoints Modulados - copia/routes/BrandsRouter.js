const express = require('express');
const brandsService = require('../services/brandsServices');
const productsService = require('../services/productsService');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Brands
 *   description: Manejo de marcas
 */

/**
 * @swagger
 * /brands:
 *   get:
 *     summary: Obtener todas las marcas
 *     tags: [Brands]
 *     responses:
 *       200:
 *         description: Una lista de marcas.
 */
router.get('/', (req, res) => {
  const brands = brandsService.getAll();
  res.json({ brands });
});

/**
 * @swagger
 * /brands/{id}:
 *   get:
 *     summary: Obtener una marca por su ID
 *     tags: [Brands]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: El ID de la marca.
 *     responses:
 *       200:
 *         description: Detalles de la marca.
 */
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const brand = brandsService.getById(id);
  res.json({ brand });
});

/**
 * @swagger
 * /brands:
 *   post:
 *     summary: Crear una nueva marca
 *     tags: [Brands]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               brandName:
 *                 type: string
 *     responses:
 *       201:
 *         description: Marca creada.
 */
router.post('/', (req, res) => {
  const body = req.body;
  const newBrand = brandsService.create(body);
  res.status(201).json(newBrand);
});

/**
 * @swagger
 * /brands/{id}:
 *   patch:
 *     summary: Actualizar una marca parcialmente
 *     tags: [Brands]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: El ID de la marca.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               brandName:
 *                 type: string
 *     responses:
 *       200:
 *         description: Marca actualizada.
 */
router.patch('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const brand = brandsService.update(id, body);
    res.json(brand);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

/**
 * @swagger
 * /brands/{id}:
 *   delete:
 *     summary: Eliminar una marca
 *     tags: [Brands]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: El ID de la marca.
 *     responses:
 *       200:
 *         description: Marca eliminada.
 *       409:
 *         description: Conflicto - La brand está en uso.
 */
router.delete('/:id', (req, res) => {
  try {
    const { id } = req.params;

    if (productsService.brandEnUso(id)) {
      return res.status(409).json({
        message: 'No se puede eliminar la brand. Está en uso por uno o más productos.'
      });
    }

    const respuesta = brandsService.delete(id);
    res.json(respuesta);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;
