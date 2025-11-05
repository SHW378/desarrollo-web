// Importación de dependencias necesarias
const express = require('express');
const router = express.Router();
const CategoriesService = require('../services/categoriesServices');
const service = new CategoriesService();

// Obtener todas las categorías
router.get('/', (req, res) => {
  const categories = service.getAll();
  res.json({ categories });
});

// Ruta de filtro (placeholder)
router.get('/filter', (req, res) => {
  res.send('Soy una ruta de filtro');
});

// Obtener una categoría por su ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const category = service.getById(id);
  res.json({ category });
});

// Crear una nueva categoría
router.post('/', (req, res) => {
  const body = req.body;
  const newCategory = service.create(body);
  res.status(201).json(newCategory);
});

// Actualizar una categoría por su ID
router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const category = service.update(id, body);
  res.json(category);
});

// Eliminar una categoría por su ID
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const respuesta = service.delete(id);
  res.json(respuesta);
});

// Exportar el router
module.exports = router;
