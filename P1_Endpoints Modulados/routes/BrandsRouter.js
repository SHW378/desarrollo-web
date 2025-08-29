const faker = require('faker');
const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
  const brands = [];
  const { size } = req.query;
  const limit = size || 10;

  for (let index = 0; index < limit; index++) {
    brands.push({
      id: faker.datatype.uuid(),
      brandName: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      active: faker.datatype.boolean()
    });
  }
  res.json(brands);
});

router.get('/filter', (req, res) => {
  res.send('Soy una ruta de filtro')
})

router.get("/:id", (req, res) => {
  const { id } = req.params;
  res.json({
    id: id,
    brandName: faker.commerce.brandName(),
    description: faker.commerce.productDescription(),
    active: faker.datatype.boolean()
  });
});

module.exports = router;
