// Importación de dependencias necesarias
const faker = require('faker');
const express = require('express');
const router = express.Router();
const productsService = require('../services/productsService');
const services = new productsService();

// Obtener todos los productos
router.get("/", (req, res) => {
  const products = services.getAll();
  res.json({products});
});

// Ruta de filtro (placeholder)
router.get('/filter', (req, res) => {
  res.send('Soy una ruta de filtro')
});

// Obtener un producto por su ID
router.get("/:id", (req, res) => {
  const { id } = req.params; // Extraemos el parametro id de los parametros ruta
  const product = services.getById(id);
  res.json({ product });
});

// Crear un nuevo producto
router.post('/', (req, res) => {
  const body = req.body;
  const newProduct = services.create(body);
  res.status(201).json(
    newProduct
  )
});

// Actualizar un producto por su ID
router.patch('/:id', (req, res) => {
  const { id}  = req.params;
  const body = req.body;
  const product= services.update(id, body);
  res.json(product)
});

// Eliminar un producto por su ID
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const respuesta = services.delete(id);
  res.json(respuesta)
});

// Exportar el router
module.exports = router;
