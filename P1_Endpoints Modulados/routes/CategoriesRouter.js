const faker = require('faker');
const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
  const categories = [];
  const { size } = req.query;
  const limit = size || 10;
  for (let index = 0; index < limit; index++) {
    categories.push({
      Id: index + 1,
      categoryName: faker.commerce.department(),
      description: faker.commerce.productDescription(),
      active: faker.datatype.boolean()
    });
  }
  res.json(categories);
});

router.get('/filter', (req, res) => {
  const { id } = req.params;
  res.json ({
    Id: id,
    categoryName: faker.commerce.department(),
    description: faker.commerce.productDescription(),
    active: faker.datatype.boolean()
  })
})

module.exports = router;
