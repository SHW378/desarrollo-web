const faker = require('faker');
const express = require('express');
const productsService = require('../services/productsService');
const router = express.Router();
const Services = new productsService();

router.get("/", (req, res) => {
  const products = Services.getAll();
  res.json({products})
});

router.get('/filter', (req, res) => {
  res.send('Soy una ruta de filtro')
})

router.get("/:id", (req, res) =>{
  const { id } = req.params;
  const product = Services.getById(id);
  res.json({product});
});

router.post("/", (req, res) => {
  const body = req.body;
  const newProduct = Services.create(body);
  res.status(201).json(
    newProduct
  );
});

router.patch('/:id', (req, res) => {
  const {id} = req.params;
  const body = req.body;
  res.json({
    message: 'updated',
    data:
      body,
      id
  })
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    message: 'deleted',
    id
  })
})

module.exports = router;

