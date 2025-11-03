const express = require('express');
const router = express.Router();
const BrandsService = require('../services/BrandsServices');
const service = new BrandsService();

router.get('/', (req, res) => {
  const brands = service.getAll();
  res.json({ brands });
});

router.get('/filter', (req, res) => {
  res.send('Soy una ruta de filtro');
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const brand = service.getById(id);
  res.json({ brand });
});

router.post('/', (req, res) => {
  const body = req.body;
  const newBrand = service.create(body);
  res.status(201).json(newBrand);
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const brand = service.update(id, body);
  res.json(brand);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const respuesta = service.delete(id);
  res.json(respuesta);
});

module.exports = router;
