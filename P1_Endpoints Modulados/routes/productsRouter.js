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



module.exports = router;
