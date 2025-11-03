const faker = require('faker');
const express = require('express');
const router = express.Router();
const productsService = require('../services/productsService');
const services = new productsService();

router.get("/", (req, res) => {
  const products = services.getAll();
  res.json({products});
});

router.get('/filter', (req, res) => {
  res.send('Soy una ruta de filtro')
});

router.get("/:id", (req, res) => {
  const { id } = req.params; // Extraemos el parametro id de los parametros ruta
  const product = services.getById(id);
  res.json({ product });
});
/*
router.get('/category/:categoryId', (req, res) => {
  const { categoryId } = req.params;
  const filteredProducts = products.filter(item => item.categoryId === Number(categoryId));
  res.json(filteredProducts);
});

router.get('/brand/:brandId', (req, res) => {
  const { brandId } = req.params;
  const filteredProducts = products.filter(item => item.brandId === Number(brandId));
  res.json(filteredProducts);
});
*/
router.post('/', (req, res) => {
  const body = req.body;
  const newProduct = services.create(body);
  res.status(201).json(
    newProduct
  )
});

router.patch('/:id', (req, res) => {
  const { id}  = req.params;
  const body = req.body;
  const product= services.update(id, body);
  res.json(product)
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const respuesta = services.delete(id);
  res.json(respuesta)
});

module.exports = router;
