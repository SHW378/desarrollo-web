const faker = require('faker');
const express = require('express');
const router = express.Router();

  const products = [];
  for (let index = 0; index < 10; index++) {
    products.push({
      id: faker.datatype.uuid(),
      image: faker.image.imageUrl(),
      productName: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: faker.commerce.price(),
      stock: faker.datatype.number({ min: 0, max: 100 }),
      categoryId: faker.datatype.number({ min: 1, max: 10 }),
      brandId: faker.datatype.number({ min: 1, max: 10 })
    });
  }

router.get("/", (req, res) => {
  res.json(products);
});

router.get('/filter', (req, res) => {
  res.send('Soy una ruta de filtro')
})

router.get("/:id", (req, res) =>{
  const { id } = req.params; // Extraemos el parametro id de los parametros ruta
  const product = products.find(item => item.id === id);
  res.json(product);
});

router.get('/category/:categoryId', (req, res) => {
  const { categoryId } = req.params;
  const filteredProducts = products.filter(item => item.categoryId === categoryId);
  res.json(filteredProducts);
});

router.get('/brand/:brandId', (req, res) => {
  const { brandId } = req.params;
  const filteredProducts = products.filter(item => item.brandId === brandId);
  res.json(Products);
});


module.exports = router;
