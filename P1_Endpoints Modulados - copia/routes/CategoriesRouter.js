const express = require('express');
const router = express.Router();
const CategoriesService = require('../services/categoriesServices');
const service = new CategoriesService();

router.get('/', (req, res) => {
  const categories = service.getAll();
  res.json({ categories });
});

router.get('/filter', (req, res) => {
  res.send('Soy una ruta de filtro');
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const category = service.getById(id);
  res.json({ category });
});

router.post('/', (req, res) => {
  const body = req.body;
  const newCategory = service.create(body);
  res.status(201).json(newCategory);
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const category = service.update(id, body);
  res.json(category);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const respuesta = service.delete(id);
  res.json(respuesta);
});

module.exports = router;
