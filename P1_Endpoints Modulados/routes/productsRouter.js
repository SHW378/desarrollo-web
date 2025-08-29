const faker = require('faker');
const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
  const products = [];
  const { size } = req.query;
  const limit = size || 10;
  for (let index = 0; index < limit; index++) {
    products.push({
      id: faker.datatype.uuid(),
      image: faker.image.imageUrl(),
      productName: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: faker.commerce.price(),
      stock: faker.datatype.number({ min: 0, max: 100 }),
      categoryId: index + 1,
      brandId: index + 1
    });
  }
  res.json(products);
});

router.get('/filter', (req, res) => {
  res.send('Soy una ruta de filtro')
})

router.get("/:id", (req, res) =>{
  const { id } = req.params; // Extraemos el parametro id de los parametros ruta
  res.json({
    id: id,
    image: faker.image.imageUrl(),
    productName: faker.commerce.productName(),
    descripcion: faker.commerce.productDescription(),
    price: faker.commerce.price(),
    stock: faker.number.int({ min: 0, max: 100 }),
    categoryId: faker.number.int({ min: 1, max: 5 }),
    brandId: faker.number.int({ min: 1, max: 10 })
  });
});

/*checar
// Obtener productos por categoría
router.get('/category/:categoryId', (req, res) => {
  const { categoryId } = req.params;
  const { size } = req.query;
  const limit = size || 10;
  const products = [];

  for (let index = 0; index < limit; index++) {
    products.push({
      id: faker.datatype.uuid(),
      image: faker.image.imageUrl(),
      productName: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: faker.commerce.price(),
      stock: faker.datatype.number({ min: 0, max: 100 }),
      categoryId: parseInt(categoryId),
      brandId: faker.datatype.number({ min: 1, max: 10 })
    });
  }
  res.json(products);
});

// Obtener productos por marca
router.get('/brand/:brandId', (req, res) => {
  const { brandId } = req.params;
  const { size } = req.query;
  const limit = size || 10;
  const products = [];

  for (let index = 0; index < limit; index++) {
    products.push({
      id: faker.datatype.uuid(),
      image: faker.image.imageUrl(),
      productName: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: faker.commerce.price(),
      stock: faker.datatype.number({ min: 0, max: 100 }),
      categoryId: faker.datatype.number({ min: 1, max: 5 }),
      brandId: parseInt(brandId)
    });
  }
  res.json(products);
});
*/
module.exports = router;
