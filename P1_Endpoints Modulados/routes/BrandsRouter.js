const faker = require('faker');
const express = require('express');
const router = express.Router();

const brands = [];
 for (let index = 0; index < 10; index++) {
    brands.push({
      id: faker.datatype.uuid(),
      brandName: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      active: faker.datatype.boolean()
    });
  }

router.get("/", (req, res) => {
  res.json(brands);
});

router.get('/filter', (req, res) => {
  res.send('Soy una ruta de filtro')
})

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const brand = brands.find(b => b.id === id);
  res.json(brand);
});

module.exports = router;
