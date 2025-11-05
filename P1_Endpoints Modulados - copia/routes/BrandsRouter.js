// Importación de dependencias necesarias
const express = require('express');
const router = express.Router();
const BrandsService = require('../services/BrandsServices');
const service = new BrandsService();

// Obtener todas las marcas
router.get('/', (req, res) => {
  const brands = service.getAll();
  res.json({ brands });
});

// Ruta de filtro (placeholder)
router.get('/filter', (req, res) => {
  res.send('Soy una ruta de filtro');
});

// Obtener una marca por su ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const brand = service.getById(id);
  res.json({ brand });
});

// Crear una nueva marca
router.post('/', (req, res) => {
  const body = req.body;
  const newBrand = service.create(body);
  res.status(201).json(newBrand);
});

// Actualizar una marca por su ID
router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const brand = service.update(id, body);
  res.json(brand);
});

// Eliminar una marca por su ID
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const respuesta = service.delete(id);
  res.json(respuesta);
});

// Exportar el router
module.exports = router;
